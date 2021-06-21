import { NotificationTypeValue } from './notificationTypeValue';
export class NotificationSettingsTypeValue{
  settings : NotificationTypeValue[]
  user_for : string
  user_by : string
  constructor(settings : NotificationTypeValue[], userFor : string, userBy : string){
    this.settings = settings;
    this.user_for = userFor;
    this.user_by = userBy
  }
}
