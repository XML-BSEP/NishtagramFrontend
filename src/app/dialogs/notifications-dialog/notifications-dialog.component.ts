import { NotificationService } from 'src/app/service/notification/notification.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Notification } from 'src/app/model/profile/notification';
import * as moment from 'moment';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.css']
})
export class NotificationsDialogComponent implements OnInit {
  public notifications : Notification[]
  public curUsr ;
  private pusherClient: Pusher;


  constructor(
    public notificationService :NotificationService,
    public router : Router,
    public dialogRef: MatDialogRef<NotificationsDialogComponent> ) { }


  ngOnInit(): void {
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.changePosition()
    this.getNotifications()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  goToNotification(n){
    location.href = n.redirect_path
    this.dialogRef.close();

  }
  getNotifications(){
    this.notificationService.getUserNotifications(this.curUsr.id).subscribe(
      rest => {
        console.log(rest)
        this.notifications = rest
        for(let i=0; i<this.notifications.length;i++){
          let a = moment(this.notifications[i].timestamp).fromNow();
          this.notifications[i].momentTime = a
        }
      }
    )

  }
  changePosition() {
    this.dialogRef.updatePosition({ top: '3.9rem', left: '85rem' });
  }

}
