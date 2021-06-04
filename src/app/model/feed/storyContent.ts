import { Image } from "./image"

export class StoryContent{
  isVideo : boolean
  content : Image
  constructor(isVideo : boolean, content : Image){
    this.isVideo = isVideo
    this.content = content
  }
}
