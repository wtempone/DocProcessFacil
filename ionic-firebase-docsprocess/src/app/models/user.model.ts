export class User {
    $key: string;
    name: string | null;
    email: string  | null;
    image: string  | null;
    constructor(
        name: string | null,
        email: string | null,
        image: string | null,
    ) {
        this.name = name;
        this.email = email;
        this.image = image;
    }
}


