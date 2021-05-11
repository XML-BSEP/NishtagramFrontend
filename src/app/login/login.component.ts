import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Account } from '../model/user/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  public loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required])
    });
  }
  login(){
    var account = new Account(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    console.log(account)
  }
}
