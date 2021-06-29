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
import { BanProfile } from 'src/app/model/profile/banProfile';
import { ProfileService } from 'src/app/service/profile/profile.service';

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
  public user : UserInFeed;
  public banProfile : BanProfile;

  constructor(public dialogRef: MatDialogRef<BanUserDialog>, private postService : PostService, private toastr : ToastrService, private profileService : ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: UserInFeed) {

     
     }

  ngOnInit(): void {
      

      
      this.user = this.data
  }
  closeDialog() {
    this.dialogRef.close()

  }
  banUser() {
    this.banProfile = new BanProfile();
    this.banProfile.profileId = this.user.id;
    this.profileService.banProfile(this.banProfile).subscribe(
      res => {
        this.toastr.success("User is banned!");
      }, 
      err => {
        this.toastr.error(err);
      }
    );
      
      this.dialogRef.close()
      
  }
}
