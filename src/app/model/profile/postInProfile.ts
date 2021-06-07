import { Image } from "../feed/image";

export class PostInProfile{
  user : String;
  image : string;
  postid : String;
  isVideo : boolean;
  constructor(user : String, image : string, postId : String, isVideo : boolean){
    this.user = user;
    this.isVideo = isVideo;
    this.image = image;
    this.postid =postId;
  }
}
