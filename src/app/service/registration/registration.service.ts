import { NewUser } from './../../model/user/newUser';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisteredUser } from 'src/app/model/user/registeredUser';
import { ConfirmRegistration} from 'src/app/model/user/confirmRegistration'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private https : HttpClient) { }

  register(data : NewUser){
    return this.https.post(`${environment.baseUrl}/${environment.registration}`,data, {responseType : 'json'});
  }

  checkUsername(data : string){
    return this.https.post(`${environment.baseUrl}/${environment.checkUsername}`,data, {responseType : 'json'});
  }
  checkEmail(data : string){
    return this.https.post(`${environment.baseUrl}/${environment.checkEmail}`,data, {responseType : 'json'});
  }
  confAcc(data : ConfirmRegistration){
    return this.https.post(`${environment.baseUrl}/${environment.confirmAccount}`,data, {responseType : 'json'});
  }

  resend(data : Object) {
    return this.https.post(`${environment.baseUrl}/${environment.resendRegCode}`, data, {responseType : 'json' })
  }
}
