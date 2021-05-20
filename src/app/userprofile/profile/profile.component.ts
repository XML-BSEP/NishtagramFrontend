import { Router } from '@angular/router';
import { PostInProfile } from './../../model/profile/postInProfile';
import { Post } from './../../model/feed/post';
import { UserInFeed } from './../../model/feed/userInFeed';
import { NewUser } from './../../model/user/newUser';
import { UserProfile } from './../../model/profile/userProfile';
import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/model/feed/image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile : UserProfile;
  followers : UserInFeed[];
  following : UserInFeed[];
  posts : PostInProfile[];

  user : NewUser;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = new NewUser("Pera", "Peric", "peroslav@gmail.com", "Novi Sad, Srbija", "0211231", new Date(1999,4,16,0,0,0,0), '1', null, "SNISUIBADIUISUD", 'pera123', null, null, 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80');
    let follow1 = new UserInFeed('prviFollower' , new Image('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiewire.com%2F2019%2F08%2Fjoker-review-joaquin-phoenix-1202170236%2F&psig=AOvVaw3aESvaPj9CFA-DXYcn5X6V&ust=1621598469987000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjhrJib2PACFQAAAAAdAAAAABAD'));
    let follow2 = new UserInFeed('drugiFollower', new Image('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2F2019%2F10%2F04%2Fmovies%2Fthe-jokers-ranked.html&psig=AOvVaw3aESvaPj9CFA-DXYcn5X6V&ust=1621598469987000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjhrJib2PACFQAAAAAdAAAAABAJ'))
    let follow3 = new UserInFeed('treciFollower', new Image('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wired.com%2Fstory%2Fnew-joker-movie-scorsese%2F&psig=AOvVaw3aESvaPj9CFA-DXYcn5X6V&ust=1621598469987000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjhrJib2PACFQAAAAAdAAAAABAP'))
    let follow4 = new UserInFeed('cetvrtiFollower', new Image('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.newyorker.com%2Fculture%2Fthe-front-row%2Fjoker-is-a-viewing-experience-of-rare-numbing-emptiness&psig=AOvVaw3aESvaPj9CFA-DXYcn5X6V&ust=1621598469987000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjhrJib2PACFQAAAAAdAAAAABAU'))
    this.followers = [follow1, follow2, follow3, follow4]
    this.following = [follow1, follow2, follow3]
    let post1 = new PostInProfile('pera123', new Image('https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'),'123')
    let post2 = new PostInProfile('pera123', new Image('https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),'1234')
    let post3 = new PostInProfile('pera123', new Image('https://i.imgur.com/1YrCKa1.jpg'),'12345')
    let post4 = new PostInProfile('pera123', new Image('https://scontent.fbeg2-1.fna.fbcdn.net/v/t1.15752-9/186472462_509117580122979_233512009969789842_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ae9488&_nc_ohc=Pvaojs405SsAX-svZ9a&_nc_ht=scontent.fbeg2-1.fna&oh=846315e00aa5c71b410eeaabae6c0e4e&oe=60C698CD'),'1234567')
    let post6 = new PostInProfile('pera123', new Image('https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'),'12345678')
    let post5 = new PostInProfile('pera123', new Image('https://i.imgur.com/9AZ2QX1.jpg'),'123456789')

    this.posts = [post1, post2, post3, post4, post5, post6]
    this.profile = new UserProfile(this.user, this.followers, this.following, this.posts)

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
}
