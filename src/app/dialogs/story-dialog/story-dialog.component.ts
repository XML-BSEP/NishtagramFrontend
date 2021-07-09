import { Router } from '@angular/router';
import { Story } from './../../model/feed/story';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Post } from 'src/app/model/feed/post';
import { ReportPost } from 'src/app/model/reports/reportPost';
import { ReportPostDialogComponent } from '../report-post-dialog/report-post-dialog.component';
import { UserInFeed } from 'src/app/model/feed/userInFeed';
import { ClickEvent } from 'src/app/model/clickevent';
import { AgentService } from 'src/app/service/agent/agent_service';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.css']
})
export class StoryDialogComponent implements OnInit {
  public canReport : boolean = true;
  public isAdmin : boolean = false;

  constructor( public dialogRef: MatDialogRef<StoryDialogComponent>, private dialog : MatDialog, private agentService : AgentService,
    @Inject(MAT_DIALOG_DATA) public data: Story) {
            
    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
   
    console.log(curUsr.role)
    if(curUsr.role === "admin") {
      this.isAdmin = true;
      this.canReport = false;
    }
     }


  ngOnInit(): void {

    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    if(curUsr.id==this.data.user.id){
      this.canReport = false;
    }
  }
  goToProfile(){
    location.href = "/profile?id="+this.data.user.id
      // this.router.navigate(['/profile'], { queryParams: { id: this.data.user.id } });
  }

  

  addEvent() {
    if (this.data.isCampaign && !this.data.isAd) {
      let addEvent = new ClickEvent();
      addEvent.campaignId = this.data.campaignId;
      addEvent.influencerId = this.data.user.id;
      this.agentService.createEvent(addEvent).subscribe()
    }

  }

  reportStory() {

    let post = new Post(this.data.user, null, null, null, null, null, null, null);

    post.id = this.data.id;
    post.isStory = true;
    console.log(this.data)
    const dialogRef = this.dialog.open(ReportPostDialogComponent, {
      width: '35vw',
      height: 'fit-content',
      data: post
    });
  }

}
