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
import { ProfileService } from 'src/app/service/profile/profile.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/postservice';
import { GetPostDTO } from 'src/app/model/getpost';
import { ViewHighlight } from 'src/app/model/highlight/viewhighlight';
import { CollectionDTO } from './collectiondto';
import { FollowDTO } from 'src/app/model/follow/followDTO';
import { filter, map } from 'rxjs/operators';
import { FollowReq } from 'src/app/model/follow/followReq';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile : UserProfile;
  followers : UserInFeed[] = [];
  following : Following[] = [];
  posts : PostInProfile[];
  public web: String;
  public user : User;
  public isLoggedInUser : boolean = true;
  storyHighlights : StoryHighlightOnProfile[]
  allStories : ProfileStory[];
  allFavorites : PostInProfile[]
  storyHighsAndStories : StoryHighlightAndStories
  arePosts : boolean = true;
  public showDetails : boolean = false;

  public jeldobavio : Boolean = false;

  areStories : boolean = false;
  areFavorites : boolean = false;
  areCollections : boolean = false;
  showUser : boolean = false;
  allCollections : UsersCollection[]
  isCollectionChosen : boolean = false
  chosenCollection : UsersCollection
 // chosenCollection : PostInProfile[]
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
    private toastr : ToastrService,
    private profileService : ProfileService

    ) { }

  ngOnInit(): void {


    this.storyHighlights = []

    this.allStories=[]
    this.allFavorites=[]
    
 

    this.route.queryParams
    .subscribe(params => {
      this.userId = params.id;
    });
    this.curUsr = JSON.parse(localStorage.getItem('currentUser'))
    this.followDTO = new FollowDTO( new UserDTO(this.userId),new UserDTO(this.curUsr.id))
    console.log(this.userId)
    if (this.userId === undefined) {
      console.log("SADOGOGOGOGOG")
    
      console.log(this.userId)
      if(this.userId === undefined) { 
      
      this.isLoggedInUser=true;
      

      let userInFeed = new UserInFeed(this.curUsr.id, this.curUsr.username, "")
      this.followService.getFollowers(userInFeed).subscribe(
        res => {
          this.followers = res
          if (this.followers === null) {
            this.followers = []
          }
          console.log(this.followers)
        }
      )

      this.followService.getFollowing(userInFeed).subscribe(
        res => {
          this.following = res
          console.log(this.following)
          if (this.following === null) {
            this.following = []
          }
        }
      )
      this.profileService.getUserById(this.curUsr.id).subscribe(
        (data) => {
          this.user = data;
          this.jeldobavio = true;
          this.profile = new UserProfile(this.user, [], [], [], false)
          console.log(this.jeldobavio)
          this.web = "https://"+this.user.web
          console.log(this.posts)
          
          //this.storyHighlights = []
          console.log(this.allStories)
        
        
   
            this.isLoggedInUser=true;
            this.requestSent = false;
            this.canBeUnfollowed =false;
            this.user.private = false;

            this.postService.getAllPostsInProfile(userInFeed).subscribe(
              res => {
                this.posts = []
                if (this.posts != null) {
                for (let p of res) {
                  // console.log(p)
                  this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
                }
                  // console.log(p.postid)
                }
                // console.log(this.posts)
                this.profile.posts = this.posts
                

              }
            )

            this.postService.getAllStories(userInFeed).subscribe(
              res => {
                this.allStories = res;
              }
            )
        
            this.postService.getAllHighlightsByUser(userInFeed).subscribe(
              res => {
                this.storyHighlights = res
                console.log(res)
              }
            )

            this.showUser = true;
            this.showDetails = true;

         })
      } 
    }
    

    if (this.userId !== undefined) {
      let userInFeed = new UserInFeed(this.userId, this.curUsr.username, "")
      this.followService.getFollowers(userInFeed).subscribe(
        res => {
          this.followers = res
          if (this.followers === null) {
            this.followers = []
          }
        }
      )

      this.followService.getFollowing(userInFeed).subscribe(
        res => {
          this.following = res;
          if (this.following === null) {
            this.following = []
          }
        }
      )
      console.log("ASDASDASDASD OVDEEEE")
      this.profileService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
          this.jeldobavio = true;
          this.profile = new UserProfile(this.user, [], [], [], this.user.private)
          console.log(this.jeldobavio)
          this.web = "https://"+this.user.web
          console.log(this.posts)
          
          //this.storyHighlights = []
          console.log(this.allStories)
          
          this.isLoggedInUser = false;
        
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
                console.log("FOFOFOOFFO")
                this.isLoggedInUser=true;
                this.requestSent = false;
                this.canBeUnfollowed =false;
                this.user.private = false;
    
                let userInFeed = new UserInFeed(this.curUsr.id, this.curUsr.username, "")
                this.postService.getAllPostsInProfile(userInFeed).subscribe(
                  res => {
                    this.posts = []
                    for (let p of res) {
                      // console.log(p)
                      this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
                      
                      // console.log(p.postid)
                    }
                    // console.log(this.posts)
                    this.profile.posts = this.posts
      
                    
    
                  }
                )
    
                this.postService.getAllStories(userInFeed).subscribe(
                  res => {
                    this.allStories = res;
                  }
                )
            
                this.postService.getAllHighlightsByUser(userInFeed).subscribe(
                  res => {
                    this.storyHighlights = res
                    console.log(res)
                  }
                )

                this.showDetails = true;
    
    
              }else if(err ==="You are already following user"){
                this.isLoggedInUser=false;
                this.requestSent= false;
                this.canBeUnfollowed =true;
                this.user.private = false;
                let userInFeed = new UserInFeed(this.userId, "", "")
                this.postService.getAllPostsInProfile(userInFeed).subscribe(
                  res => {
                    this.posts = []
                    for (let p of res) {
                      // console.log(p)
                      this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
                      
                      // console.log(p.postid)
                    }
                    // console.log(this.posts)
                    this.profile.posts = this.posts

                    
                    
                    this.showDetails = true;
                  }
                ) 
    
                this.postService.getAllStories(userInFeed).subscribe(
                  res => {
                    this.allStories = res;
                  }
                )
            
                this.postService.getAllHighlightsByUser(userInFeed).subscribe(
                  res => {
                    this.storyHighlights = res
                    console.log(res)
                  }
                )
    
                this.showUser = true;
                this.showDetails = true;
              } else {
                if (this.user.private) {
                  
                  this.user.private = false;
                  this.showUser = true;
                  this.showDetails = false;
                }
              }
            })


            this.showUser = true
            console.log(this.user)

            if (!this.user.private) {
              this.postService.getAllPostsInProfile(userInFeed).subscribe(
                res => {
                  this.posts = []
                  for (let p of res) {
                    // console.log(p)
                    this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
                    
                    // console.log(p.postid)
                  }
                  // console.log(this.posts)
                  this.profile.posts = this.posts
    
                  
  
                }
              )
  
              this.postService.getAllStories(userInFeed).subscribe(
                res => {
                  this.allStories = res;
                }
              )
          
              this.postService.getAllHighlightsByUser(userInFeed).subscribe(
                res => {
                  this.storyHighlights = res
                  console.log(res)
                }
              )

              this.showDetails = true;
            }
          }) 
          
        }
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
    
    if (post.postBy === "" || post.postBy === undefined) {
      console.log(post.postBy)
      postDTO.UserId = post.user;
    } else {
      console.log(post.postBy)
      postDTO.UserId = post.postBy
    }

    this.postService.getPostById(postDTO).subscribe(
      res => {
        console.log(res)
        this.router.navigate(["/postDetails"], {state: {data: res}})
      }
    )
    console.log(post)
  }
  openFollowersDialog(){
    if(!this.profile.private || this.isLoggedInUser){
      const dialogRef = this.dialog.open(FollowersDialogComponent, {
        width: '26vw',
        height: '70vh',
        data: this.followers
      });
    }


  }

  openFollowingDialog(){
    if(!this.profile.private || this.isLoggedInUser){
      const dialogRef = this.dialog.open(FollowingsDialogComponent, {
        width: '40vw',
        height: '70vh',
        data: this.following
      });

    }


  }

  openStoryHighlightDialog(high : StoryHighlightOnProfile){
    let highlightDTO = new ViewHighlight();
    highlightDTO.name = high.name;
    highlightDTO.userId = high.id;
    this.postService.getStoriesInOneHighlight(highlightDTO).subscribe( 
      res => {
        high.stories = res.stories;
      }
    )
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
    this.postService.getAllFavorites().subscribe(
      rest => {
        this.allFavorites = rest
        //this.chosenCollection = collection.posts
      }
    )
    this.arePosts=false;
    this.areStories=false;
    this.areFavorites=true;
    this.areCollections=false;
  }
  seeCollections(){
    this.postService.getAllCollections().subscribe(
      rest => {
        this.allCollections = rest
        //this.chosenCollection = collection.posts
      }
    )
    this.arePosts=false;
    this.areStories=false;
    this.areFavorites=false;
    this.areCollections=true;
  }
  openCollection(collection){
    console.log(collection.name)
    let req = new CollectionDTO()
    req.name = collection.name
    this.postService.getCollection(req).subscribe(
      rest => {
        this.isCollectionChosen = true;
        this.chosenCollection = rest
        console.log(this.chosenCollection)
        console.log(rest)
      }
    )
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
