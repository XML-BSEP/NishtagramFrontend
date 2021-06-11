import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Image } from './../../model/feed/image';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Post } from './../../model/feed/post';
import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../service/profile/profile.service'
import {User} from '../../model/profile/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchedUser } from 'src/app/model/profile/searchedProfile';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedPosts : Post;
  searchedProfiles: SearchedUser[];
  isSearchedUsers = true;
  searchForm : FormGroup
  public isAnonym : Boolean = true;
  public isSearched : Boolean = false;
  constructor(private profileService : ProfileService, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'category' : new FormControl(null, Validators.required),
      'query' : new FormControl(null, Validators.required)
    });

   // let u1 = new UserInFeed('1', '1' , 'https://i.imgur.com/VQkoalX.jpeg');
   // let u2 = new UserInFeed('2', '2', 'https://i.imgur.com/G8p9qBk.jpeg')
   // let u3 = new UserInFeed('3', 'treciFollower', 'https://i.imgur.com/XKIdf2g.jpeg')
    //let u4 = new UserInFeed('4', 'cetvrtiFollower', 'https://i.imgur.com/s7fMnMg.jpeg')
    //this.searchedProfiles=[u1,u2,u3,u4]

    if (localStorage.getItem("currentUser") == null) {
        this.isAnonym = true;
    }else {
      this.isAnonym = false;
    }
  }
  search(){
    console.log(this.searchForm.controls.category.value + " " + this.searchForm.controls.query.value)
    if(this.searchForm.controls.category.value==="location"){
      this.isSearchedUsers = false;
    }else{
      this.isSearchedUsers = true;
    }

    if(this.searchForm.controls.category.value==="profile") {
      this.isSearchedUsers = true;
      this.profileService.searchUser(this.searchForm.controls.query.value).subscribe(
        data => {
          this.searchedProfiles = data;
          this.isSearched = true;
        },
        err => {
          this.toastr.error("User does not exists")
        }
      );
    }

  }
  follow(item){

  }

  goToProfile(id : String){
    this.router.navigate(['/profile'], { queryParams: { id: id} });
  }
}
