import {PostProfileId} from '../search/postProfileId'
export class PostLocations {
    PostProfileId: PostProfileId[];
    Location: String;

    constructor(postIds : PostProfileId[], location : String) {
        this.PostProfileId = postIds,
        this.Location = location
    }
}

