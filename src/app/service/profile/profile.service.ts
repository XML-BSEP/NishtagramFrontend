import { Observable } from 'rxjs';
import { CheckLoggedUser } from './../../model/user/checkLoggedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {User} from './../../model/profile/user';
import {UserProfile} from './../../model/profile/userProfile';
import {EditUser} from 'src/app/model/user/editUser';
import { ScanTotp } from 'src/app/model/scan_totp';
import { VerifySecret } from 'src/app/model/verifysecret';
import { AuthenticatedUser } from 'src/app/model/security/authenticatedUser';
import { isTotpEnabled } from 'src/app/model/istotpenabled';
import { SearchedUser } from 'src/app/model/profile/searchedProfile';

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

  isTotpEnabled(dto : isTotpEnabled) : Observable<Response> {
    return this.http.post<Response>(`${environment.baseUrl}/${environment.isTotpEnabled}`, dto)
  }

  generateSecret() : Observable<ScanTotp> {
    return this.http.get<ScanTotp>(`${environment.baseUrl}/${environment.generateSecret}`)
  }

  verifySecret(verifySecret : VerifySecret) : Observable<Response> {
    return this.http.post<Response>(`${environment.baseUrl}/${environment.verifySecret}`, verifySecret)
  }

  disableTotp(verifySecret : VerifySecret) : Observable<Response> {
    return this.http.post<Response>(`${environment.baseUrl}/${environment.disableTwoFactor}`, verifySecret)
  }

  validateTotp(verifySecret : VerifySecret) : Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${environment.baseUrl}/${environment.validateTotp}`, verifySecret)
  }

  
  searchUser(search : String) : Observable<SearchedUser[]> {
    return this.http.get<SearchedUser[]>(`${environment.baseUrl}/${environment.searchUser}?search=${search}`);
  }
}
