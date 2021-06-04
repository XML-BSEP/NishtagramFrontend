import { ProfileDTO } from './../../model/profile/profileDTO';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }
  test():Observable<Response>{
    return this.http.post<Response>(`${environment.baseUrl}/${environment.login}`, {responseType : 'json'});
  }

  test1(data : ProfileDTO){
    return this.http.post(`${environment.baseUrl}/${environment.following}`, data,{responseType : 'json'});
  }
}
