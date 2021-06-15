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
import { PostLocations } from 'src/app/model/search/postLocations';
import { SearchService } from 'src/app/service/search/search.service';
import { PostIds } from 'src/app/model/search/PostIds';
import { PostForSearch } from 'src/app/model/search/postForSearch';

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
  public isSearchedLocation : Boolean = false;
  searchedPostLocations : PostLocations[];
  isSearchedLocations = false;
  public imageForLocations : String;
  public arePostsSearchedByLocation : Boolean = false;
  public postsForSearch : PostForSearch[];

  constructor(private profileService : ProfileService, private router : Router, private toastr : ToastrService, private searchService : SearchService) { }

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
  
    if(this.searchForm.controls.category.value==="location"){
      this.isSearchedLocations = true;
      this.isSearchedUsers = false;
      this.arePostsSearchedByLocation = false;
      this.searchService.searchPostLocations(this.searchForm.controls.query.value).subscribe(
        data => {
          console.log(data)
          this.searchedPostLocations = data;
          this.isSearchedLocation = true;
      
        },
        err => {
          this.toastr.error("No locations with that query!")
        }
      );

    }

    if(this.searchForm.controls.category.value==="profile") {
      this.isSearchedUsers = true;
      this.arePostsSearchedByLocation = false;
      this.isSearchedLocation = false;
      this.isSearchedLocations = false;
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

  chooseLocation(location) {
    var postIds = new PostIds(location.post_id)
    this.searchService.getPostByIdForSearch(postIds).subscribe(
      data => {
        this.arePostsSearchedByLocation = true;
        this.postsForSearch = data;
        this.isSearchedLocation = false;
        this.isSearchedLocations = false;
        console.log(this.postsForSearch)
        var i;
        for (i = 0; i < this.postsForSearch.length; i++) {
          console.log(this.postsForSearch[i].type)
          console.log(this.postsForSearch[i].id)
          console.log(this.postsForSearch[i].image)
        }
      },
      err => {
        this.toastr.error("e nzm")
      }
    )
  }
}
