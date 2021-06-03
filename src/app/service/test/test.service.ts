import { ProfileDTO } from './../../model/profile/profileDTO';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {


  }
  test(){
    return this.http.post(`${environment.baseUrl}/${environment.login}`, {responseType : 'json'});
  }

  test1(data : ProfileDTO){
    return this.http.post(`${environment.baseUrl}/${environment.usersFollowings}`, data,{responseType : 'json'});
  }
}
