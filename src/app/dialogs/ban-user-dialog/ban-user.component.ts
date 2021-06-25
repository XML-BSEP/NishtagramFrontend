import { ProfileStory } from '../../model/profile/profileStory';
import { StoryHighlightAndStories } from '../../model/profile/storyHighlightAndStories';
import { NewUser } from '../../model/user/newUser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { StoryHighlightOnProfile } from 'src/app/model/profile/storyHighlightOnProfile';
import { Image } from 'src/app/model/feed/image';
import { PostService } from 'src/app/service/post/postservice';
import { ToastrService } from 'ngx-toastr';
import { SaveHighlight } from 'src/app/model/newhighlight';
import { PostInProfile } from 'src/app/model/profile/postInProfile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportPost } from 'src/app/model/reports/reportPost';
import { Post } from 'src/app/model/feed/post';
import { StoryReport } from 'src/app/model/reports/reportStory';
import { UserInFeed } from 'src/app/model/feed/userInFeed';

@Component({
  selector: 'app-story-highlight-dialog',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.css']
})
export class BanUserDialog implements OnInit {
  highs : boolean = true;
  notAddedStories : ProfileStory[];
  storiesInHighlight : StoryHighlightOnProfile;
  public isLoggedInUser : boolean =true;
  public possibleTypes : String[];
  public post : Post;
  public reportForm : FormGroup;
  public user : UserInFeed

  constructor(public dialogRef: MatDialogRef<BanUserDialog>, private postService : PostService, private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: UserInFeed) {

     
     }

  ngOnInit(): void {
      

      
      this.user = this.data
  }
  closeDialog() {
    this.dialogRef.close()

  }
  banUser() {
  //     if (!this.post.isStory) {
  //       let reportPost = new ReportPost();
  //       reportPost.postId = this.post.id;
  //       reportPost.reportedPostBy = this.post.user.id;
  //       reportPost.reportType = this.reportForm.controls.criteria.value;
  
  //       this.postService.reportPost(reportPost).subscribe(
  //           res => {
  //               this.toastr.info("Post reported")
  //           }, err => {
  //               this.toastr.error("Service unavailable")
  //           }
  //       )
      
  //     } else {
  //         let storyReport = new StoryReport();
  //         storyReport.reportType = this.reportForm.controls.criteria.value;
  //         storyReport.storyBy = this.data.user.id;
  //         storyReport.storyId = this.data.id;
  //         console.log(this.data)

  //         this.postService.reportStory(storyReport).subscribe(
  //           res => {
  //               this.toastr.info("Post reported")
  //           }, err => {
  //               this.toastr.error("Service unavailable")
  //           }
  //         )
  //     }

      this.dialogRef.close()
      
  }
}
