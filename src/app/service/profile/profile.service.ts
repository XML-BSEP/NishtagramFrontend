import { Observable } from 'rxjs';
import { CheckLoggedUser } from './../../model/user/checkLoggedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {User} from './../../model/profile/user';
import {UserProfile} from './../../model/profile/userProfile';
import {EditUser} from 'src/app/model/user/editUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // checkUserLogged(data : CheckLoggedUser):Observable<CheckLoggedUser>{
  //   return this.http.post<Response>(`${environment.baseUrl}/${environment.checkLoggedUser}`,data, {responseType : 'json'});
  // }

  // checkUserLogged(data : CheckLoggedUser):Observable<>{
  //   return this.http.post<Response>(`${environment.baseUrl}/${environment.checkLoggedUser}`,data, {responseType : 'json'});
  // }

  getUserById(id : String) : Observable<User>{ 
    return this.http.get<User>(`${environment.baseUrl}/${environment.getUserById}?userId=${id}`);
  }

  getUserProfileById(id : String) : Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.baseUrl}/${environment.getUserById}?userId=${id}`);
  }

  editProfile(user : EditUser) : Observable<EditUser> {
    return this.http.post<EditUser>(`${environment.baseUrl}/${environment.editUser}`, user, {responseType : `json`});
  }


}
