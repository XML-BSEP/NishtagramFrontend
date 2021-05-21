import { PostInProfile } from './../../model/profile/postInProfile';
import { NotificationsDialogComponent } from '../../dialogs/notifications-dialog/notifications-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/model/utilities/notification';
import { Image } from 'src/app/model/feed/image';

@Component({
  selector: 'app-not-user-nav-bar',
  templateUrl: './not-user-nav-bar.component.html',
  styleUrls: ['./not-user-nav-bar.component.css']
})
export class NotUserNavBarComponent implements OnInit {
  notifications : Notification[];
  constructor(
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    let follow1 = new UserInFeed('prviFollower' , new Image('https://i.imgur.com/VQkoalX.jpeg'));
    let follow2 = new UserInFeed('drugiFollower', new Image('https://i.imgur.com/G8p9qBk.jpeg'))
    let follow3 = new UserInFeed('treciFollower', new Image('https://i.imgur.com/XKIdf2g.jpeg'))
    let follow4 = new UserInFeed('cetvrtiFollower', new Image('https://i.imgur.com/s7fMnMg.jpeg'))
    let post1 = new PostInProfile('pera123', new Image('https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'),'123')
    let post2 = new PostInProfile('pera123', new Image('https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),'1234')
    let post3 = new PostInProfile('pera123', new Image('https://i.imgur.com/1YrCKa1.jpg'),'12345')


    let not1 = new Notification(new Date(), "Liked your photo", "/profile", follow1, true, post1)
    let not2 = new Notification(new Date(), "Primer druge test notifikacije hahahaha", '/login', follow2, true, post2);
    let not3 = new Notification(new Date(), "Primer trece test notifikacije hahahaha", '/home', follow3, true, post3);
    let not4 = new Notification(new Date(), "Primer cetvrte test notifikacije hahahaha", '/', follow4, false, null);
    this.notifications = [not1, not2, not3, not4]

  }
  openNotificationsDialog(){


    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      width: '26vw',
      height: '70vh',
      data: this.notifications
    });
  }
}
