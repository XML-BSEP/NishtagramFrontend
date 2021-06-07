import { UserInFeed } from './userInFeed';
import { Image } from 'src/app/model/feed/image';
import { Location } from '../utilities/location';
import { Comment} from '../feed/comment'
import { Time } from '@angular/common';
export class Post{
  user : UserInFeed;
  location : Location;
  description : String;
  isAlbum : boolean;
  images: string[];
  comments : Comment[];
  isLiked : boolean;
  isDisliked : boolean;
  isBookmarked : boolean;
  collection : String;
  time : Date;
  moment : String;
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
  }
}
