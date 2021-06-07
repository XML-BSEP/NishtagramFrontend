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
        console.log(res.length)
        for (let p of res) {
          this.posts.push(p)
        }
        this.profile = new UserProfile(this.user, this.followers, this.following, this.posts, false)
        console.log(this.posts)
        this.showUser = true;
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

    let s1 = new ProfileStory('1', new Image('1','https://cdn-1.motorsport.com/images/amp/0rGEw9P2/s6/motogp-italian-gp-2021-frances-2.jpg'))
    let s2 = new ProfileStory('2',new Image('2','https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/3/25/y0deko1jnokvnulhoiw0/motogp-peliculas'))
    let s3 = new ProfileStory('3', new Image('3','https://cdn.crash.net/styles/article/s3/image_importer/MotoGP/2802581.0008.jpg?itok=HvSDcpy1'))

    let storyHighlight1 = new StoryHighlightOnProfile(null,new Image('1',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")
    let storyHighlight2 = new StoryHighlightOnProfile(null,new Image('2',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")
    let storyHighlight3 = new StoryHighlightOnProfile(null,new Image('3',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")

    let newDate1 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate2 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate3 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate4 : Date = new Date(2021, 6,3,11,0,0,0)
    let newDate5 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate6 : Date = new Date(2021, 6,3,9,0,0,0)

    this.storyHighlights = [storyHighlight3, storyHighlight2, storyHighlight3,storyHighlight3, storyHighlight2, storyHighlight3,storyHighlight3, storyHighlight2, storyHighlight3,storyHighlight3, storyHighlight2,storyHighlight2]
    let story1 = new ProfileStory('1', new Image('1',"https://cdn-1.motorsport.com/images/amp/24vV83g6/s6/pol-espargaro-repsol-honda-tea.jpg"))
    let story2 = new ProfileStory('1',new Image('2',"https://ca-times.brightspotcdn.com/dims4/default/757b00f/2147483647/strip/true/crop/3402x2300+0+0/resize/1486x1005!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F68%2F57%2F8b8001bd479d899193713a8c62b2%2Fmonaco-f1-gp-auto-racing-37308.jpg"))
    let story3 = new ProfileStory('1', new Image('3',"https://phantom-marca.unidadeditorial.es/d5d06c35184d312f171c99a3135dcdae/resize/1320/f/jpg/assets/multimedia/imagenes/2021/05/19/16214125179177.jpg"))
    let story4 = new ProfileStory('1',new Image('4',"https://cdn.crash.net/styles/large_article/s3/image_importer/F1/2784382.0064.jpg?itok=f3aOaJs8"))
    this.allStories=[story1, story2, story3, story4]

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
    console.log(post.postId)
    postDTO.PostId = post.postId;
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
