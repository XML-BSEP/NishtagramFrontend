import { Profile } from "./profile";

export class Message {
    timestamp : Date;
    content : String;
    redirect_path : String;
    type : number;
    message_from : Profile;
    message_to : Profile;
    image_base_64 : String;
    id : String;
    seen : boolean;
    image_path : String


    constructor(id : string, seen : boolean, timestamp : Date, content : string, redirect_path : string, type : number, message_from : Profile, message_to : Profile, image_base_64 : string, image_path : string) {
        this.timestamp = timestamp;
        this.content = content;
        this.redirect_path = redirect_path;
        this.type = type;
        this.message_from = message_from;
        this.message_to = message_to;
        this.image_base_64 = image_base_64;
        this.id = id;
        this.seen = seen;
        this.image_path = image_path
    }
}