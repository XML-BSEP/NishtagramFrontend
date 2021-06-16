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
import { PostProfileId } from 'src/app/model/search/postProfileId';
import { PostTags } from 'src/app/model/search/postTags';

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
  
  searchedPostLocations : PostLocations[];
  searchedPostTags : PostTags[];
  public imageForLocations : String;
  public postsForSearch : PostForSearch[];

  public isAnonym : Boolean = true;
  public isSearched : Boolean = false;
  public isSearchedLocation : Boolean = false;
  public isSearchedTag : Boolean = false;
  isSearchedLocations = false;
  isSearchedTags = false;
  public arePostsSearchedByLocation : Boolean = false;
  public arePostsSearchedByTag : Boolean = false;


  constructor(private profileService : ProfileService, private router : Router, private toastr : ToastrService, private searchService : SearchService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'category' : new FormControl(null, Validators.required),
      'query' : new FormControl(null, Validators.required)
    });


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

    if(this.searchForm.controls.category.value==="tag") {
      this.isSearchedUsers = false;
      this.arePostsSearchedByLocation = false;
      this.isSearchedLocation = false;
      this.isSearchedLocations = false;
      this.isSearchedTag = true;
      this.isSearchedTags = true;

      this.searchService.searchPostTags(this.searchForm.controls.query.value).subscribe(
        data => {
          
          this.searchedPostTags = data;
          this.isSearched = true;
        },
        err => {
          this.toastr.error("No tags with that query!")
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
    var postIds = new PostIds(location.post_profile_id)
    
    this.searchService.getPostByIdForSearch(postIds).subscribe(
      data => {
        this.arePostsSearchedByLocation = true;
        this.postsForSearch = data;
        this.isSearchedLocation = false;
        this.isSearchedLocations = false;
        this.isSearchedTag = false;
        this.isSearchedTags = false;
        
      },
      err => {
        this.toastr.error("e nzm")
      }
    )
  }
}
