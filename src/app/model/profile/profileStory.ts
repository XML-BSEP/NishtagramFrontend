import { Image } from 'src/app/model/feed/image';
export class ProfileStory{
  id : string
  story : String
  closeFriends : boolean
  isVideo : boolean
  constructor(id: string, story : String, closeFriends : boolean, isVideo : boolean){
    this.id = id;
    this.closeFriends = closeFriends;
    this.story = story
    this.isVideo = isVideo;
  }
}
