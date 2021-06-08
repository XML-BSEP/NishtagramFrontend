import { ProfileStory } from './profileStory';
import { Story } from '../feed/story';
import { Image } from 'src/app/model/feed/image';
export class StoryHighlightOnProfile{
  id : string;
  highlightPhoto : string;
  stories: ProfileStory[]
  name : String;
  storyIds : string[];
  constructor(id : string, highlightPhoto : string, stories : ProfileStory[], name : string, storyIds : string[]){
    this.id = id;
    this.storyIds = storyIds;
    this.highlightPhoto = highlightPhoto;
    this.stories = stories
    this.name = name
  }
}
