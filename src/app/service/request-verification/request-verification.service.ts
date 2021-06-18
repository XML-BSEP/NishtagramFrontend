import { Observable } from 'rxjs';
import { CheckLoggedUser } from './../../model/user/checkLoggedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestVerification } from 'src/app/model/request-verification/requestVerification';
import { RequestVerificationToChangeState } from 'src/app/model/request-verification/requestVerificationToChangeState';

@Injectable({
  providedIn: 'root'
})
export class RequestVerificationService {

  constructor(private http: HttpClient) { }

  
  getAllRequestVerifications() : Observable<RequestVerification[]>{ 
    return this.http.get<RequestVerification[]>(`${environment.baseUrl}/${environment.getAllRequestVerifications}`);
  }

  rejectVerification(verification : RequestVerificationToChangeState) { 
    return this.http.post(`${environment.baseUrl}/${environment.rejectRequestVerification}`, verification);
  }

  approveVerification(verification : RequestVerificationToChangeState) { 
    return this.http.post(`${environment.baseUrl}/${environment.approveRequestVerification}`, verification);
  }
}
