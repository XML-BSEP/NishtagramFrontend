import { FollowRequest } from './../../model/profile/followRequest';
import { Unfollow } from './../../model/follow/unfollow';
import { ProfileDTO } from './../../model/profile/profileDTO';
import { CloseFriend } from './../../model/follow/closeFriend';
import { FollowReq } from './../../model/follow/followReq';
import { Observable } from 'rxjs';
import { FollowDTO } from './../../model/follow/followDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/model/follow/userDTO';
import { UserInFeed } from 'src/app/model/feed/userInFeed';
import { Following } from 'src/app/model/profile/following';
import { Follower } from 'src/app/model/follow/follower';

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
  unfollow(unfollow : Unfollow) : Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.unfollow}`, unfollow, {responseType : 'json'});
  }
  addToCloseFriends(cf : CloseFriend) : Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.addToCloseFriends}`, cf, {responseType : 'json'});
  }
  removeFromCloseFriends(cf : CloseFriend) : Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.removeFromCloseFriends}`, cf, {responseType : 'json'});
  }
  cancelFollowRequest(followReq : FollowReq){
    return this.http.post(`${environment.baseUrl}/${environment.cancelFollowRequest}`, followReq);
  }

  getFollowers(user : ProfileDTO) : Observable<Follower[]> {
    return this.http.post<Follower[]>(`${environment.baseUrl}/${environment.getAllUsersFollowersFront}`, user)
  }

  getFollowing(user : ProfileDTO) : Observable<Following[]> {
    return this.http.post<Following[]>(`${environment.baseUrl}/${environment.followingFront}`, user)
  }

  isUserFollowingUser(follow : FollowDTO) :Observable<boolean>{
    return this.http.post<boolean>(`${environment.baseUrl}/${environment.isUserFollowingUser}`, follow);
  }

  getFollowRequests(user : ProfileDTO) : Observable<FollowRequest[]> {
    return this.http.post<FollowRequest[]>(`${environment.baseUrl}/${environment.getAllUsersFollowRequests}`, user)
  }
  approveFollowReq(fr : FollowReq) : Observable<Response> {
    return this.http.post<Response>(`${environment.baseUrl}/${environment.approveFollowRequest}`, fr)
  }

}
