import { Profile } from "./profile";

export class Message {
    timestamp : Date;
    content : String;
    redirect_path : String;
    type : number;
    message_from : Profile;
    message_to : Profile;

    constructor(timestamp : Date, content : string, redirect_path : string, type : number, message_from : Profile, message_to : Profile) {
        this.timestamp = timestamp;
        this.content = content;
        this.redirect_path = redirect_path;
        this.type = type;
        this.message_from = message_from;
        this.message_to = message_to;
    }
}