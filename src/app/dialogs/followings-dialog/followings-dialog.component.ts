import { UserInFeed } from './../../model/feed/userInFeed';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Following } from 'src/app/model/profile/following';

@Component({
  selector: 'app-followings-dialog',
  templateUrl: './followings-dialog.component.html',
  styleUrls: ['./followings-dialog.component.css']
})
export class FollowingsDialogComponent implements OnInit {
  following : Following[];
  constructor(public dialogRef: MatDialogRef<FollowingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Following[]) { }

  ngOnInit(): void {
    this.following = this.data;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  unfollow(f){
    this.following = this.following.filter(obj => obj !== f);
  }
  removeCF(following){
    //poziv bekendu
  }
  addToCf(following){
    //poziv bekendu

  }
}
