import { Follower } from './../../model/follow/follower';
import { UserDTO } from './../../model/follow/userDTO';
import { FollowService } from './../../service/follow/follow.service';
import { UsersCollection } from './../../model/feed/usersCollection';
import { ProfileStory } from './../../model/profile/profileStory';
import { StoryHighlightAndStories } from './../../model/profile/storyHighlightAndStories';
import { Story } from './../../model/feed/story';
import { StoryHighlightDialogComponent } from '../../dialogs/story-highlight-dialog/story-highlight-dialog.component';
import { StoryHighlightOnProfile } from './../../model/profile/storyHighlightOnProfile';
import { FollowingsDialogComponent } from  '../../dialogs/followings-dialog/followings-dialog.component';
import { FollowersDialogComponent } from '../../dialogs/followers-dialog/followers-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
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
import { FollowDTO } from 'src/app/model/follow/followDTO';
import { filter, map } from 'rxjs/operators';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FollowReq } from 'src/app/model/follow/followReq';


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
  allFavorites : PostInProfile[]
  storyHighsAndStories : StoryHighlightAndStories
  arePosts : boolean = true;
  areStories : boolean = false;
  areFavorites : boolean = false;
  areCollections : boolean = false;
  showUser : boolean = false;
  allCollections : UsersCollection[]
  isCollectionChosen : boolean = false
  chosenCollection : PostInProfile[]
  userId
  userObj
  followDTO : FollowDTO
  isFollowed : boolean = false
  requestSent : boolean
  canBeUnfollowed : boolean
  curUsr
  constructor(
    private newHighlightDialog: MatDialog,
    private router: Router,
    public dialog: MatDialog,
    private postService : PostService,
    private followService : FollowService,
    private route: ActivatedRoute,
    private toastr : ToastrService
    ) { }

  ngOnInit(): void {
    this.user = new User("Pera", "Peric", "peroslav@gmail.com", "Novi Sad, Srbija", "0211231", new Date(1999,4,16,0,0,0,0), '1', 'www.aleksandarignjatijevic.com', "Ovo je moj kao neki opis. Hm ovde nesto pametno treba da pise? hmmm aj ovako. Cekam dok ne docekam kraj ovog mrtvog faksa", 'pera123', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80');
    let follow1 = new Follower("", 'prviFollower' , 'https://i.imgur.com/VQkoalX.jpeg', true);
    let follow2 = new Follower("", 'drugiFollower', 'https://i.imgur.com/G8p9qBk.jpeg', false)
    let follow3 = new Follower("", 'treciFollower', 'https://i.imgur.com/XKIdf2g.jpeg', true)
    let follow4 = new Follower("", 'cetvrtiFollower','https://i.imgur.com/s7fMnMg.jpeg',true)
    this.allCollections = [new UsersCollection("1", "Moja prva k0lekcija", null), new UsersCollection('2', "Moja druga kolekcija", null), new UsersCollection('3',"formula1", null)]

    let userInFeed = new UserInFeed("1", "1", "1")
    this.following = []
    this.postService.getAllPostsInProfile(userInFeed).subscribe(
      res => {
        this.posts = []
        for (let p of res) {
          // console.log(p)
          this.posts.push(new PostInProfile(p.user, p.image, p.postid, p.isVideo))
          // console.log(p.postid)
        }
        this.profile = new UserProfile(this.user, this.followers, this.following, this.posts, false)
        // console.log(this.posts)
        this.showUser = true;
      }
    )
    this.route.queryParams
    .subscribe(params => {
      // console.log(params);
      this.userId = params.id;
      // console.log(this.userId);
    });
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.followDTO = new FollowDTO( new UserDTO(this.userId),new UserDTO(this.curUsr.id))

    if(this.userId===undefined){
      this.isLoggedInUser=true;
    }else{
      this.followService.isUserAllowedToFollow(this.followDTO).subscribe(
        res=>{
          this.isLoggedInUser=false;
          this.requestSent = false;
          this.isFollowed = false
          this.canBeUnfollowed =false;
        },err=>{
          console.log(err)
          if(err==="Request already sent"){
            this.requestSent = true;
            this.isLoggedInUser = false;
            this.canBeUnfollowed =false;


          }else if(err==="Its you, you moron!"){
            this.isLoggedInUser=true;
            this.requestSent = false;
            this.canBeUnfollowed =false;

          }else if(err ==="You are already following user"){
            this.isLoggedInUser=false;
            this.requestSent= false;
            this.canBeUnfollowed =true;

          }
        }
      );
    }




/*
    let following1 = new Following('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'),true);
    let following2 = new Following('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'),true)
    let following3 = new Following('treciFollower', new Image('2','https://i.imgur.com/XKIdf2g.jpeg'),false)
    let following4 = new Following('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'),true)*/

    this.followers = [follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4]


    this.web = "https://"+this.user.web
    console.log(this.posts)

    /*let storyHighlight1 = new StoryHighlightOnProfile(null,new Image('1',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")
    let storyHighlight2 = new StoryHighlightOnProfile(null,new Image('2',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")
    let storyHighlight3 = new StoryHighlightOnProfile(null,new Image('3',"https://cdn-1.motorsport.com/images/amp/YW74PKxY/s6/motogp-doha-gp-2021-valentino--2.jpg") , [s1, s2, s3], "motogp")*/

    let newDate1 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate2 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate3 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate4 : Date = new Date(2021, 6,3,11,0,0,0)
    let newDate5 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate6 : Date = new Date(2021, 6,3,9,0,0,0)

    this.storyHighlights = []

    this.allStories=[]
    this.allFavorites=[]

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
    console.log(this.profile.posts)
    this.arePosts=true;
    this.areStories=false;
    this.areFavorites=false;
    this.areCollections=false;
  }
  seeStories(){
    this.arePosts=false;
    this.areStories=true;
    this.areFavorites=false;
    this.areCollections=false;
  }
  seeFavorites(){
    this.arePosts=false;
    this.areStories=false;
    this.areFavorites=true;
    this.areCollections=false;
  }
  seeCollections(){
    this.arePosts=false;
    this.areStories=false;
    this.areFavorites=false;
    this.areCollections=true;
  }
  openCollection(collection){
    this.isCollectionChosen = true;
    this.chosenCollection = collection
  }
  backToProfile(){
    this.isCollectionChosen=false;
  }
  unfollow(){

  }
  cancelRequest(){
     var followReq = new FollowReq(this.curUsr.id,this.userId)
    this.followService.cancelFollowRequest(followReq).subscribe(res=>{
      this.toastr.success('Successfully canceled follow request!')
      this.isFollowed = false;
      this.canBeUnfollowed = false;
      this.requestSent = false;
    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }
  follow(){
    this.followService.follow(this.followDTO).subscribe(res=>{
      this.toastr.success('Successfully followed!')
      this.isFollowed=true;
    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }
}
