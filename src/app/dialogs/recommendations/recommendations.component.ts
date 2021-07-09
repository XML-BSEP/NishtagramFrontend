import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FollowDTO } from 'src/app/model/follow/followDTO';
import { UserDTO } from 'src/app/model/follow/userDTO';
import { SearchedUser } from 'src/app/model/profile/searchedProfile';
import { User } from 'src/app/model/profile/user';
import { FollowService } from 'src/app/service/follow/follow.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  public recommendations : SearchedUser[];
  constructor(public dialogRef: MatDialogRef<RecommendationsComponent>, private followService : FollowService, private toastr : ToastrService) { }

  ngOnInit(): void {
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    
    this.followService.recomemnd(curUsr.id).subscribe(
      res => {
        this.recommendations = res;
      }
    )
  }
  followUser(follow : SearchedUser){
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    let followDTO = new FollowDTO(new UserDTO(follow.id), new UserDTO(curUsr.id))
    this.followService.follow(followDTO).subscribe(res=>{
      this.toastr.success('Successfully followed!')
      location.reload();

    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }

}
