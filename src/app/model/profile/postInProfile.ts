import { Image } from "../feed/image";

export class PostInProfile{
  user : String;
  image : Image;
  postId : String;
  constructor(user : String, image : Image, postId : String){
    this.user = user;
    this.image = image;
    this.postId =postId;
  }
}
