import { PostInProfile } from './postInProfile';
import { Post } from './../feed/post';
import { UserInFeed } from './../feed/userInFeed';
import { NewUser } from './../user/newUser';

export class UserProfile{
  user : NewUser;
  followers : UserInFeed[];
  following : UserInFeed[];
  posts : PostInProfile[];
  constructor(user : NewUser, followers : UserInFeed[], following : UserInFeed[], posts : PostInProfile[]){
    this.user = user;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
  }
}
