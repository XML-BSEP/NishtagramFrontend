import { ProfileStory } from './../../model/profile/profileStory';
import { StoryHighlightAndStories } from './../../model/profile/storyHighlightAndStories';
import { Story } from './../../model/feed/story';
import { StoryHighlightDialogComponent } from '../../dialogs/story-highlight-dialog/story-highlight-dialog.component';
import { StoryHighlightOnProfile } from './../../model/profile/storyHighlightOnProfile';
import { FollowingsDialogComponent } from  '../../dialogs/followings-dialog/followings-dialog.component';
import { FollowersDialogComponent } from '../../dialogs/followers-dialog/followers-dialog.component';
import { Router } from '@angular/router';
import { PostInProfile } from './../../model/profile/postInProfile';
import { Post } from './../../model/feed/post';
import { UserInFeed } from './../../model/feed/userInFeed';
import { UserProfile } from './../../model/profile/userProfile';
import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/model/feed/image';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StoryContent } from 'src/app/model/feed/storyContent';
import { NewhighlightDialogComponent } from 'src/app/dialogs/newhighlight-dialog/newhighlight-dialog.component';
import { Following } from 'src/app/model/profile/following';
import { User } from 'src/app/model/profile/user';
import { PostService } from 'src/app/service/post/postservice';
import { GetPostDTO } from 'src/app/model/getpost';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile : UserProfile;
  followers : UserInFeed[];
  following : Following[];
  posts : PostInProfile[];
  web: String;
  user : User;
  public isLoggedInUser : boolean = true;
  storyHighlights : StoryHighlightOnProfile[]
  allStories : ProfileStory[];
  storyHighsAndStories : StoryHighlightAndStories
  arePosts : boolean = true;
  showUser : boolean = false;
  constructor(
    private newHighlightDialog: MatDialog,
    private router: Router,
    public dialog: MatDialog,
    private postService : PostService
    ) { }

  ngOnInit(): void {
    this.user = new User("Pera", "Peric", "peroslav@gmail.com", "Novi Sad, Srbija", "0211231", new Date(1999,4,16,0,0,0,0), '1', 'www.aleksandarignjatijevic.com', "Ovo je moj kao neki opis. Hm ovde nesto pametno treba da pise? hmmm aj ovako. Cekam dok ne docekam kraj ovog mrtvog faksa", 'pera123', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80');
    let follow1 = new UserInFeed("", 'prviFollower' , 'https://i.imgur.com/VQkoalX.jpeg');
    let follow2 = new UserInFeed("", 'drugiFollower', 'https://i.imgur.com/G8p9qBk.jpeg')
    let follow3 = new UserInFeed("", 'treciFollower', 'https://i.imgur.com/XKIdf2g.jpeg')
    let follow4 = new UserInFeed("", 'cetvrtiFollower','https://i.imgur.com/s7fMnMg.jpeg')

    let userInFeed = new UserInFeed("1", "1", "1")
    this.following = []
    this.postService.getAllPostsInProfile(userInFeed).subscribe(
      res => {
        this.posts = []
        for (let p of res) {
          console.log(p)
          this.posts.push(new PostInProfile(p.user, p.image, p.postid, p.isVideo))
          console.log(p.postid)
        }
        this.profile = new UserProfile(this.user, this.followers, this.following, this.posts, false)
        console.log(this.posts)
        this.showUser = true;
      }
    )
    let userInfo = new UserInFeed("1", "", "")
    this.postService.getAllStories(userInfo).subscribe(
      res => {
        this.allStories = res;
      }
    )

    this.postService.getAllHighlightsByUser(userInfo).subscribe(
      res => {
        this.storyHighlights = res
      }
    )

/*
    let following1 = new Following('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'),true);
    let following2 = new Following('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'),true)
    let following3 = new Following('treciFollower', new Image('2','https://i.imgur.com/XKIdf2g.jpeg'),false)
    let following4 = new Following('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'),true)*/

    this.followers = [follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4]
    
    
    this.web = "https://"+this.user.web
    console.log(this.posts)
    let newDate6 : Date = new Date(2021, 6,3,9,0,0,0)
    
    //this.storyHighlights = []
    console.log(this.allStories)


  }
  goToEditProfile(){
      this.router.navigate(['/editProfile'],
      {state:
        {data:
          this.profile.user
        }
      });
  }

  showImage(post : PostInProfile){
    let postDTO = new GetPostDTO();
    console.log(post.postid)
    postDTO.PostId = post.postid;
    postDTO.UserId = post.user;
    
    this.postService.getPostById(postDTO).subscribe(
      res => {
        console.log(res)
        this.router.navigate(["/postDetails"], {state: {data: res}})
      }
    )
    console.log(post)
  }
  openFollowersDialog(){
    if(!this.profile.private){
      const dialogRef = this.dialog.open(FollowersDialogComponent, {
        width: '26vw',
        height: '70vh',
        data: this.profile.followers
      });
    }


  }

  openFollowingDialog(){
    if(!this.profile.private){
      const dialogRef = this.dialog.open(FollowingsDialogComponent, {
        width: '40vw',
        height: '70vh',
        data: this.profile.following
      });

    }


  }

  openStoryHighlightDialog(high){
    this.storyHighsAndStories = new StoryHighlightAndStories(high, this.allStories)
    const dialogRef = this.dialog.open(StoryHighlightDialogComponent, {
      width: '35vw',
      height: '80vh',
      data: this.storyHighsAndStories
    });
  }
  createNewHighlight(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '35vw';
    dialogConfig.height = '80vh';

    dialogConfig.data = this.allStories;

    let dialogRef = this.newHighlightDialog.open(NewhighlightDialogComponent, dialogConfig).afterClosed()
      .subscribe(response => {
        if (response) {
          this.storyHighlights.push(response.hajlajt)
          //ovde poziv bekendu da se updateuju hajlajt sranja
        }
      });

  }
  seePosts(){
    console.log("asdas")
    console.log(this.profile.posts)
    this.arePosts=true;
  }
  seeStories(){
    this.arePosts=false;
  }
}
