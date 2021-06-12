import { AuthenticationService } from './../../service/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/user/account';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Authentication } from 'src/app/model/security/authentication';
import { ProfileService } from 'src/app/service/profile/profile.service';
import { isTotpEnabled } from 'src/app/model/istotpenabled';
import { Role } from 'src/app/model/user/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private toastr : ToastrService, private authService : AuthenticationService, private profileService : ProfileService) { }
  public loginForm: FormGroup;

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

    

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required])
    });
  }
  login(){
  
    var account = new Authentication(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    this.authService.login(account).subscribe(
      success => {
        let dto = new isTotpEnabled();
        let curUsr = JSON.parse(localStorage.getItem('currentUser'))
        dto.username = curUsr.id;

        this.profileService.isTotpEnabled(dto).subscribe(
          res => {
            this.router.navigate(['/home'])
          }, err => {
            if (err === "Two factor authentication is already enabled") {
              this.router.navigate(['/verify'])
            }
          } 
        )
      },
      error => {
        console.log(error)
        this.router.navigate(['/login'])
        this.toastr.error(error)
      }
    )
    console.log(account)
  }
}
