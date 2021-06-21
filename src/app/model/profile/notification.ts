import { timestamp } from 'rxjs/operators';
import { ProfileDTO } from './profileDTO';
import { NotificationEnum } from './notificationEnum';
export class Notification{
  id : string;
  timestamp : Date;
  content : string;
  redirect_path : string;
  read : boolean;
  type : NotificationEnum
  notification_from : ProfileDTO
  notification_to : ProfileDTO
  sender_username : string
  momentTime : string
  constructor(id : string, timestamp : Date, content : string, redirect : string, read : boolean, type : NotificationEnum, notification_from : ProfileDTO, notification_to :ProfileDTO, sender : string){
    this.id = id
    this.timestamp = timestamp
    this.content = content
    this.redirect_path = redirect
    this.read = read
    this.type = type
    this.notification_from = notification_from
    this.notification_to = notification_to
    this.sender_username = sender
  }
}
