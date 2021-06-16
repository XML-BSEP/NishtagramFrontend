import { Unfollow } from './../../model/follow/unfollow';
import { ToastrService } from 'ngx-toastr';
import { FollowService } from './../../service/follow/follow.service';
import { ActivatedRoute } from '@angular/router';
import { UserInFeed } from './../../model/feed/userInFeed';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Following } from 'src/app/model/profile/following';
import { ProfileDTO } from 'src/app/model/profile/profileDTO';

@Component({
  selector: 'app-followings-dialog',
  templateUrl: './followings-dialog.component.html',
  styleUrls: ['./followings-dialog.component.css']
})
export class FollowingsDialogComponent implements OnInit {
  following : Following[];
  private curUsr
  userId : string
  loggedIn : boolean =false;

  constructor(
    private followService : FollowService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<FollowingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Following[]) { }

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
    this.following = this.data;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  unfollow(follow){
  //   public following : String;
  // public user : String;
    if(this.loggedIn){
      var unfollow = new Unfollow(follow.id, this.curUsr.id)
      console.log(unfollow)
      this.followService.unfollow(unfollow).subscribe(res=>{
        this.toastr.success('Successfully followed!')
        this.followService.getFollowing(new ProfileDTO(this.curUsr.id)).subscribe(
          res => {
            this.following = res
            if (this.following === null) {
              this.following = []
            }
            console.log(this.following)
          }
        )
      },error=>{
        this.toastr.error('OOOOOOOOpppsss something went wrong :(')
        console.log(error)
      });
    }

  }

}
