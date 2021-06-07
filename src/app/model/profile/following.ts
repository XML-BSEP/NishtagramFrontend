import { Image } from 'src/app/model/feed/image';

export class Following{
  public id : String;
  public username : String;
  public profilePhoto : string;
  public close_friend : boolean;
  constructor(username : String, profilPhoto : string, close_friend : boolean)
  {
    this.username = username;
    this.profilePhoto = profilPhoto;
    this.close_friend = close_friend
  }
}
