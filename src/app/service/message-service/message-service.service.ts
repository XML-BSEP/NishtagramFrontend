import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/model/message/message';
import { environment } from 'src/environments/environment';
import { SearchedUser } from 'src/app/model/profile/searchedProfile';
import { Block } from 'src/app/model/message/block';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private http : HttpClient) { }

  getMessagesForChat(sender : string, receiver : string) : Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.baseUrl}/${environment.message}/${receiver}/${sender}`);
  }

  getUsers(userId : string) : Observable<SearchedUser[]> {
    return this.http.get<SearchedUser[]>(`${environment.baseUrl}/${environment.users}/${userId}`)
  }

  isBlocked(blockedBy : string, blockedFor : string) : Observable<Block> {
    return this.http.get<Block>(`${environment.baseUrl}/${environment.blocked}/${blockedBy}/${blockedFor}`)
  }

  isAllowedToSee(messageId : string) {
    return this.http.get(`${environment.baseUrl}/${environment.isAllowedToSee}/${messageId}`)
  }
}
