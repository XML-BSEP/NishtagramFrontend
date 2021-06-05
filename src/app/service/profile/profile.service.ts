import { Observable } from 'rxjs';
import { CheckLoggedUser } from './../../model/user/checkLoggedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

}
