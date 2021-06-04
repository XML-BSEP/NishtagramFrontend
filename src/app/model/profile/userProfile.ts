import { Following } from './following';
import { PostInProfile } from './postInProfile';
import { Post } from './../feed/post';
import { UserInFeed } from './../feed/userInFeed';
import { NewUser } from './../user/newUser';

export class UserProfile{
  user : NewUser;
  followers : UserInFeed[];
  following : Following[];
  posts : PostInProfile[];
  private : boolean;Following
  constructor(user : NewUser, followers : UserInFeed[], following : Following[], posts : PostInProfile[], priv : boolean){
    this.user = user;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
    this.private = priv;
  }
}
