import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/user/account';
import { LoginService } from 'src/app/service/login/login.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router, private toastr : ToastrService) { }
  public loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required])
    });
  }
  login(){
    var account = new Account(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    this.loginService.login(account).subscribe(
      success => {
        this.router.navigate(['/home'])
      },
      error => {
        this.router.navigate(['/login'])
        this.toastr.error(error)
      }
    )
    console.log(account)
  }
}
