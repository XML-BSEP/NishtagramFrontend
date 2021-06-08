import { Follower } from './../../model/follow/follower';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.css']
})
export class FollowersDialogComponent implements OnInit {
  public followers : UserInFeed[];
  constructor( public dialogRef: MatDialogRef<FollowersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Follower[]) { }

  ngOnInit(): void {
    console.log(this.data)
    this.followers = this.data;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
