import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  newAdForm : FormGroup
  imgFile : string;
  isImage: boolean = true;
  isVideo : boolean = true;
  isVideoSelected : boolean = false;
  current : number;
  video : string
  isSelected : boolean = false;
  myControl = new FormControl();
  tagControl = new FormControl();
  hashtags : string[] = new Array();
  hash : string ='';
  linkShop : string = '';
  sinImputarValue : string = 'postChecked';

  ngOnInit(): void {
    this.current=0;
    this.newAdForm = new FormGroup({
      'caption' : new FormControl(null, [Validators.required]),
      'location' : new FormControl(null, [Validators.required]),
      'hash' : new FormControl(null, []),
      'link' : new FormControl(null, [Validators.required]),
      'postStoryChecked': new FormControl("postChecked", Validators.required),
    });

  }

  constructor(private toastr : ToastrService) { 
   
  }


  checkradio() {
    console.log(this.newAdForm.controls.postStoryChecked.value)
  }
  checkIfHashtagIsTagged(tag){
    return this.hashtags.some(element => element === tag)
  }

  hashtag(){
    if(!this.checkIfHashtagIsTagged(this.newAdForm.controls.hash.value)){
      this.hashtags.push(this.newAdForm.controls.hash.value)
      this.newAdForm.setValue({
        hash: ""
      });
    }
  }

  onFileChangedVideo(e){
    this.isImage=false;
    this.isVideo = true;


    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.video = reader.result as string;
            this.isSelected=true

            this.isVideoSelected = true;
          };


    }

  }

  onFileChanged(e) {
    this.isImage=true;
    this.isVideo = false;
    const reader = new FileReader();
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            this.imgFile = reader.result as string;
            this.isSelected=true

          };


    }

  }

}
