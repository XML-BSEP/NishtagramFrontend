export class PostForSearch {
    id: String;
    type : String;
    image : String[];
    username : String;
    profile_photo : String;

    constructor(postIds : String) {
        this.id = postIds
    }
        
}
