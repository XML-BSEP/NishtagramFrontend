import { FollowReq } from './../../model/follow/followReq';
import { Observable } from 'rxjs';
import { FollowDTO } from './../../model/follow/followDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/model/follow/userDTO';
import { UserInFeed } from 'src/app/model/feed/userInFeed';
import { Following } from 'src/app/model/profile/following';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient) { }

  isUserAllowedToFollow(followDTO : FollowDTO) {
    return this.http.post(`${environment.baseUrl}/${environment.isUserAllowedToFollow}`, followDTO);
  }
  follow(followDTO : FollowDTO) : Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.follow}`, followDTO, {responseType : 'json'});
  }
  unfollow(followDTO : FollowDTO) : Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.unfollow}`, followDTO, {responseType : 'json'});
  }
  cancelFollowRequest(followReq : FollowReq){
    return this.http.post(`${environment.baseUrl}/${environment.cancelFollowRequest}`, followReq);
  }

  getFollowers(user : UserInFeed) : Observable<UserInFeed[]> {
    return this.http.post<UserInFeed[]>(`${environment.baseUrl}/${environment.followers}`, user)
  }
  getFollowing(user : UserInFeed) : Observable<Following[]> {
    return this.http.post<Following[]>(`${environment.baseUrl}/${environment.followingFront}`, user)
  }
}
