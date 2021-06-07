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
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { PostService } from 'src/app/service/post/postservice';
import { LikePost } from 'src/app/model/feed/likepost';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/profile/user';
import { PostDTO } from 'src/app/model/feed/postdto';


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


  constructor(private router : Router, private postService : PostService, private toastr : ToastrService,
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

    
    let like = new LikePost();
    like.postBy = this.post.user.id;
    like.postId = this.post.id;


    if (this.post.isLiked) {
      this.postService.removeLike(like).subscribe(
        res => {
          this.toastr.info("Post unliked")
          this.post.isLiked = !this.post.isLiked;
        } , error => {
          this.toastr.error("Post unavailable")
        }
      )
      
    } else {
    
      this.postService.likePost(like).subscribe(
        res => {
          this.toastr.info("Post liked")
          this.post.isLiked = !this.post.isLiked;
        } , error => {
          this.toastr.error("Post unavailable")
        }
      )

    }
    


  }
  dislike(){
    if(this.post.isLiked){
      this.like();
    }

    
    let like = new LikePost();
    like.postBy = this.post.user.id;
    like.postId = this.post.id;


    if (this.post.isDisliked) {
      this.postService.removeDislike(like).subscribe(
        res => {
          this.toastr.info("Dislike removed")
          this.post.isLiked = !this.post.isLiked;
        } , error => {
          this.toastr.error("Post unavailable")
        }
      )
      
    } else {
    
      this.postService.dislikePost(like).subscribe(
        res => {
          this.toastr.info("Post disliked")
          this.post.isDisliked = !this.post.isDisliked;
        } , error => {
          this.toastr.error("Post unavailable")
        }
      )

    }

  }
  bookmark(){
    this.post.isBookmarked = !this.post.isBookmarked;
    //TODO: BACKEND!
  }
  comment(){
    /*var currUsr = new UserInFeed('randomusr', new Image('1',"https://pbs.twimg.com/media/DnTUtInXsAMG7RI.jpg"))
    var newComment = new Comment(currUsr, this.commentForm.controls.comm.value)
    this.post.comments.push(newComment)
    this.partialComments.push(newComment)*/
    if (this.commentForm.controls.comm.value === '') {
      this.toastr.info("Please enter comment.")
    } else {
      let comment = new Comment(this.post.user.id, this.post.id, new UserInFeed("1", "", ""), this.commentForm.controls.comm.value);
      this.postService.comment(comment).subscribe(
        res => {
          //this.partialComments.push(comment)
          this.post.numOfComments = this.post.numOfComments + 1;
          this.commentForm.reset();
          if (this.allComms) {
            this.toggleComments();
          }
          this.toastr.info("Comment added.")

        }, error => {
          this.toastr.error("Post unavailable")
        }
      )

    }
  }

  toggleComments(){
    let postdto = new PostDTO();
    postdto.id = this.post.id;
    this.allComms = !this.allComms;

    if (this.partialComments.length < this.post.numOfComments) {
      this.postService.getAllComments(postdto).subscribe(
        res => {
          this.post.comments = res;
          this.partialComments = this.post.comments;
        }
      )
    }
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
