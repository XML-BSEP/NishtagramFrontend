import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AgentRegistration } from 'src/app/model/user/agentRegistration';
import { RegistrationRequest } from 'src/app/model/user/registrationRequest';
import { RegistrationRequestService } from 'src/app/service/registration-request/registration-request.service';

@Component({
  selector: 'app-admin-registration-request',
  templateUrl: './admin-registration-request.component.html',
  styleUrls: ['./admin-registration-request.component.css']
})
export class AdminRegistrationRequestComponent implements OnInit {

  public requests : RegistrationRequest[] = new Array();
  public keys : string[];
  constructor(private registrationRequestService : RegistrationRequestService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.registrationRequestService.getRequests().subscribe(
      success => {
        this.requests = success
      }
    )

  }

  public confirm(email : string, d) {
    let confirmAccount = new AgentRegistration(true, email)
    this.registrationRequestService.confirmAgentAccount(confirmAccount).subscribe(
      success => {
        this.toastr.success("Agent account successfully confirmed")
        this.deleteRow(d)
      },
      error => {
        this.toastr.error("Error")
      }
    )
  }
  public decline(email : string, d) {
    let confirmAccount = new AgentRegistration(false, email)
    this.registrationRequestService.confirmAgentAccount(confirmAccount).subscribe(
      success => {
        this.toastr.success("Agent account successfully declined")
        this.deleteRow(d)
      },
      error => {
        this.toastr.error("Error")
      }
    )
  }
  deleteRow(d) {
    const index = this.requests.indexOf(d);
    this.requests.splice(index, 1);
  }

}
