import { Router } from '@angular/router';
import { PostOptionsComponent } from '../../dialogs/post-options/post-options.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { Add2collectionDialogComponent } from 'src/app/dialogs/add2collection-dialog/add2collection-dialog.component';
import { PostInfo } from './postinfo';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { ReportPostDialogComponent } from 'src/app/dialogs/report-post-dialog/report-post-dialog.component';



@Component({
  selector: 'feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
  @Input()
  post: Post;
  public canReport : boolean = true;

  partialComments : Comment[];
  allComms : boolean = false;
  commentForm: FormGroup;



  constructor(private router : Router, private postService : PostService, private toastr : ToastrService, private authenticationService : AuthenticationService,
    private dialog : MatDialog) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'comm' : new FormControl(null, Validators.required),
    })

    let curUsr = JSON.parse(localStorage.getItem('currentUser'))
    if(curUsr.id==this.post.user.id){
      this.canReport = false;
    }


    console.log(this.authenticationService.currentUserValue)
    if (this.authenticationService.currentUserValue === undefined) {
      this.router.navigate(['/forbidden'])
    }




  

  }

  like(){
    var like = new LikePost();
    like.postBy = this.post.user.id;
    like.postId = this.post.id;
    
    


    if (this.post.isLiked) {
      this.postService.removeLike(like).subscribe(
        res => {
          //this.toastr.info("Like removed")
          this.post.isLiked = !this.post.isLiked;

        } , error => {
          this.toastr.error("Post unavailable")
        }
      )

    } else {

      this.postService.likePost(like).subscribe(
        res => {
         // this.toastr.info("Post liked")
          
          this.post.isLiked = !this.post.isLiked;
          if (this.post.isDisliked) {
            this.post.isDisliked = false;
          }
         
        } , error => {
          this.toastr.error("Post unavailable")
        }
      )

    }



  }

  reportPost() {
    this.post.isStory = false;
    const dialogRef = this.dialog.open(ReportPostDialogComponent, {
      width: '35vw',
      height: 'fit-content',
      data: this.post
    });
  }
  dislike(){

    let like = new LikePost();
    like.postBy = this.post.user.id;
    like.postId = this.post.id;
    if (this.post.isDisliked) {
      this.postService.removeDislike(like).subscribe(
        res => {
          //this.toastr.info("Dislike removed")
          this.post.isDisliked = !this.post.isDisliked;
          if (this.post.isLiked) {
            this.post.isLiked = false;
          }

        } , error => {
          this.toastr.error("Post unavailable")
        }
      )

    }else
    {

      this.postService.dislikePost(like).subscribe(
        res => {
          if (this.post.isLiked) {
            this.postService.removeLike(like).subscribe(
              res => {
                this.post.isDisliked = true;
              //  this.toastr.info("Post disliked")
                this.post.isLiked = false;
              } , error => {
                this.toastr.error("Post unavailable")
              }
            )
          } else {

          this.postService.removeLike(like).subscribe(
            res => {
              this.post.isDisliked = true;
             // this.toastr.info("Post disliked")
              this.post.isLiked = false;
            } , error => {
              this.toastr.error("Post unavailable")
            }
          )
          }
        }
      )

    }

  }
  saveToCollectionDialog(item){
    const dialogRef = this.dialog.open(Add2collectionDialogComponent, {
      width: '35vw',
      height: '90vh',
      data: item
    });
  }

  bookmark(){
    if (this.post.isBookmarked) {
      let postInfo = new PostInfo();
      postInfo.postBy = this.post.user.id;
      postInfo.postId = this.post.id;

      this.postService.removeFromFavorites(postInfo).subscribe(
        res => {
          this.toastr.info("Post removed")
        }, err => {
          this.toastr.error("Service unavailable")
        }
      )
      this.post.isBookmarked = !this.post.isBookmarked;
    } else {
      let postInfo = new PostInfo();
      postInfo.postBy = this.post.user.id;
      postInfo.postId = this.post.id;

      this.postService.addToFavorite(postInfo).subscribe(
        res => {
          this.toastr.info("Saved to favorites")
        }, err => {
          this.toastr.error("Service unavailable")
        }
      )
      this.post.isBookmarked = !this.post.isBookmarked;
    }

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
          //this.toastr.info("Comment added.")

        }, error => {
          this.toastr.error("Post unavailable")
        }
      )

    }
  }
  goToProfile(){
    this.router.navigate(['/profile'], { queryParams: { id: this.post.user.id } });
  }

  toggleComments(){
    let postdto = new PostDTO();
    postdto.id = this.post.id;
    this.allComms = !this.allComms;
    console.log(this.post.comments);

    this.postService.getAllComments(postdto).subscribe(
        res => {
          this.post.comments = res;

        }
    )

    }






  goToPostDetails(){
    console.log(this.post)
    location.href="/postDetails?postId="+this.post.id +"&userId="+this.post.user.id;

    // this.router.navigate(['/postDetails'],
    // {state:
    //   {data:
    //     this.post
    //   }
    // });
  }
}
