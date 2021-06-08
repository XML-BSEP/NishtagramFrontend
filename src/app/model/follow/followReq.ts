export class FollowReq{
  userrequested : string
  followedaccount : string
  constructor(userreq : string, followedacc : string){
    this.userrequested = userreq
    this.followedaccount = followedacc

  }
}
