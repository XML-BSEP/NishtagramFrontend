import { Image } from "./image"

export class StoryContent{
  isVideo : boolean
  content : string
  constructor(isVideo : boolean, content : string){
    this.isVideo = isVideo
    this.content = content
  }
}
