import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public registrationForm: FormGroup;
  public changePasswordForm : FormGroup;
  fileName : String="";
  imgFile : string;
  today : Date;
  changePass : boolean;
  constructor(private toastr : ToastrService) { }

  ngOnInit(): void {
    this.changePass = false;
    this.today = new Date();
    this.changePasswordForm = new FormGroup({
     'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    'confirmPassword' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });

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
    // 'password' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    // 'confirmPassword' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });
  this.imgFile="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

  }
  toggleChangePassword(){
    this.changePass = !this.changePass;
  }

  confirmPassword(){
    if( this.checkPasswordValid()){
      //TODO: BACKEND
      this.changePasswordForm.reset();
    }
  }

  checkPasswordValid(){
    return this.changePasswordForm.controls.password.value === this.changePasswordForm.controls.confirmPassword.value
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
  checkPassword() {
    var password =  this.registrationForm.controls.password.value;
    var regex = new RegExp('^[A-Z][A-Za-z0-9]+[$@$!%*?&]{1}$')
    console.log(regex.test(password))
    if(regex.test(password)){
      this.toastr.warning("You are using common password type!")

    }


  }
  removeImg(){
    this.imgFile="";
    this.fileName="";

  }
}
