import { ActivatedRoute } from '@angular/router';
import { ProfileStory } from './../../model/profile/profileStory';
import { StoryHighlightAndStories } from './../../model/profile/storyHighlightAndStories';
import { NewUser } from './../../model/user/newUser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { StoryHighlightOnProfile } from 'src/app/model/profile/storyHighlightOnProfile';
import { Image } from 'src/app/model/feed/image';
import { PostService } from 'src/app/service/post/postservice';
import { ToastrService } from 'ngx-toastr';
import { SaveHighlight } from 'src/app/model/newhighlight';

@Component({
  selector: 'app-story-highlight-dialog',
  templateUrl: './story-highlight-dialog.component.html',
  styleUrls: ['./story-highlight-dialog.component.css']
})
export class StoryHighlightDialogComponent implements OnInit {
  highs : boolean = true;
  notAddedStories : ProfileStory[];
  storiesInHighlight : StoryHighlightOnProfile;
  public isLoggedInUser : boolean = false;
  curUsr
  userId : string
  constructor(public route : ActivatedRoute,public dialogRef: MatDialogRef<StoryHighlightDialogComponent>, private postService : PostService, private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: StoryHighlightAndStories) { }

  ngOnInit(): void {
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.route.queryParams
    .subscribe(params => {
      this.userId = params.id;
    });
    if(this.userId==undefined){
      this.isLoggedInUser = true;
    }else{
      if(this.userId!==this.curUsr.id){
        this.isLoggedInUser=false;
      }else{
        this.isLoggedInUser = true;
      }
    }
    this.notAddedStories=this.data.stories
    this.storiesInHighlight = this.data.storyhighlight
  }
  removeStoryFromHighloght(story){
    this.storiesInHighlight.stories = this.storiesInHighlight.stories.filter(obj => obj !== story);
    this.notAddedStories.push(story)

  }

  addNewStoryToHighlights(){
    this.highs = false;
  }
  addStoryToHighlights(story){
    console.log(this.storiesInHighlight)
    this.highs = false;
    this.storiesInHighlight.stories.push(story)
    this.notAddedStories = this.notAddedStories.filter(obj => obj !== story);
  }
  back(){
    this.highs = true;
  }
  done(){
    console.log(this.storiesInHighlight)
    let stories = []
    let storiesString = []
    let userDTO = new SaveHighlight()
    userDTO.highlightName = this.storiesInHighlight.name;

    for (let s of this.storiesInHighlight.stories) {
      stories.push(s.id)
    }

    userDTO.stories = stories

    this.storiesInHighlight.stories = stories
    console.log("ASDASDASDASDA")
    console.log(userDTO)
    this.postService.updateHighlight(userDTO).subscribe(
      res => {
        this.toastr.success("Successfully updated highlight")
        this.dialogRef.close();
        window.location.reload
      }, error => {
        this.toastr.error("Operation unavailable")
        this.dialogRef.close();
      }
    )

  }
  
}
