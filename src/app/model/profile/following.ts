import { Image } from 'src/app/model/feed/image';

export class Following{
  username : String;
  profilePhoto : Image;
  close_friend : boolean;
  constructor(username : String, profilPhoto : Image, close_friend : boolean)
  {
    this.username = username;
    this.profilePhoto = profilPhoto;
    this.close_friend = close_friend
  }
}
