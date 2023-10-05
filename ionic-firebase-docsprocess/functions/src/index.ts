
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";
import axios from "axios";

export const docExtractionByURL = onCall(async (request: any) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "Você não está autenticado!");
    }

    logger.info("Extraindo dados do documento", { structuredData: true });

    try {
        const tokenData = JSON.stringify({
            "token": "c3b5a2d11cb34d8843e471d1a5468970",
        });

        const auth = await axios.request({
            method: "post",
            maxBodyLength: Infinity,
            url: "https://mostqiapi.com/user/authenticate",
            headers: {
                "Content-Type": "application/json",
            },
            data: tokenData,
        });
        const extractData = JSON.stringify({
            returnImage: true,
            fileBase64: request.data.file,
        });
        const extract = await axios.request({
            method: "post",
            maxBodyLength: Infinity,
            url: "https://mostqiapi.com/process-image/content-extraction",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.data.token}`
            },
            data: extractData
        });
        return extract.data;
    } catch (err:any) {
        throw new HttpsError("internal", "Internal error - tipification - " + err.message);
    }
});

export const ExtractData = onRequest(async (request: any, response: any) => {
    logger.info("Extraindo dados do documento", { structuredData: true });

    try {
        const tokenData = JSON.stringify({
            "token": "c3b5a2d11cb34d8843e471d1a5468970",
        });

        const auth = await axios.request({
            method: "post",
            maxBodyLength: Infinity,
            url: "https://mostqiapi.com/user/authenticate",
            headers: {
                "Content-Type": "application/json",
            },
            data: tokenData,
        });
        const extractData = JSON.stringify({
            returnImage: true,
            fileUrl: request.body.urlFile,

        });
        const extract = await axios.request({
            method: "post",
            maxBodyLength: Infinity,
            url: "https://mostqiapi.com/process-image/content-extraction",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.data.token}`
            },
            data: extractData
        });
        response.send(JSON.stringify(extract.data));
    } catch (err) {
        response.send(JSON.stringify(err));
    }
});

export const helloWorld = onRequest((request, response) => {
    logger.info("Ola mundo 2!", { structuredData: true });
    response.send("Outro Retorno qualquer!");
});
// export const logActivities = functions.firestore.document("{collecion}/{id}")
//     .onCreate((snap, context) => {
//         console.log("Alguma coisa mudou no banco -- ", snap.data());
//         const collecion = context.params.collecion;
//         const id = context.params.id;

//     })
