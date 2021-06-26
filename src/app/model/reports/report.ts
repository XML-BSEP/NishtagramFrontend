import { UserInFeed } from "../feed/userInFeed";
import { User } from "../profile/user";

export class Report {
    public id : String;
    public postId : String;
    public timestamp : Date;
    public reportedBy : UserInFeed;
    public reportType : String;
    public reportedPostBy : UserInFeed;
    public reportStatus : String;
    public reportedMediaType : String;
    
    constructor() {}

}