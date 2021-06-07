import { Router } from '@angular/router';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Post } from './../../model/feed/post';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Image } from 'src/app/model/feed/image';
import { Comment } from 'src/app/model/feed/comment';
import { Location } from 'src/app/model/utilities/location';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public post1 : Post;
  public post2 : Post;
  public post : Post;
  public user1 : UserInFeed;
  public comment1 : Comment;
  public comment2 : Comment;
  public user2 : UserInFeed;
  public user3 : UserInFeed;
  public postLocation : Location;
  public comments1 : Comment[];
  public comments2 : Comment[];

  image1 = 'https://i.imgur.com/1YrCKa1.jpg'
  image2 = 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
  image3 = 'https://i.imgur.com/9AZ2QX1.jpg'
  image4 = 'https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.15752-9/186472462_509117580122979_233512009969789842_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Pvaojs405SsAX-svZ9a&_nc_ht=scontent.fbeg2-1.fna&oh=846315e00aa5c71b410eeaabae6c0e4e&oe=60C698CD'
  images1 = [this.image1, this.image2, this.image3, this.image4]
  images2 = [this.image4]
  images3 = [this.image4]
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(history.state.data===undefined){
      this.router.navigate(['/home'])
    }
    console.log(history.state.data)
    this.post = history.state.data;
/*
    this.user1 = new UserInFeed("svijetlana123", new Image('1','https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png' ))
    this.user2 = new UserInFeed("komentator1", new Image('2','https://i.imgur.com/1YrCKa1.jpg' ))
    this.user3 = new UserInFeed("komentator2", new Image('3','https://i.imgur.com/9AZ2QX1.jpg' ))*/
    this.postLocation = new Location(19.833549, 45.267136, "Novi Sad", "Serbia")

    //this.comments1 = [new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA"),new Comment(this.user1, "IDEGASNAMAX"), new Comment(this.user3, "LOREM IPSUM WISHE U AAAAAAA")]

    let date: Date = new Date(2021, 4, 18, 0, 0, 0, 0);

    let a = moment(date).fromNow();

    this.post1 = new Post(this.user1, this.postLocation, "IDegasnamax luudnica matori, pogle ovog slona i ove ribojzle", true, this.images1, this.comments1, date, a)

  }

}
