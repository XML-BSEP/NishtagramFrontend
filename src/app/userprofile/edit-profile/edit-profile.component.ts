import { Router } from '@angular/router';
import { NewUser } from '../../model/user/newUser';
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
  imgFile : String;
  today : Date;
  changePass : boolean;
  user : NewUser;
  constructor(private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    if(history.state.data===undefined){
      this.router.navigate(['/home'])
    }
    console.log(history.state.data)
    this.user = history.state.data;
    this.changePass = false;
    this.today = new Date();
    this.changePasswordForm = new FormGroup({
     'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    'confirmPassword' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });

    this.registrationForm = new FormGroup({
    'name' : new FormControl(this.user.name, Validators.required),
    'surname' : new FormControl(this.user.surname, Validators.required),
    'email' : new FormControl(this.user.email, [Validators.required, Validators.email]),
    'address' : new FormControl(this.user.address, Validators.required),
    'phone' : new FormControl(this.user.phone, Validators.required),
    'birthday' : new FormControl(this.user.birthday, Validators.required),
    'gender' : new FormControl(this.user.gender, Validators.required),
    'web' : new FormControl(this.user.web),
    'bio' : new FormControl(this.user.bio),
    'username' : new FormControl(this.user.username, Validators.required),
    // 'password' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    // 'confirmPassword' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });
  this.imgFile=this.user.image;

  }
  toggleChangePassword(){
    this.changePass = !this.changePass;
  }

  confirmPassword(){
    if( this.checkPasswordValid()){

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
    this.fileName="emptyprofile.png";

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

}