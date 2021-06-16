
export class Follower{
  public id : String;
  public username : String;
  public profilePhoto : string;
  public close_friend : boolean
  constructor(id : String, username : String, profilPhoto : string, close_friend : boolean)
  {
    this.id = id;
    this.username = username;
    this.profilePhoto = profilPhoto;
    this.close_friend = close_friend
  }
}
