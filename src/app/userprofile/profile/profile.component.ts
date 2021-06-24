import { NotificationSettingsComponent } from './../../dialogs/notification-settings/notification-settings.component';
import { PostIds } from './../../model/search/PostIds';
import { Unfollow } from './../../model/follow/unfollow';
import { ProfileDTO } from './../../model/profile/profileDTO';
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
import { Mute } from 'src/app/model/profile/mute';
import { MutedContentDTO } from 'src/app/model/muteContentdto';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile : UserProfile;
  followers : Follower[] = [];
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
  isMuted :boolean;
  followDTO : FollowDTO
  isFollowed : boolean = false
  requestSent : boolean
  canBeUnfollowed : boolean
  curUsr
  isFollowing : boolean;
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

    if(this.userId===undefined){
      this.userId = this.curUsr.id
      console.log('WTFFF')

    }else{

      if(this.userId !==this.curUsr.id){
        this.getIsMutedStatus()
        this.followDTO = new FollowDTO( new UserDTO(this.userId),new UserDTO(this.curUsr.id))
        this.getisUserFollowingUser()
        console.log('USAO U IF')
      }

    }

    let userInFeed = new UserInFeed(this.userId, this.curUsr.username, "")
    let profileDTO = new ProfileDTO(this.userId)



    this.followDTO = new FollowDTO( new UserDTO(this.userId),new UserDTO(this.curUsr.id))


    if (this.userId === this.curUsr.id) {
      this.isLoggedInUser=true;

      // this.userId = this.curUsr.id
      // this.isLoggedInUser=true;


      let userInFeed = new UserInFeed(this.userId, this.curUsr.username, "")
      let profileDTO = new ProfileDTO(this.userId)
      this.getUserFollowers(profileDTO);
      this.getUsersFollowings(profileDTO);


      this.profileService.getUserById(this.curUsr.id).subscribe(
        (data) => {
          this.user = data;
          this.jeldobavio = true;
          this.profile = new UserProfile(this.user, [], [], [], this.user.private)

            this.isLoggedInUser=true;
            this.requestSent = false;
            this.canBeUnfollowed =false;

            this.user.private = false;
            this.getAllPostsInProfile(userInFeed);
            this.getAllUsersStories(userInFeed);
            this.getAllUsersHighlights(userInFeed);
            this.showUser = true;
            this.showDetails = true;
         })

    }else{
      let userInFeed = new UserInFeed(this.userId, this.curUsr.username, "")
      this.getUserFollowers(userInFeed);
      this.getUsersFollowings(userInFeed);
      this.profileService.getUserById(this.userId).subscribe(
            (data) => {
              this.user = data;
              this.jeldobavio = true;
              this.profile = new UserProfile(this.user, [], [], [], this.user.private)
              this.isLoggedInUser = false;
              this.followService.isUserAllowedToFollow(this.followDTO).subscribe(
                res=>{
                  this.isLoggedInUser=false;
                  this.requestSent = false;
                  this.isFollowed = false
                  this.canBeUnfollowed =false;
                  this.showUser = true;

                },err=>{
                  if(err==="Request already sent"){
                    this.requestSent = true;
                    this.isLoggedInUser = false;
                    this.canBeUnfollowed =false;
                    this.showUser = true;

                  }else if(err ==="You are already following user"){
                    this.isLoggedInUser=false;
                    this.requestSent= false;
                    this.canBeUnfollowed =true;
                    this.user.private = false;
                    let userInFeed = new UserInFeed(this.userId, "", "")
                    this.getAllPostsInProfile(userInFeed)
                    this.getAllUsersHighlights(userInFeed)
                    this.showUser = true;
                    this.showDetails = true;
                  }else if(err==="Its you, you moron!"){
                    console.log('idk')
                  } else  {
                    if (this.user.private) {
                      this.showUser = true;
                      this.showDetails = false;
                    }
                  }
                })
                if(!this.user.private){
                  this.getAllPostsInProfile(userInFeed)
                  this.getAllUsersHighlights(userInFeed)
                  this.showUser = true;
                  this.showDetails = true;

                }



        });



    }
  }


  getAllUsersHighlights(userInFeed){
    this.postService.getAllHighlightsByUser(userInFeed).subscribe(
      res => {
        this.storyHighlights = res
        console.log('PLS STA SE DESAVA SAAAAAAAAAAD')
        console.log(res)
      }
    )
  }
  getAllUsersStories(userInFeed){
    this.postService.getAllStories(userInFeed).subscribe(
      res => {
        this.allStories = res;
      }
    )
  }
  getAllPostsInProfile(userInFeed){
    this.postService.getAllPostsInProfile(userInFeed).subscribe(
      res => {
        this.posts = []
        if (res != null) {
          for (let p of res) {
            // console.log(p)
            this.posts.push(new PostInProfile(p.user, p.images, p.postid, p.isVideo))
          }
        }
        this.profile.posts = this.posts


      }
    )
  }

  getUsersFollowings(profileDTO){
    this.followService.getFollowing(profileDTO).subscribe(
      res => {
        this.following = res
        console.log(this.following)
        if (this.following === null) {
          this.following = []
        }
      }
    )
  }
  getUserFollowers(profileDTO){
    this.followService.getFollowers(profileDTO).subscribe(
      res => {
        this.followers = res
        if (this.followers === null) {
          this.followers = []
        }
        console.log(this.followers)
      }
    )

  }
  getisUserFollowingUser(){
    var follow = new FollowDTO(new UserDTO(this.curUsr.id), new UserDTO(this.userId))
    this.followService.isUserFollowingUser(follow).subscribe(
      res=>{
        this.isFollowing = res;
      })
  }

  getIsMutedStatus(){
    let mutedContentDto = new MutedContentDTO();
    mutedContentDto.blockedFor = this.curUsr.id;
    mutedContentDto.blocked = this.userId;
    this.postService.isMuted(mutedContentDto).subscribe(
      res => {
        this.isMuted = true;
      }, err => {
        this.isMuted = false;
      }
    )

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
    location.href="/postDetails?postId="+postDTO.PostId +"&userId="+postDTO.UserId;
  }


  openNotificationSettingsDialog(){
    const dialogRef = this.dialog.open(NotificationSettingsComponent, {
      width: '20vw',
      height: '30vh',
      data: this.userId
    });
  }
  openFollowersDialog(){
    if(!this.profile.private || this.isLoggedInUser || this.isFollowing){
      const dialogRef = this.dialog.open(FollowersDialogComponent, {
        width: '26vw',
        height: '70vh',
        data: this.followers
      });
    }


  }

  openFollowingDialog(){
    if(!this.profile.private || this.isLoggedInUser || this.isFollowing){
      const dialogRef = this.dialog.open(FollowingsDialogComponent, {
        width: '40vw',
        height: '70vh',
        data: this.following
      }).afterClosed().subscribe(response=>{
        // location.reload();
        let profileDTO = new ProfileDTO(this.userId)
        this.followService.getFollowing(profileDTO).subscribe(
          res => {
            this.following = res
            console.log(this.following)
            if (this.following === null) {
              this.following = []
            }
          }
        )
      })

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
  mute(){
    let mutecontentDto = new MutedContentDTO();
    mutecontentDto.blocked = this.userId;
    mutecontentDto.blockedFor = this.curUsr.id;

    this.postService.mute(mutecontentDto).subscribe(
      res=>{
         this.toastr.success('Successfully muted!')
         this.isMuted = !this.isMuted;

      },error=>{
        this.toastr.error('OOOOOOOOpppsss something went wrong :(')
         console.log(error)
     });
  }
  unmute(){

    let mutecontentDto = new MutedContentDTO();
    mutecontentDto.blocked = this.userId;
    mutecontentDto.blockedFor = this.curUsr.id;

    this.postService.unmute(mutecontentDto).subscribe(
      res=>{
         this.toastr.success('Successfully unmuted!')
         this.isMuted = !this.isMuted;

      },error=>{
        this.toastr.error('OOOOOOOOpppsss something went wrong :(')
         console.log(error)
     });
  }

  block(){
    var mute = new Mute( this.curUsr.id, this.userId)

  }
  backToProfile(){
    this.isCollectionChosen=false;
  }
  unfollow(){
    var unfollow = new Unfollow(this.userId, this.curUsr.id)
    this.followService.unfollow(unfollow).subscribe(res=>{
      this.toastr.success('Successfully followed!')
      this.isFollowed=false;
      location.reload();
    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }
  cancelRequest(){
     var followReq = new FollowReq(this.curUsr.id,this.userId)
    this.followService.cancelFollowRequest(followReq).subscribe(res=>{
      this.toastr.success('Successfully canceled follow request!')
      this.isFollowed = false;
      this.canBeUnfollowed = false;
      this.requestSent = false;
      location.reload();

    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }
  follow(){

    this.followService.follow(this.followDTO).subscribe(res=>{
      this.toastr.success('Successfully followed!')
      this.isFollowed=true;
      location.reload();

    },error=>{
      this.toastr.error('OOOOOOOOpppsss something went wrong :(')
      console.log(error)
    });
  }
}
