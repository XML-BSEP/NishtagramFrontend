import { ToastrService } from 'ngx-toastr';
import { NotificationSettingsTypeValue } from './../../model/profile/notificationSettingsTypeValue';
import { NotificationTypeValue } from './../../model/profile/notificationTypeValue';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { NotificationSettings } from 'src/app/model/profile/notificationSettings';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {
  public isLikeDisabled : boolean;
  public isDislikeDisabled : boolean;
  public isCommentDisabled : boolean;
  public isPostDisabled : boolean;
  public isStoryDisabled : boolean;
  values : NotificationTypeValue[] = []
  notificationSettings : FormGroup;
  constructor(public toastr :ToastrService,public notificationService : NotificationService ,public dialogRef: MatDialogRef<NotificationSettingsComponent>, @Inject(MAT_DIALOG_DATA) public userFor : string) { }

  ngOnInit(): void {
    this.isLikeDisabled = false;
    this.isDislikeDisabled = false;
    this.isCommentDisabled = false;
    this.isPostDisabled = false;
    this.isStoryDisabled = false;
    //morma povezati sa bekendom da dobije umesto nulla vrednosti tih polja :D
    //TODO: POZIV PREMA BEKU DA UZMEM SVE TE SETTINGSE I DA MOGU DA IH UBACIM U OVAJ FORM CONTROLL
    //AL MORA KAO TRUE FALSE
    this.getBlocked();
  }

  dealWithButtons(){
    this.isLikeDisabled = false;
    this.isDislikeDisabled = false;
    this.isCommentDisabled = false;
    this.isPostDisabled = false;
    this.isStoryDisabled = false;

    for(let i=0;i<this.values.length;i++){
      if(this.values[i].type =="post"){
        this.isPostDisabled = true;
      }

      if(this.values[i].type =="like"){
        this.isLikeDisabled = true;
      }

      if(this.values[i].type =="dislike"){
        this.isDislikeDisabled = true;
      }

      if(this.values[i].type =="comment"){
        this.isCommentDisabled = true;
      }

      if(this.values[i].type =="story"){
        this.isStoryDisabled = true;
      }
    }
  }
  getBlocked(){
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

      this.notificationService.getUserNotificationSettings(this.userFor, curUsr.id).subscribe(
        rest => {
          this.values = rest;
          console.log(this.values)
          this.dealWithButtons()
        }
      )
  }
  blockPost(){
    let postType = "post"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.block(settings).subscribe(
        res=>{
          this.toastr.success("Successful blocked")
          this.getBlocked();
        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }
  blockStory(){
    let postType = "story"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.block(settings).subscribe(
        res=>{
          this.toastr.success("Successful blocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }
  blockLike(){
    let postType = "like"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.block(settings).subscribe(
        res=>{
          this.toastr.success("Successful blocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }
  blockDislike(){
    let postType = "dislike"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.block(settings).subscribe(
        res=>{
          this.toastr.success("Successful blocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }
  blockComment(){
    let postType = "comment"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.block(settings).subscribe(
        res=>{
          this.toastr.success("Successful blocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }
  unblockPost(){
    let postType = "post"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.unblock(settings).subscribe(
        res=>{
          this.toastr.success("Successful unblocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });
  }
  unblockStory(){
    let postType = "story"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.unblock(settings).subscribe(
        res=>{
          this.toastr.success("Successful unblocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });
  }
  unblockLike(){
    let postType = "like"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.unblock(settings).subscribe(
        res=>{
          this.toastr.success("Successful unblocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });
  }
  unblockDislike(){
    let postType = "dislike"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.unblock(settings).subscribe(
        res=>{
          this.toastr.success("Successful unblocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });
  }
  unblockComment(){
    let postType = "comment"
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))

    let newShit = new NotificationTypeValue(postType, true)
    let settings = new NotificationSettings(this.userFor,curUsr.id, newShit)
    this.notificationService.unblock(settings).subscribe(
        res=>{
          this.toastr.success("Successful unblocked")
          this.getBlocked();

        },
        error => {
          this.toastr.error("OOOOOOOOOOppppppppps something failed, we are terribly sorry :/ ")
        });

  }

}
