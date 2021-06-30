import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/user/role';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-registration',
  templateUrl: './pre-registration.component.html',
  styleUrls: ['./pre-registration.component.css']
})
export class PreRegistrationComponent implements OnInit {

  public preRegistrationForm: FormGroup;


  constructor(private router : Router) { }

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

    this.preRegistrationForm = new FormGroup({
      'option' : new FormControl('user', Validators.required)
    });
  }


  public onClick() {
    var selectedValue = this.preRegistrationForm.controls.option.value

    console.log(selectedValue);

    if (selectedValue === "user") {
      this.router.navigate(['/registration']);
    }

    if (selectedValue === "agent") {
      this.router.navigate(['/agentRegistration']);
    }

  }

}
