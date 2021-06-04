import { Image } from 'src/app/model/feed/image';
export class ProfileStory{
  id : string
  story : Image
  constructor(id: string, story : Image){
    this.id = id;
    this.story = story
  }
}
