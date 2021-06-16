import {PostProfileId} from '../search/postProfileId'
export class PostTags {
    PostProfileId: PostProfileId[];
    Tag: String;

    constructor(postIds : PostProfileId[], tag : String) {
        this.PostProfileId = postIds,
        this.Tag = tag
    }
}

