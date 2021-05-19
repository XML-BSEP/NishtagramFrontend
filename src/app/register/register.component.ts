import { NewUser } from './../model/user/newUser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fileName : String="";
  today : Date;
  imgFile="../../assets/emptyprofile.png";

  constructor(private router: Router, private toastr : ToastrService) { }
  public registrationForm: FormGroup;
  ngOnInit(): void {
    this.today = new Date();
    this.registrationForm = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'surname' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'address' : new FormControl(null, Validators.required),
    'phone' : new FormControl(null, Validators.required),
    'birthday' : new FormControl(null, Validators.required),
    'gender' : new FormControl('1', Validators.required),
    'web' : new FormControl(null),
    'bio' : new FormControl(null),
    'username' : new FormControl(null, Validators.required),
    'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    'confirmPassword' : new FormControl(null, [Validators.required,    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });

  }


  onFileChanged(e) {
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imgFile = reader.result as string;
            this.fileName = file.name;
          };


    }

  }
  register(){
    var name = this.registrationForm.controls.name.value;
    var surname = this.registrationForm.controls.surname.value;
    var username = this.registrationForm.controls.username.value;
    var email = this.registrationForm.controls.email.value;
    var password = this.registrationForm.controls.password.value;
    var confirmPassword = this.registrationForm.controls.confirmPassword.value;
    var bio = this.registrationForm.controls.bio.value;
    var web = this.registrationForm.controls.web.value;
    var address = this.registrationForm.controls.address.value;
    var birthday = this.registrationForm.controls.birthday.value;
    var phone = this.registrationForm.controls.phone.value;
    var gender = this.registrationForm.controls.gender.value;

    console.log(password);
    if(password===confirmPassword){
      var newUser = new NewUser(name, surname,email, address, phone, birthday, gender, web, bio, username, password, confirmPassword, this.imgFile)
      console.log(newUser)
    }

  }

  checkPassword() {
    var password =  this.registrationForm.controls.password.value;
    var regex = new RegExp('^[A-Z][A-Za-z0-9]+[$@$!%*?&]{1}$')
    console.log(regex.test(password))
    if(regex.test(password)){
      this.toastr.warning("You are using common password type!")

    }


  }
  removePhoto(){

    this.imgFile="../../assets/emptyprofile.png";
    this.fileName="";

  }
  isEmptyImage(){
    if(this.imgFile==="../../assets/emptyprofile.png"){
      return true;
    }else{
      return false;
    }
  }
  removeImg(){
    this.imgFile="";
    this.fileName="";

  }
}
