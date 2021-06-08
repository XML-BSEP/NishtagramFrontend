import { Image } from "../feed/image";

export class PostInProfile{
  user : String;
  images : string;
  postid : String;
  isVideo : boolean;
  public postBy : String;
  constructor(user : String, image : string, postId : String, isVideo : boolean){
    this.user = user;
    this.isVideo = isVideo;
    this.images = image;
    this.postid =postId;
  }
}
