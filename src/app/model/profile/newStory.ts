import { timestamp } from 'rxjs/operators';
import { ProfileStory } from './profileStory';
export class NewStory{
  userId : String
  story : ProfileStory
  timestamp : Date;
  constructor(userId : String, story : ProfileStory, timestamp : Date){
    this.userId= userId;
    this.story = story;
    this.timestamp = timestamp
  }
}
