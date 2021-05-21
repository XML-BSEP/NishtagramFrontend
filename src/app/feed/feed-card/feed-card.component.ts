import { Router } from '@angular/router';
import { PostOptionsComponent } from '../../dialogs/post-options/post-options.component';
import { MatDialog } from '@angular/material/dialog';
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

  partialComments : Comment[];
  allComms : boolean = false;
  public commentForm: FormGroup;


  constructor(private router : Router,
    private dialog : MatDialog) { }

  ngOnInit() {

    if(this.post.comments.length>10){
      this.partialComments = this.post.comments.slice(0, 10)
    }else{
      this.partialComments = this.post.comments;

    }

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
    var newComment = new Comment(currUsr, this.commentForm.controls.comm.value)
    this.post.comments.push(newComment)
    this.partialComments.push(newComment)
    this.commentForm.reset();
  }
  click(event){
    console.log(event.offsetX, event.offsetY)
  }

  toggleComments(){
    if(this.allComms){
      this.partialComments = this.post.comments.slice(0,10)

    }else{

      this.partialComments = this.post.comments;
    }
    this.allComms = !this.allComms
  }

  goToPostDetails(){
    this.router.navigate(['/postDetails'],
    {state:
      {data:
        this.post
      }
    });
  }
}
