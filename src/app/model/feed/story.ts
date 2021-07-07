import { StoryContent } from './storyContent';
import { UserInFeed } from './userInFeed';
export class Story{
  public id : string;
  user : UserInFeed
  storyContent : StoryContent
  timestamp : Date
  isCampaign : boolean;
  public campaignId : String;
  public isAd : boolean;
  public link : String;
  constructor(user : UserInFeed, story_content : StoryContent, timestamp : Date){
    this.user = user;
    this.storyContent = story_content
    this.timestamp = timestamp
  }
}
