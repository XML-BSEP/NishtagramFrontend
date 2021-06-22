export class FollowRequest{
  id : string
  userId : string
  username : string
  profilePhoto : string
  constructor(id : string, username : string, profilePhoto : string, userId : string){
    this.id = id
    this.username = username
    this.profilePhoto = profilePhoto
    this.userId =userId
  }
}
