export class Post {
    $key: string;
    image: string;
    description: string;
    location: string;
    constructor(
        image: string,
        description: string,
        location: string,
    ) {
        this.image = image;
        this.description = description;
        this.location = location;
    }
}


