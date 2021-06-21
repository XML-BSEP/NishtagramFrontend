import { NotificationTypeValue } from './../../model/profile/notificationTypeValue';
import { Observable } from 'rxjs';
import { NotificationSettingsTypeValue } from './../../model/profile/notificationSettingsTypeValue';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NotificationSettings } from 'src/app/model/profile/notificationSettings';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  block(settings : NotificationSettings) : Observable<Response> {
      return this.http.post<Response>(`${environment.baseUrl}/${environment.notifications}/${environment.block}`, settings);
  }
  unblock(settings : NotificationSettings) : Observable<Response> {
    return this.http.post<Response>(`${environment.baseUrl}/${environment.notifications}/${environment.unblock}`, settings);
  }
  getUserNotificationSettings(userFor : string, userBy : string) : Observable<NotificationTypeValue[]>{
    return this.http.get<NotificationTypeValue[]>(`${environment.baseUrl}/${environment.blockedNotification}/${environment.blockedBy}/${userBy}/${environment.blockedFor}/${userFor}`,{responseType : 'json'});
  }
}
