import { UserInFeed } from './../../model/feed/userInFeed';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-followings-dialog',
  templateUrl: './followings-dialog.component.html',
  styleUrls: ['./followings-dialog.component.css']
})
export class FollowingsDialogComponent implements OnInit {
  following : UserInFeed[];
  constructor(public dialogRef: MatDialogRef<FollowingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInFeed[]) { }

  ngOnInit(): void {
    this.following = this.data;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  unfollow(follow){
    this.following = this.following.filter(obj => obj !== follow);
  }
}
