import { Image } from "./image";

export class UserInFeed{
  username : String;
  profilePhoto : Image;
  constructor(username : String, profilPhoto : Image)
  {
    this.username = username;
    this.profilePhoto = profilPhoto;
  }
}
