import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/model/message/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private http : HttpClient) { }

  getMessagesForChat(sender : string, receiver : string) : Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.baseUrl}/${environment.message}/${receiver}/${sender}`);
  }

  getUsers(userId : string) : Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/${environment.users}/${userId}`)
  }
}
