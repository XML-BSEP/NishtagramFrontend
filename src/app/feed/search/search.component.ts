import { Image } from './../../model/feed/image';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Post } from './../../model/feed/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchedPosts : Post;
  searchedProfiles: UserInFeed[];
  isSearchedUsers = true;
  constructor() { }

  ngOnInit(): void {
    let u1 = new UserInFeed('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'));
    let u2 = new UserInFeed('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'))
    let u3 = new UserInFeed('treciFollower', new Image('3','https://i.imgur.com/XKIdf2g.jpeg'))
    let u4 = new UserInFeed('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'))
    this.searchedProfiles=[u1,u2,u3,u4]
  }
  search(){

  }
  follow(item){

  }
}
