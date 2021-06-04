import { ProfileStory } from './profileStory';
import { Story } from '../feed/story';
import { Image } from 'src/app/model/feed/image';
export class StoryHighlightOnProfile{
  id : string;
  highlightPhoto : Image;
  stories: ProfileStory[]
  name : String;
  constructor(id : string, highlightPhoto : Image, stories : ProfileStory[], name : String){
    this.id = id;
    this.highlightPhoto = highlightPhoto;
    this.stories = stories
    this.name = name
  }
}
