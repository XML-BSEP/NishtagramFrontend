import { AuthenticationService } from './../../service/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/user/account';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Authentication } from 'src/app/model/security/authentication';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { VerifySecret } from 'src/app/model/verifysecret';
import { Role } from 'src/app/model/user/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class TotpLoginComponent implements OnInit {

  constructor(private router : Router, private toastr : ToastrService, private authService : AuthenticationService, private profileService : ProfileService) { }
  public loginForm: FormGroup;

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'passcode' : new FormControl(null, Validators.required),
    });
  }
  login(){
    var passcode = this.loginForm.controls.passcode.value;
    let verifySecret = new VerifySecret();
    verifySecret.passcode = passcode;
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    verifySecret.user_id = curUsr.id;
    this.profileService.validateTotp(verifySecret).subscribe(
      success => {
        this.router.navigate(['/home'])
        localStorage.setItem('currentUser', JSON.stringify(success));
        console.log(success);
      },
      error => {
        this.toastr.error("Passcode not valid")
      }
    )
    console.log(verifySecret)
  }
}
