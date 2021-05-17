import { UserInFeed } from './userInFeed';
export class Comment {
  user : UserInFeed;
  text : String;
  constructor(user : UserInFeed, text : String){
    this.user = user;
    this.text = text;
  }

}
