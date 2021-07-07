import { StoryDialogComponent } from './../../dialogs/story-dialog/story-dialog.component';
import { StoryContent } from './../../model/feed/storyContent';
import { Story } from './../../model/feed/story';
import { MatDialog } from '@angular/material/dialog';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Post } from './../../model/feed/post';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Image } from 'src/app/model/feed/image';
import * as moment from 'moment';
import { Location } from 'src/app/model/utilities/location';
import { Comment } from 'src/app/model/feed/comment';
import { PostService } from 'src/app/service/post/postservice';
import { Add2collectionDialogComponent } from 'src/app/dialogs/add2collection-dialog/add2collection-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { AgentService } from 'src/app/service/agent/agent_service';

@Component({
	selector: 'ia-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
	feedItems = [];
  public post1 : Post;
  public post2 : Post;
  public stories : Story[]


  feed : Post[]
	constructor(
		private router: Router,
		private titleService: Title,
    private dialog : MatDialog,
    private postService : PostService,
    private authenticationService : AuthenticationService,
    private agentService : AgentService

	) {
		this.titleService.setTitle('Feed');
	}

	ngOnInit(): void {
    this.feed = []

    console.log(this.authenticationService.currentUserValue)

    if(JSON.parse(localStorage.getItem('currentUser'))==null){
        this.router.navigate(['/forbidden'])
    }
    if(JSON.parse(localStorage.getItem('currentUser')).role=="temporary_user" || JSON.parse(localStorage.getItem('currentUser')).role=="admin"){
      this.router.navigate(['/forbidden'])
    }else{
      this.postService.generateFeed().subscribe(
        
        res => {
          console.log(res)
          let feeds = []
          for (let f of res) {
            f.comments = []
            f.isAd = false;
            if (f.isVideo) {
              console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
              console.log(f.images)
            }
            console.log(f.user)
            console.log(f.user.id)
            f.user = f.user

            this.feed.push(f);
          }
          console.log(this.feed)

          

        }
      )

      this.agentService.getAllPostAds().subscribe(
        res => {
          if (res != null)
          {
          for (let f of res) {
            f.comments = []
            f.isAd = true;
            f.link = "https://localhost:4300/" + f.link
            this.feed.push(f)
          }}
        }
      )
      this.stories = []
      this.postService.getStories().subscribe(
        res => {
          for (let s of res) {
            s.isAd = false;
            this.stories.push(s)
          }
        }
      )

      this.agentService.getAllStoryAds().subscribe(
        res => {
          if (res != null) {

          
          for (let a of res) {
            a.isAd = true;
            this.stories.push(a)
          }
          console.log(this.stories)
        }
      }
      )

    }


  }

  goToPostDetails(item){
    this.router.navigate(['/postDetails']);
  }

  openStory(story){
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      width: '35vw',
      height: '90vh',
      data: story
    });
  }


}
