import { UserInFeed } from './userInFeed';
export class Comment {
  user : UserInFeed;
  text : String;
  postBy : String;
  postId : String;
  constructor(postBy : String, postId : String, user : UserInFeed, text : String){
    this.user = user;
    this.text = text;
    this.postBy = postBy;
    this.postId = postId;
  }

}
