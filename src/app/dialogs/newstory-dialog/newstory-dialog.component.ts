import { NewStory } from './../../model/profile/newStory';
import { ProfileStory } from './../../model/profile/profileStory';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Image } from 'src/app/model/feed/image';

@Component({
  selector: 'app-newstory-dialog',
  templateUrl: './newstory-dialog.component.html',
  styleUrls: ['./newstory-dialog.component.css']
})
export class NewstoryDialogComponent implements OnInit {
  s : ProfileStory
  img : String
  selected:boolean = false;
  constructor(public dialogRef: MatDialogRef<NewstoryDialogComponent>) { }

  ngOnInit(): void {

  }
  onFileChanged(e) {
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.img = reader.result as string;
          };
          this.selected=true;

    }
  }

  close() {
    this.dialogRef.close();
  }

  done(){
    var newProfileStory = new ProfileStory(null,new Image(null, this.img))
    var newUserStory = new NewStory(null,newProfileStory)
    //POZIV BEKENDU
    this.close()
  }
}
