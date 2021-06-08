import { AuthenticationService } from './../../service/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/user/account';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Authentication } from 'src/app/model/security/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private toastr : ToastrService, private authService : AuthenticationService) { }
  public loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required])
    });
  }
  login(){
    var account = new Authentication(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    this.authService.login(account).subscribe(
      success => {
        this.router.navigate(['/home'])
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
