import { NewstoryDialogComponent } from './../../dialogs/newstory-dialog/newstory-dialog.component';
import { ProfileStory } from './../../model/profile/profileStory';
import { ToastrService } from 'ngx-toastr';
import { TestService } from './../../service/test/test.service';
import { MatDialog } from '@angular/material/dialog';
import { PostInProfile } from './../../model/profile/postInProfile';
import { UserInFeed } from './../../model/feed/userInFeed';
import { NotificationsDialogComponent } from './../../dialogs/notifications-dialog/notifications-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Image } from 'src/app/model/feed/image';
import { Notification } from 'src/app/model/utilities/notification';

@Component({
  selector: 'app-customer-nav-bar',
  templateUrl: './regular-user-nav-bar.component.html',
  styleUrls: ['./regular-user-nav-bar.component.css']
})
export class RegularUserComponent implements OnInit {
  notifications : Notification[];
  notificationsOpen : boolean = false;
  story : ProfileStory;
  constructor(
    private dialog : MatDialog,
    private toastr : ToastrService,
    private authService : AuthenticationService

  ) { }

  ngOnInit(): void {
    let follow1 = new UserInFeed('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'));
    let follow2 = new UserInFeed('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'))
    let follow3 = new UserInFeed('treciFollower', new Image('3','https://i.imgur.com/XKIdf2g.jpeg'))
    let follow4 = new UserInFeed('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'))
    let post1 = new PostInProfile('pera123', new Image('5','https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'),'123')
    let post2 = new PostInProfile('pera123', new Image('6','https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),'1234')
    let post3 = new PostInProfile('pera123', new Image('7','https://i.imgur.com/1YrCKa1.jpg'),'12345')


    let not1 = new Notification(new Date(), "Liked your photo", "/profile", follow1, true, post1)
    let not2 = new Notification(new Date(), "Primer druge test notifikacije hahahaha", '/login', follow2, true, post2);
    let not3 = new Notification(new Date(), "Primer trece test notifikacije hahahaha", '/home', follow3, true, post3);
    let not4 = new Notification(new Date(), "Primer cetvrte test notifikacije hahahaha", '/', follow4, false, null);
    this.notifications = [not1, not2, not3, not4]

  }
  logout(){
    this.authService.logout()
  }
  openNotificationsDialog(){
    if(this.notificationsOpen==false){

      this.notificationsOpen=true;
        const dialogRef = this.dialog.open(NotificationsDialogComponent, {
        width: '26vw',
        height: '70vh',
        data: this.notifications
      });

      dialogRef.afterClosed().subscribe(result => {

        this.notificationsOpen = false;
      });

    }

  }

  openNewStoryDialog(){
    const dialogRef = this.dialog.open(NewstoryDialogComponent, {
      width: '35vw',
      height: '90vh'
    });
  }

}
