export class Template {
    $key: string;
    name: string | null;
    description: string  | null;
    body: string  | null;
    userId: string | null;
    urlFile: string | null;
    requiredsDocs: RequiredDocs[] | null;
}
export class RequiredDocs {
    $key: string;
    templateId: string = '';
    name: string | null = '';
    description: string  | null = '';
    type: string  | null = '';
    subtype: string | null = '';
    urlFile: string | null = '';
    extension: string | null = '';
    tipification: any | null = {};
}

