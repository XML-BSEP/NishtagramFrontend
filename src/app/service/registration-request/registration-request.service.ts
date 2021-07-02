import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentRegistration } from 'src/app/model/user/agentRegistration';
import { RegistrationRequest } from 'src/app/model/user/registrationRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  constructor(private http : HttpClient) { }

  getRequests() : Observable<RegistrationRequest[]> {
    return this.http.get<RegistrationRequest[]>(`${environment.baseUrl}/${environment.agent}`)
  }

  confirmAgentAccount(data : AgentRegistration) {
    return this.http.post(`${environment.baseUrl}/${environment.confirmAgentAccount}`, data, {responseType : 'json'})
  }
}
