import { FormGroup, FormControl } from '@angular/forms';
import { Comment } from './../../model/feed/comment';
import { UserInFeed } from './../../model/feed/userInFeed';
import { RegisteredUser } from 'src/app/model/user/registeredUser';
import { Post } from './../../model/feed/post';
import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/model/feed/image';


@Component({
  selector: 'feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
  @Input()
  post: Post;


  public commentForm: FormGroup;


  constructor() { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'comm' : new FormControl(null),
    });

  }
  like(){
    if(this.post.isDisliked){
      this.dislike();
    }
    this.post.isLiked = !this.post.isLiked;

    //TODO: BACKEND!
  }
  dislike(){
    if(this.post.isLiked){
      this.like();
    }
    this.post.isDisliked = !this.post.isDisliked;
    //TODO: BACKEND!

  }
  bookmark(){
    this.post.isBookmarked = !this.post.isBookmarked;
    //TODO: BACKEND!
  }
  comment(){
    var currUsr = new UserInFeed('randomusr', new Image("https://pbs.twimg.com/media/DnTUtInXsAMG7RI.jpg"))
    this.post.comments.push(new Comment(currUsr, this.commentForm.controls.comm.value))
    this.commentForm.reset();
  }
}
