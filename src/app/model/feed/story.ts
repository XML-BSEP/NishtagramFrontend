import { StoryContent } from './storyContent';
import { UserInFeed } from './userInFeed';
export class Story{
  user : UserInFeed
  storyContent : StoryContent
  timestamp : Date
  constructor(user, story_content, timestamp){
    this.user = user;
    this.storyContent = story_content
    this.timestamp = timestamp
  }
}
