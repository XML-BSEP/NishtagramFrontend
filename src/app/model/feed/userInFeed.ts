import { Image } from "./image";

export class UserInFeed{
  public id : String;
  public username : String;
  public profilePhoto : string;

  constructor(id : String, username : String, profilPhoto : string)
  {
    this.username = username;
    this.profilePhoto = profilPhoto;
  }
}
