import { ProfileStory } from './../../model/profile/profileStory';
import { StoryHighlightAndStories } from './../../model/profile/storyHighlightAndStories';
import { NewUser } from './../../model/user/newUser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { StoryHighlightOnProfile } from 'src/app/model/profile/storyHighlightOnProfile';
import { Image } from 'src/app/model/feed/image';

@Component({
  selector: 'app-story-highlight-dialog',
  templateUrl: './story-highlight-dialog.component.html',
  styleUrls: ['./story-highlight-dialog.component.css']
})
export class StoryHighlightDialogComponent implements OnInit {
  highs : boolean = true;
  notAddedStories : ProfileStory[];
  storiesInHighlight : StoryHighlightOnProfile;
  public isLoggedInUser : boolean =true;

  constructor(public dialogRef: MatDialogRef<StoryHighlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StoryHighlightAndStories) { }

  ngOnInit(): void {
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
    this.highs = false;
    this.storiesInHighlight.stories.push(story)
    this.notAddedStories = this.notAddedStories.filter(obj => obj !== story);

  }
  back(){
    this.highs = true;
  }
}
