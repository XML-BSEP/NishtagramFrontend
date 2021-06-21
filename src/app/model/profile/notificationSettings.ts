import { NotificationTypeValue } from './notificationTypeValue';
export class NotificationSettings{
  user_for : string
  user_by : string
  settings : NotificationTypeValue
  constructor(userfor : string, userby : string, settings :NotificationTypeValue){
    this.user_for = userfor
    this.user_by = userby
    this.settings = settings
  }
}
