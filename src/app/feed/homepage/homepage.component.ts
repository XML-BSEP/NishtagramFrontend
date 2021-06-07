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

@Component({
	selector: 'ia-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
	feedItems = [];
  public post1 : Post;
  public post2 : Post;

  public user1 : UserInFeed;
  public comment1 : Comment;
  public comment2 : Comment;
  public user2 : UserInFeed;
  public user3 : UserInFeed;
  public postLocation : Location;
  public comments1 : Comment[];
  public comments2 : Comment[];
  public stories : Story[]

  image1 = new Image('1','https://i.imgur.com/1YrCKa1.jpg')
  image2 = new Image('2','https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg')
  image3 = new Image('3','https://i.imgur.com/9AZ2QX1.jpg')
  image4 = new Image('4','https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.15752-9/186472462_509117580122979_233512009969789842_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Pvaojs405SsAX-svZ9a&_nc_ht=scontent.fbeg2-1.fna&oh=846315e00aa5c71b410eeaabae6c0e4e&oe=60C698CD')
  images1 = [this.image1, this.image2, this.image3, this.image4]
  images2 = [this.image4]
  images3 = [this.image4]

  feed : Post[]
	constructor(
		private router: Router,
		private titleService: Title,
    private dialog : MatDialog,

	) {
		this.titleService.setTitle('Feed');
	}

	ngOnInit(): void {
    this.user1 = new UserInFeed("svijetlana123", new Image('1','https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png' ))
    this.user2 = new UserInFeed("komentator1", new Image('2','https://i.imgur.com/1YrCKa1.jpg' ))
    this.user3 = new UserInFeed("komentator2", new Image('3','https://i.imgur.com/9AZ2QX1.jpg' ))
    this.comment1 = new Comment(this.user1, "Wow, jako mi se dopada fotka!")
    this.comment2 = new Comment(this.user2, "Wow, jako mi se dopada slon na fotki ide gas matori!")
    this.postLocation = new Location(19.833549, 45.267136, "Novi Sad", "Serbia")
    this.comments2 = [new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA")]

    this.comments1 = [this.comment1]

    let date: Date = new Date(2021, 5, 18, 0, 0, 0, 0);
    let date1: Date = new Date(2021,5, 18, 22, 0, 0, 0);

    let newDate1 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate2 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate3 : Date = new Date(2021, 6,3,12,0,0,0)
    let newDate4 : Date = new Date(2021, 6,3,11,0,0,0)
    let newDate5 : Date = new Date(2021, 6,3,10,0,0,0)
    let newDate6 : Date = new Date(2021, 6,3,9,0,0,0)

    let a = moment(date).fromNow();
    let a1 = moment(date1).fromNow();

    this.post1 = new Post(this.user1, this.postLocation, "IDegasnamax luudnica matori, pogle ovog slona i ove ribojzle", true, this.images1, this.comments1, date, a, false, null)


    this.post2 = new Post(this.user2, this.postLocation, "WOOOOOOW AJAO KAKO OVAJ NISHTAGRAM GASIRA #idegasnamax", false, null, this.comments2, date1, a1, true, "../../../assets/test.mp4")
    this.feed = [this.post1, this.post2, this.post1]
    var story1 = new Story(this.user1,new StoryContent(false,new Image('1','https://i.imgur.com/1YrCKa1.jpg') ),newDate1)
    var story2 = new Story(this.user2,new StoryContent(false,new Image('1','https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg') ),newDate2)
    var story3 = new Story(this.user3,new StoryContent(false,new Image('1','https://i.imgur.com/9AZ2QX1.jpg') ),newDate3)
    var story4 = new Story(this.user1,new StoryContent(false,new Image('1','https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png') ),newDate4)
    var story5 = new Story(this.user2,new StoryContent(false,new Image('1','https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.15752-9/186472462_509117580122979_233512009969789842_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Pvaojs405SsAX-svZ9a&_nc_ht=scontent.fbeg2-1.fna&oh=846315e00aa5c71b410eeaabae6c0e4e&oe=60C698CD') ),newDate5)
    var story6 = new Story(this.user1,new StoryContent(false,new Image('1','https://i.imgur.com/1YrCKa1.jpg') ),newDate6)
    this.stories =[story1, story2, story3, story4, story5, story6, story1, story2]
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
