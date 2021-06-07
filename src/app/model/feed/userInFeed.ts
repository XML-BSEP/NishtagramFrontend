import { Image } from "./image";

export class UserInFeed{
  public id : String;
  public username : String;
  public profilePhoto : Image;
  constructor(username : String, profilPhoto : Image)
  {
    this.username = username;
    this.profilePhoto = profilPhoto;
  }
}
