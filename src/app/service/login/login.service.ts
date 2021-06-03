import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/model/user/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  login(account : Account) {
    return this.httpClient.post(`${environment.baseUrl}/${environment.login}`, account)
  }
}
