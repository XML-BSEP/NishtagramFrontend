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
    private authenticationService : AuthenticationService

	) {
		this.titleService.setTitle('Feed');
	}

	ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue)
    if (this.authenticationService.currentUserValue === undefined || this.authenticationService.currentUserValue === null) {
      this.router.navigate(['/login'])
    }
    this.postService.generateFeed().subscribe(
      res => {
        console.log(res)
        let feeds = []
        for (let f of res) {
          f.comments = []
          if (f.isVideo) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(f.images)
          }
          console.log(f.user)
          console.log(f.user.id)
          f.user = f.user

        }
        this.feed = res;
        console.log(this.feed)

      }
    )

    this.postService.getStories().subscribe(
      res => {
        this.stories = res;
      }
    )

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
