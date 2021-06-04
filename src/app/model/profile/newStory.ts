import { ProfileStory } from './profileStory';
export class NewStory{
  userId : String
  story : ProfileStory
  constructor(userId : String, story : ProfileStory){
    this.userId= userId;
    this.story = story;
  }
}
