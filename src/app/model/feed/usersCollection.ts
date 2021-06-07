import { PostInProfile } from './../profile/postInProfile';
import { Post } from "./post"

export class UsersCollection{
  id : string
  name : string
  posts : PostInProfile[]
  constructor(id : string, name : string, posts : PostInProfile[]){
    this.id = id
    this.name = name
    this.posts = posts
  }
}
