import { UserTag } from './userTag';
export class NewPost{
  user : UserTag
  taggedUsers : UserTag[]
  isVideo : boolean
  isAlbum : boolean
  isImage : boolean
  image : string
  album : string[]
  video : string
  location : string
  caption : string
  hashtags : string[]
  constructor(
    user : UserTag,
    taggedUsers : UserTag[],
    isVideo : boolean,
    isAlbum : boolean,
    isImage : boolean,
    image : string,
    album : string[],
    video : string,
    location : string,
    caption : string,
    hashtags : string[]){
      this.user = user
      this.taggedUsers = taggedUsers
      this.isImage = isImage
      this.isVideo = isVideo
      this.isAlbum = isAlbum
      this.image = image
      this.album = album
      this.video = video
      this.location = location
      this.caption = caption
      this.hashtags = hashtags
    }
}
