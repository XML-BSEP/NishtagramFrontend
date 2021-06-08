import { FollowReq } from './../../model/follow/followReq';
import { Observable } from 'rxjs';
import { FollowDTO } from './../../model/follow/followDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  isUserAllowedToFollow(followDTO : FollowDTO) {
    return this.http.post(`${"http://localhost:8089"}/${environment.isUserAllowedToFollow}`, followDTO);
  }
  follow(followDTO : FollowDTO) : Observable<Response>{
    return this.http.post<Response>(`${"http://localhost:8089"}/${environment.follow}`, followDTO, {responseType : 'json'});
  }
  cancelFollowRequest(followReq : FollowReq){
    return this.http.post(`${"http://localhost:8089"}/${environment.cancelFollowRequest}`, followReq);
  }
}
