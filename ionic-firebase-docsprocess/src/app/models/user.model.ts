export class User {
    $key: string | null;
    name: string | null;
    email: string  | null;
    image: string  | null;
    constructor(
        name: string | null,
        email: string | null,
        image: string | null,
        key:string | null
    ) {
        this.name = name;
        this.email = email;
        this.image = image;
        this.$key = key;
    }
}


