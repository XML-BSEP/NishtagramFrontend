import { UserInFeed } from './userInFeed';
import { Image } from 'src/app/model/feed/image';
import { Location } from '../utilities/location';
import { Comment} from '../feed/comment'
import { Time } from '@angular/common';
export class Post{
  public id : string;
  public user : UserInFeed;
  public location : Location;
  public isVideo : boolean;
  public description : String;
  public isAlbum : boolean;
  public images: string[];
  public comments : Comment[];
  public isLiked : boolean;
  public isDisliked : boolean;
  public isBookmarked : boolean;
  public collection : String;
  public time : Date;
  public moment : String;
  public numOfComments : number;
  public numOfLikes : number;
  public numOfDislikes : number;
  constructor(user : UserInFeed, location : Location, description : String, isAlbum : boolean, images : string[], comments : Comment[], time : Date, moment : String){
    this.user = user;
    this.location = location;
    this.description = description;
    this.isAlbum = isAlbum;
    this.images = images;
    this.comments = comments;
    this.isLiked = false;
    this.isDisliked = false;
    this.isBookmarked = false;
    this.time = time;
    this.moment = moment;
    this.comments = []
  }
}
