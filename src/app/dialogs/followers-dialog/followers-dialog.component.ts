import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FollowService } from './../../service/follow/follow.service';
import { Follower } from './../../model/follow/follower';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloseFriend } from 'src/app/model/follow/closeFriend';
import { ProfileDTO } from 'src/app/model/profile/profileDTO';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.css']
})
export class FollowersDialogComponent implements OnInit {
  public followers : Follower[];
  private curUsr
  userId : string
  loggedIn : boolean =false;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    public followService : FollowService,
    public toastr : ToastrService,
    public dialogRef: MatDialogRef<FollowersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Follower[]) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.userId = params.id;
    });

    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    if(this.userId==undefined){
      this.userId = this.curUsr.id
      this.loggedIn = true;
    }

    console.log(this.userId)
    console.log(this.data)
    this.followers = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  removeCF(follow){
    console.log(follow)
    var cf = new CloseFriend(follow.id, this.userId)
    this.followService.removeFromCloseFriends(cf).subscribe(
      res => {
        this.toastr.success("Successfully removed from close friends!")
        this.followService.getFollowers(new ProfileDTO(this.userId)).subscribe(
          res => {
            this.followers = res
            if (this.followers === null) {
              this.followers = []
            }
            console.log(this.followers)
          }
        )
      }, error => {
        this.toastr.error(error)
      }
    )
  }
  goToProfile(follower){
    let url = "/profile?id="+follower.id
    location.href = url;
  }


  addToCf(follow){
    console.log(follow)
    var cf = new CloseFriend(follow.id, this.userId)
    this.followService.addToCloseFriends(cf).subscribe(
      res => {
        this.toastr.success("Successfully added to close friends!")
        this.followService.getFollowers(new ProfileDTO(this.userId)).subscribe(
          res => {
            this.followers = res
            if (this.followers === null) {
              this.followers = []
            }
            console.log(this.followers)
          }
        )
      }, error => {
        this.toastr.error(error)
      }
    )

  }
}
