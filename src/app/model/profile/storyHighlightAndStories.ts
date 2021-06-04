import { ProfileStory } from './profileStory';
import { Story } from './../feed/story';
import { StoryHighlightOnProfile } from "./storyHighlightOnProfile";

export class StoryHighlightAndStories{
  storyhighlight : StoryHighlightOnProfile;
  stories : ProfileStory[];
  constructor(storyhigh : StoryHighlightOnProfile, stories : ProfileStory[]){
    this.storyhighlight = storyhigh;
    this.stories = stories
  }
}
