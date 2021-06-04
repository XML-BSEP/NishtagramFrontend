import { timestamp } from 'rxjs/operators';
import { ProfileStory } from './profileStory';
export class NewStory{
  userId : String
  story : ProfileStory
  timestamp : Date;
  closeFriends : boolean
  constructor(userId : String, story : ProfileStory, timestamp : Date, closefriends : boolean){
    this.userId= userId;
    this.story = story;
    this.timestamp = timestamp
    this.closeFriends = closefriends
  }
}
