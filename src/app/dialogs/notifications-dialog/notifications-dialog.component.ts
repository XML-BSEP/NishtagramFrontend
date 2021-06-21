import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Notification } from 'src/app/model/utilities/notification';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.css']
})
export class NotificationsDialogComponent implements OnInit {
  public notifications : Notification[]
  private pusherClient: Pusher;


  constructor(
    public router : Router,
    public dialogRef: MatDialogRef<NotificationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification[]
  ) { 

   

  }

  ngOnInit(): void {
    this.notifications = this.data;
    this.changePosition()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  goToNotification(n){
    this.router.navigate([n.path]);
    this.dialogRef.close();

  }
  changePosition() {
    this.dialogRef.updatePosition({ top: '3.9rem', left: '85rem' });
}

}
