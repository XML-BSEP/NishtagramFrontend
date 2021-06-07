import { NewStory } from './../../model/profile/newStory';
import { ProfileStory } from './../../model/profile/profileStory';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Image } from 'src/app/model/feed/image';
import { PostService } from 'src/app/service/post/postservice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newstory-dialog',
  templateUrl: './newstory-dialog.component.html',
  styleUrls: ['./newstory-dialog.component.css']
})
export class NewstoryDialogComponent implements OnInit {
  s : ProfileStory
  img : String
  selected:boolean = false;

  constructor(public dialogRef: MatDialogRef<NewstoryDialogComponent>, private postService : PostService, private toastr : ToastrService) { }

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
    var newProfileStory = new ProfileStory("", this.img, false, false)
    var newUserStory = new NewStory(null,newProfileStory, new Date(), false)

    this.postService.addStory(newProfileStory).subscribe(
      res => {
        this.toastr.success("Successfully added story.")
      }, error => {
        
        this.toastr.error("Service unavailable.")
      }
    )
    this.close()
  }
  doneCF(){
    var newProfileStory = new ProfileStory("", this.img, true, false)
    var newUserStory = new NewStory(null,newProfileStory, new Date(), true)
    //POZIV BEKENDU
    this.postService.addStory(newProfileStory).subscribe(
      res => {
        this.toastr.success("Successfully added story.")
      }, error => {
        
        this.toastr.error("Service unavailable.")
      }
    )
    this.close()
  }
}
