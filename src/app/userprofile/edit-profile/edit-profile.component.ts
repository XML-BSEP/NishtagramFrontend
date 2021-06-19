import { GetPostDTO } from 'src/app/model/getpost';
import { PostInProfile } from 'src/app/model/profile/postInProfile';
import { UserInFeed } from 'src/app/model/feed/userInFeed';
import { Router } from '@angular/router';
import { NewUser } from '../../model/user/newUser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/profile/user';
import {EditUser} from 'src/app/model/user/editUser';
import {ProfileService} from 'src/app/service/profile/profile.service'
import { VerifySecret } from 'src/app/model/verifysecret';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { isTotpEnabled } from 'src/app/model/istotpenabled';
import { PostService } from 'src/app/service/post/postservice';
import {RequestVerificationService} from 'src/app/service/request-verification/request-verification.service';
import { NewRequestVerification } from 'src/app/model/request-verification/newRequestVerification';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public registrationForm: FormGroup;
  public changePasswordForm : FormGroup;
  public accountSettingsForm : FormGroup;
  public verificationForm : FormGroup;
  public interactionForm : FormGroup;

  fileName : String="";
  imgFile : String;
  today : Date;
  changePass : boolean;
  user : NewUser;
  editUser : User;
  public isEnabled2fa : boolean;
  public privateStatus : boolean;
  fileNameVerifiaction : String = "";
  posts : PostInProfile[];

  public showQRCodeDetails : boolean = false;
  public passCode : String;
  public qrCodeImg : String;
  public showResults : boolean = false;
  public passcodeForm : FormGroup;
  public showDisabledPassCode : boolean = false;
  public accSettings : boolean = false;
  public profileInfo : boolean = true;
  public security : boolean = false;
  public notifications : boolean = false;
  public requestVerification : boolean = false;
  public postsWithInteractions : boolean = false;
  public requestVerifications : String[] = ["Influencer", "Sports", "NewMedia", "Business", "Brand", "Organization"];
  public interactionCriteria : String[] = ["Liked posts", "Disliked posts", "Commented posts"];

  public selectedRequsetVerification : String;

  public selectedRequestValue : String;
  public selectedInteractionValue : String;
  public imageVerification: String;

  public curUsr ;
  constructor(private router: Router, private toastr : ToastrService, private privateService : ProfileService, private authenticationService : AuthenticationService,    private postService : PostService, private requestVerificationService : RequestVerificationService) { }
  emptyImg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="


  ngOnInit(): void {
    if(history.state.data===undefined){
      this.router.navigate(['/profile'])
    }

    let dto = new isTotpEnabled();
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    dto.username = this.curUsr.id;


    this.privateService.isTotpEnabled(dto).subscribe(
      res => {
          this.isEnabled2fa = false;
          this.showResults = true;
          this.showDisabledPassCode = false;
      }, err => {
        if (err === "Two factor authentication is already enabled") {
          console.log("SADASDASD")
          this.isEnabled2fa = true;
          this.showResults = true;
          this.showDisabledPassCode = true;
        } else {
          this.isEnabled2fa = false;
          this.showResults = true;
        }


      }
    )
    console.log(history.state.data)
    this.user = history.state.data;
    this.today = new Date();
    this.changePasswordForm = new FormGroup({
     'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    'confirmPassword' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });
  this.accountSettingsForm = new FormGroup({
    'private' : new FormControl(this.user.private),
    'messages' : new FormControl(null),
    'tags' : new FormControl(null),
 });
  this.passcodeForm = new FormGroup({
    "passcode" : new FormControl("", [Validators.required])
  });
  this.verificationForm = new FormGroup({
    'name' : new FormControl(this.user.name, Validators.required),
    'surname' : new FormControl(this.user.surname, Validators.required),
    'reqVerification' : new FormControl("", Validators.required),
  })
  this.interactionForm= new FormGroup({
    'criteria' : new FormControl("", Validators.required),

  })


  this.registrationForm = new FormGroup({

    'name' : new FormControl(this.user.name, Validators.required),
    'surname' : new FormControl(this.user.surname, Validators.required),
    'email' : new FormControl(this.user.email, [Validators.required, Validators.email]),
    'address' : new FormControl(this.user.address, Validators.required),
    'phone' : new FormControl(this.user.phone, Validators.required),
    'birthday' : new FormControl(new Date(this.user.birthday), Validators.required),
    'gender' : new FormControl(this.user.gender, Validators.required),
    'web' : new FormControl(this.user.web),
    'bio' : new FormControl(this.user.bio),
    'username' : new FormControl(this.user.username, Validators.required),
    // 'password' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
    // 'confirmPassword' : new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9\d$@$!%*?&].{7,}$')]),
  });
  this.imgFile=this.user.image;
  this.privateStatus = this.user.private;

  this.imageVerification = this.emptyImg;

  }

  setPrivateStatus(){
    this.privateStatus = !this.privateStatus
    //TODO: POZIV BEKU ZA ISPRAVKU PRIVATNOSTI
  }

  confirmPassword(){
    if( this.checkPasswordValid()){
      this.changePasswordForm.reset();
    }
  }

  disable2FA() {
    var passcode = this.passcodeForm.controls.passcode.value;
    let verifySecret = new VerifySecret();
    verifySecret.passcode = passcode;
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    verifySecret.user_id = curUsr.id;

    this.privateService.disableTotp(verifySecret).subscribe(
      res => {
        this.toastr.success("Successfully disabled two factor authentication!")
      }, err => {
        this.toastr.error(err)
      }
    )

  }

  confirm2FA() {
    var passcode = this.passcodeForm.controls.passcode.value;
    let verifySecret = new VerifySecret();
    verifySecret.passcode = passcode;
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    verifySecret.user_id = curUsr.id;

    this.privateService.verifySecret(verifySecret).subscribe(
      res => {
        this.toastr.success("Successfully enabled two factor authentication!")
      }, err => {
        this.toastr.error(err)
      }
    )


  }

  enable2fa() {
    this.isEnabled2fa = !this.isEnabled2fa;

    if (this.isEnabled2fa) {
      this.privateService.generateSecret().subscribe(
        res => {
          this.qrCodeImg = res.qrcode;
          console.log(this.qrCodeImg)
          this.showQRCodeDetails = true;

        }, err => {
          this.isEnabled2fa = !this.isEnabled2fa;
          this.toastr.error(err)
        }
      )
    } else {
      this.showQRCodeDetails = false;
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

    this.imgFile=this.emptyImg;
    this.fileName="emptyprofile.png";

  }
  isEmptyImage(){
    if(this.imgFile===this.emptyImg){
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

  confirmEdit() {

    var name = this.registrationForm.controls.name.value;
    var surname = this.registrationForm.controls.surname.value;
    var email = this.registrationForm.controls.email.value;
    var address = this.registrationForm.controls.address.value;
    var phone = this.registrationForm.controls.phone.value;
    var birthday = this.registrationForm.controls.birthday.value;
    var gender = this.registrationForm.controls.gender.value;
    var web = this.registrationForm.controls.web.value;
    var bio = this.registrationForm.controls.bio.value;
    var username = this.registrationForm.controls.username.value;

    var date =  (new Date(new Date(birthday).toString().split('GMT')[0]+' UTC').toISOString());


    var editUser = new EditUser(name, surname, email, address, phone, date, gender, web, bio, username, this.imgFile, true)

    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    editUser.id = curUsr.id;
    this.privateService.editProfile(editUser).subscribe(
      res => {
        this.toastr.success("Edited!");
        location.reload();
      },
      err => {
        this.toastr.error(err);
      }
    );

  }
  goToAccSettings(){
    this.accSettings = true;
    this.profileInfo = false;
    this.notifications = false;
    this.security = false;
    this.requestVerification = false;
    this.postsWithInteractions = false;
  }
  goToProfileInfo(){
    this.accSettings = false;
    this.profileInfo = true;
    this.notifications = false;
    this.security = false;
    this.requestVerification = false;
    this.postsWithInteractions = false;

  }
  goToSecurity(){
    this.accSettings = false;
    this.profileInfo = false;
    this.notifications = false;
    this.security = true;
    this.requestVerification = false;
    this.postsWithInteractions = false;

  }
  goToNotifications(){
    this.accSettings = false;
    this.profileInfo = false;
    this.notifications = true;
    this.security = false;
    this.requestVerification = false;
    this.postsWithInteractions = false;

  }

  goToRequestVerification() {
    this.accSettings = false;
    this.profileInfo = false;
    this.notifications = false;
    this.security = false;
    this.requestVerification = true;
    this.postsWithInteractions = false;

  }
  goToPostsWithInteractions() {
    this.accSettings = false;
    this.profileInfo = false;
    this.notifications = false;
    this.security = false;
    this.requestVerification = false;
    this.postsWithInteractions = true;

  }

  comboChangeVerification(event){
    if(!event) {
      this.selectedRequsetVerification = this.selectedRequestValue;
      console.log(this.selectedRequsetVerification);
    }
  }

  comboChangeInteractionCriteria(event){
    //TODO: A CALL TOWARDS BACKEND JUST MOCKED SO NEEDS IMPLEMENTATION

    if(this.interactionForm.controls.criteria.value==="Liked posts"){
      this.mockPosts();
    }else if(this.interactionForm.controls.criteria.value==="Disliked posts"){
      // this.mockPosts();
      this.posts=[];
    }else{
      // this.mockPosts();
      this.posts=[]
    }
  }

  isEmptyVerificationImage(){
    if(this.imageVerification===this.emptyImg){
      return true;
    }else{
      return false;
    }
  }
  cancelEdit(){

  }
  onFileChangedVerification(e) {
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imageVerification = reader.result as string;
            this.fileNameVerifiaction = file.name;
          };

    }

  }

  mockPosts(){

    let userInFeed = new UserInFeed(this.curUsr.id, this.curUsr.username, "")

    this.postService.getAllPostsInProfile(userInFeed).subscribe(
      res => {
        this.posts = []
        for (let p of res) {
          this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
          this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
          this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
          this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
          this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))

        }
      }
    )
  }

  showImage(post : PostInProfile){
    let postDTO = new GetPostDTO();
    console.log(post.postid)
    postDTO.PostId = post.postid;

    if (post.postBy === "" || post.postBy === undefined) {
      console.log(post.postBy)
      postDTO.UserId = post.user;
    } else {
      console.log(post.postBy)
      postDTO.UserId = post.postBy
    }

    this.postService.getPostById(postDTO).subscribe(
      res => {
        console.log(res)
        this.router.navigate(["/postDetails"], {state: {data: res}})
      }
    )
    console.log(post)
  }

  removePhotoVerification(){

    this.imageVerification=this.emptyImg;
    this.fileNameVerifiaction="emptyprofile.png";
  }

  sendRequestVerification() {
    var name = this.verificationForm.controls.name.value;
    var surname = this.verificationForm.controls.surname.value;
    var newRequestVerification = new NewRequestVerification(name, surname, this.selectedRequsetVerification, this.imageVerification, this.curUsr.id);
    
    this.requestVerificationService.saveNewRequestVerification(newRequestVerification).subscribe(
      res => {
        this.toastr.success("Verification request is sent!")
      },
      err => {
        this.toastr.error(err);
      }
    );

  }



}
