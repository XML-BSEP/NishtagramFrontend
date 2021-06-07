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
import { ProfileService } from 'src/app/service/profile/profile.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile : UserProfile;
  followers : UserInFeed[];
  following : Following[];
  posts : PostInProfile[];
  public web: String;
  public user : User;
  public isLoggedInUser : boolean = true;
  storyHighlights : StoryHighlightOnProfile[]
  allStories : ProfileStory[];
  storyHighsAndStories : StoryHighlightAndStories
  arePosts : boolean = true;
  
  public jeldobavio : Boolean = false;

  constructor(
    private newHighlightDialog: MatDialog,
    private router: Router,
    public dialog: MatDialog,
    private profileService: ProfileService,
    private toastr: ToastrService
    ) {    
         this.profileService.getUserById("23ddb1dd-4303-428b-b506-ff313071d5d7").subscribe(
      (data) => {
        this.user = data;     
        this.jeldobavio = true;
        this.profile = new UserProfile(this.user, [], [], [], this.user.private)
        console.log(this.jeldobavio)
        
        //this.user = new User("Pera", "Peric", "peroslav@gmail.com", "Novi Sad, Srbija", "0211231", new Date(1999,4,16,0,0,0,0), '1', 'www.aleksandarignjatijevic.com', "Ovo je moj kao neki opis. Hm ovde nesto pametno treba da pise? hmmm aj ovako. Cekam dok ne docekam kraj ovog mrtvog faksa", 'pera123', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80');
        let follow1 = new UserInFeed('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'));
        let follow2 = new UserInFeed('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'))
        let follow3 = new UserInFeed('treciFollower', new Image('3','https://i.imgur.com/XKIdf2g.jpeg'))
        let follow4 = new UserInFeed('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'))
    
        let following1 = new Following('prviFollower' , new Image('1','https://i.imgur.com/VQkoalX.jpeg'),true);
        let following2 = new Following('drugiFollower', new Image('2','https://i.imgur.com/G8p9qBk.jpeg'),true)
        let following3 = new Following('treciFollower', new Image('2','https://i.imgur.com/XKIdf2g.jpeg'),false)
        let following4 = new Following('cetvrtiFollower', new Image('4','https://i.imgur.com/s7fMnMg.jpeg'),true)
    
        this.followers = [follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4,follow1, follow2, follow3, follow4]
        this.following = [following1, following2, following3, following4]
        let post1 = new PostInProfile('pera123', new Image('1','https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'),'123')
        let post2 = new PostInProfile('pera123', new Image('2','https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),'1234')
        let post3 = new PostInProfile('pera123', new Image('3','https://i.imgur.com/1YrCKa1.jpg'),'12345')
        let post4 = new PostInProfile('pera123', new Image('4','https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.15752-9/186472462_509117580122979_233512009969789842_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Pvaojs405SsAX-svZ9a&_nc_ht=scontent.fbeg2-1.fna&oh=846315e00aa5c71b410eeaabae6c0e4e&oe=60C698CD'),'1234567')
        let post6 = new PostInProfile('pera123', new Image('5','https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'),'12345678')
        let post5 = new PostInProfile('pera123', new Image('6','https://i.imgur.com/9AZ2QX1.jpg'),'123456789')
        this.web = "https://"+this.user.web
    
        this.posts = [post1, post2, post3, post4, post5, post6]
        //this.profile = new UserProfile(this.user, this.followers, this.following, this.posts, false)
        
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
      },
      err => {
        this.toastr.error(err);
      }
    );

     
    }
    

      

  ngOnInit(): void {
    
  
   

  }
  goToEditProfile(){
      this.router.navigate(['/editProfile'],
      {state:
        {data:
          this.profile.user
        }
      });
  }

  showImage(post){
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
    this.arePosts=true;
  }
  seeStories(){
    this.arePosts=false;
  }
}
