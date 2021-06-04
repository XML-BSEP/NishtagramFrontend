import { StoryHighlightOnProfile } from 'src/app/model/profile/storyHighlightOnProfile';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileStory } from './../../model/profile/profileStory';
import { Component, OnInit, Inject } from '@angular/core';
import { Image } from 'src/app/model/feed/image';

@Component({
  selector: 'app-newhighlight-dialog',
  templateUrl: './newhighlight-dialog.component.html',
  styleUrls: ['./newhighlight-dialog.component.css']
})
export class NewhighlightDialogComponent implements OnInit {
  public imgFile
  public fileName
  public hajlajt : StoryHighlightOnProfile;
  public newHighStories : ProfileStory[] = new Array()
  public highlightForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewhighlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileStory[]) { }

  ngOnInit(): void {
    this.imgFile="../../assets/emptyimage.jpg";
    this.highlightForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required]),
   });
  }
  onSubmit(hajlajt) {
    this.dialogRef.close({ hajlajt });
  }
  removePhoto(){

    this.imgFile="../../assets/emptyimage.jpg";
    this.fileName="emptyprofile.png";

  }

  onFileChanged(e) {
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imgFile = reader.result as string;
            this.fileName = file.name;
          };


    }

  }
  isEmptyImage(){
    if(this.imgFile==="../../assets/emptyimage.jpg"){
      return true;
    }else{
      return false;
    }
  }
  done(){
    // id : string;
    // highlightPhoto : Image;
    // stories: ProfileStory[]
    // name : String;
    this.hajlajt= new StoryHighlightOnProfile(null, new Image(null,this.imgFile), this.newHighStories,this.highlightForm.controls.name.value)
    console.log(this.highlightForm.controls.name.value)
    this.onSubmit(this.hajlajt)
  }

  isSelected(s){
    return this.newHighStories.includes(s)
  }
  addStoryToHighlights(s){
    this.newHighStories.push(s)
  }
  removeFromHighlight(s){
    this.newHighStories = this.newHighStories.filter(obj => obj !== s);
  }
}
