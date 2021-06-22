import { ToastrService } from 'ngx-toastr';
import { FollowReq } from 'src/app/model/follow/followReq';
import { FollowRequest } from './../../model/profile/followRequest';
import { FollowService } from './../../service/follow/follow.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ProfileDTO } from 'src/app/model/profile/profileDTO';

@Component({
  selector: 'app-follow-request-dialog',
  templateUrl: './follow-request-dialog.component.html',
  styleUrls: ['./follow-request-dialog.component.css']
})
export class FollowRequestDialogComponent implements OnInit {
  public followRequests : FollowRequest[]
  constructor(
    public toastr : ToastrService,
    public folloService : FollowService,
    public dialogRef: MatDialogRef<FollowRequestDialogComponent>) { }
    public curUsr;
  ngOnInit(): void {
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.getAllUsersFollowRequests();
  }

  getAllUsersFollowRequests(){
    this.folloService.getFollowRequests(new ProfileDTO(this.curUsr.id)).subscribe(
      res => {
        this.followRequests = res
      }
    )
  }
  approveFollowRequest(req){
    let req1 = new FollowReq(req.userId, this.curUsr.id)
    this.folloService.approveFollowReq(req1).subscribe(
      res => {
        this.toastr.success("Successfully approved follow request!")
        this.getAllUsersFollowRequests();
      }, error => {
        this.toastr.error(error)
      }
    )
  }
}
