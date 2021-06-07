import { Image } from "../feed/image";

export class PostInProfile{
  user : String;
  image : string;
  postId : String;
  constructor(user : String, image : string, postId : String){
    this.user = user;
    this.image = image;
    this.postId =postId;
  }
}
