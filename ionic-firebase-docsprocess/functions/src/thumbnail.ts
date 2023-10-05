import { onObjectFinalized } from "firebase-functions/v2/storage";
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { logger } from "firebase-functions";
import * as path from "path";
import * as sharp from "sharp";

initializeApp();

export const generateThumbnail = onObjectFinalized({ cpu: 2 }, async (event: any) => {
    
  const fileBucket: string = event.data.bucket;
  const filePath: string = event.data.name;
  const contentType: string = event.data.contentType;

  if (!contentType.startsWith("image/")) {
    return logger.log("This is not an image.");
  }

  const fileName: string = path.basename(filePath);
  if (fileName.startsWith("thumb_")) {
    return logger.log("Already a Thumbnail.");
  }

  const bucket = getStorage().bucket(fileBucket);
  const downloadResponse = await bucket.file(filePath).download();
  const imageBuffer: Buffer = downloadResponse[0];
  logger.log("Image downloaded!");

  const thumbnailBuffer: Buffer = await sharp(imageBuffer)
    .resize({
      width: 200,
      height: 200,
      withoutEnlargement: true,
    })
    .toBuffer();
  logger.log("Thumbnail created");

  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  const metadata = { contentType: contentType };
  await bucket.file(thumbFilePath).save(thumbnailBuffer, {
    metadata: metadata,
  });
  return logger.log("Thumbnail uploaded!");
});
