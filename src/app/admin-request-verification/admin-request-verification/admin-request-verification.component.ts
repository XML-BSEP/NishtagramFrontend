import { Component, OnInit } from '@angular/core';
import {RequestVerification} from '../../model/request-verification/requestVerification';
import { RequestVerificationService } from 'src/app/service/request-verification/request-verification.service';
import { RequestVerificationToChangeState } from 'src/app/model/request-verification/requestVerificationToChangeState';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-request-verification',
  templateUrl: './admin-request-verification.component.html',
  styleUrls: ['./admin-request-verification.component.css']
})
export class AdminRequestVerificationComponent implements OnInit {

  constructor(private requestVerificationService : RequestVerificationService, private toastr : ToastrService,) { }

  public requestVerifications : RequestVerification[] = new Array()
  public rejectVerification : RequestVerificationToChangeState;



  ngOnInit(): void {
    this.requestVerificationService.getAllRequestVerifications().subscribe(
      data => {
        this.requestVerifications = data;
        console.log(this.requestVerifications)
      }
    );
  }

  reject(verification) {
   this.rejectVerification = new RequestVerificationToChangeState();
   this.rejectVerification.id = verification.id
   this.rejectVerification.profileId = verification.profile_id;
   
   this.requestVerificationService.rejectVerification(this.rejectVerification).subscribe(
     res => {
      this.toastr.success("Successfully rejected")
      location.reload();
     },
     error => {
       this.toastr.error(error)
     }
   );

  }

  
  approve(verification) {
    this.rejectVerification = new RequestVerificationToChangeState();
    this.rejectVerification.id = verification.id
    this.rejectVerification.profile_id = verification.profile_id;
    
    this.requestVerificationService.approveVerification(this.rejectVerification).subscribe(
      res => {
       this.toastr.success("Successfully approved")
       location.reload();
      },
      error => {
        this.toastr.error(error)
      }
    );
 
   }



}
