import { Following } from './following';
import { PostInProfile } from './postInProfile';
import { Post } from './../feed/post';
import { UserInFeed } from './../feed/userInFeed';
import { NewUser } from './../user/newUser';
import { User } from './user';

export class UserProfile{
  user : User; 
  followers : UserInFeed[];
  following : Following[];
  posts : PostInProfile[];
  private : boolean;
  constructor(user : User, followers : UserInFeed[], following : Following[], posts : PostInProfile[], priv : boolean){
    this.user = user;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
    this.private = priv;
  }
}
