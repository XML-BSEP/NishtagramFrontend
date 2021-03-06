import { ConfirmRegHistory } from './../../model/user/confirmRegHistory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../service/registration/registration.service';
import {ConfirmRegistration} from '../../model/user/confirmRegistration'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/model/user/role';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent implements OnInit {

  constructor(private router : Router, private registrationService : RegistrationService, private toastr : ToastrService) { }
  public codeForm : FormGroup;
  private mail : string;
  private username : string
  private confirmRegHistory : ConfirmRegHistory
  private confirmRegistration : ConfirmRegistration


  ngOnInit(): void {
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    if (curUsr != null) {
      if (curUsr.role == Role.RegularUser) {
        this.router.navigate(['/home'])
      }
      else if (curUsr.role == Role.Admin) {
        this.router.navigate(['/admin'])
      }
    }

    this.codeForm = new FormGroup({
      //maybe add pattern for code validation on frontend
      'code' : new FormControl(null, [Validators.required])
    });

    if(history.state.data === undefined){
      this.router.navigate(['/home'])
    }else{
      this.confirmRegHistory = history.state.data;

    }
  }
  confirm(){
    console.log(this.mail)
    this.confirmRegistration = new ConfirmRegistration(this.confirmRegHistory.email, this.codeForm.controls.code.value, this.confirmRegHistory.username)

    if (this.confirmRegHistory.role == "user") {
      this.registrationService.confAcc(this.confirmRegistration).subscribe(
        res=>{
          this.toastr.success("Successful confirmation")
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error("Confirmation code is not correct")
        }


          )
    }

    if (this.confirmRegHistory.role == "agent") {
      this.registrationService.validateAgentAcc(this.confirmRegistration).subscribe(
        res=>{
          this.toastr.success("Successful confirmation")
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error("Confirmation code is not correct")
        }


          )
    }

  }
  resend(){
    let sendData = {
      "email" : this.confirmRegHistory.email,
      "username" : this.confirmRegHistory.username
    }
    console.log(sendData)
    this.registrationService.resend(sendData).subscribe(
      res => {
        this.toastr.success("Resend successful, check your email!")
      },
      error => {
        this.toastr.error("Something went wrong, your code probably expired, try to register again.")
      }
    )

  }
}
