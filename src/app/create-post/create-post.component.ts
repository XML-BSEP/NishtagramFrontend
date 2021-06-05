import { User } from './../model/profile/user';
import { UserTag } from './../model/createPost/userTag';
import { UserInFeed } from './../model/feed/userInFeed';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/feed/image';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  newPostForm : FormGroup
  imgFile : String
  album: Image[] = new Array();
  isImage: boolean = true;
  isVideo : boolean = true;
  isVideoSelected : boolean = false;
  isAlbum : boolean = true;
  current : number;
  video : String
  isSelected : boolean = false;
  myControl = new FormControl();
  tagControl = new FormControl();
  taggedUsers : UserTag[] = new Array();
  users : UserTag[] = [new UserTag('1','pera123'), new UserTag('2','zoran123'), new UserTag('3','mico123'), new UserTag('4','stevan22')]
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  filteredUsers : Observable<UserTag[]>;
  ngOnInit(): void {
    this.current=0;
    this.newPostForm = new FormGroup({
     'caption' : new FormControl(null, [Validators.required]),
     'location' : new FormControl(null, [Validators.required]),
   });
   this.filteredUsers = this.tagControl.valueChanges.pipe(startWith(''),map(value=>this._filterUsers(value)));
  //  this.filteredOptions = this.myControl.valueChanges
  //  .pipe(
  //    startWith(''),
  //    map(value => this._filter(value))
  //  );
  }
  checkIfUserIsTagged(tag){
    return this.taggedUsers.some(element => element === tag)
  }
  tag(){
    console.log(this.tagControl.value)
    // this.tagControl.value.next('');
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].username===this.tagControl.value){
        if(!this.checkIfUserIsTagged(this.users[i])){
          this.taggedUsers.push(this.users[i])
        }
      }
    }
  }
  private _resetFilter():UserTag[]{
    return this.users
  }
  private _filterUsers(value : string): UserTag[]{
    const filterValue = value.toLowerCase();

    return this.users.filter(option => option.username.toLowerCase().includes(filterValue))
  }

  get file() { return this.newPostForm.controls.file.value as FileInput; }

  post(){
    console.log(this.video)

  }

  onFileChangedAlbum(e) {
    this.isAlbum=true;
    this.isImage=false;
    this.isVideo = false;
    console.log('idegas')
    const reader = new FileReader();
    if(this.current<4){
      if(e.target.files && e.target.files.length) {
        const [file] = e.target.files;
          reader.readAsDataURL(file);

          reader.onload = () => {
            var img = reader.result as string;
            this.album.push(new Image(null, img));
            this.current++;
            console.log(this.current);
            if(this.current==4){
              this.isSelected=true
            }
          };
      }

    }

  }


  onFileChangedVideo(e){
    this.isAlbum=false;
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
    this.isAlbum=false;
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
