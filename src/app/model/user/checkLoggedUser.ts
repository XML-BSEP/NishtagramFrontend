export class CheckLoggedUser{
  visitorId : string;
  userVisitedUsername : string;
  constructor(visitorId : string, uservisiting : string){
    this.visitorId = visitorId
    this.userVisitedUsername = uservisiting
  }
}
