import { PostInProfile } from './../profile/postInProfile';
import { UserInFeed } from './../feed/userInFeed';
import { timestamp } from 'rxjs/operators';
export class Notification{
  notificiare : UserInFeed;
  timestamp : Date;
  content : String;
  path : String;
  isPostRelated: boolean;
  postThumb : PostInProfile;
  constructor(timestamp : Date, content : String, path : String, notificiar : UserInFeed, isPostRelated : boolean, postThumb : PostInProfile){
    this.timestamp = timestamp;
    this.content = content;
    this.path = path;
    this.notificiare = notificiar;
    this.isPostRelated = isPostRelated;
    this.postThumb = postThumb;
  }
}
