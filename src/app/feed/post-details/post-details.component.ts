import { GetPostDTO } from './../../model/getpost';
import { PostInProfile } from './../../model/profile/postInProfile';
import { PostService } from './../../service/post/postservice';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInFeed } from './../../model/feed/userInFeed';
import { Post } from './../../model/feed/post';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Image } from 'src/app/model/feed/image';
import { Comment } from 'src/app/model/feed/comment';
import { Location } from 'src/app/model/utilities/location';
import { PostDTO } from 'src/app/model/feed/postdto';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public post : any;
  public post1 : Post;


  public postId : String;
  public userId : String;
  constructor(private postService :PostService, private route:ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    // if(history.state.data===undefined){
    //   this.router.navigate(['/home'])
    // }
    // console.log(history.state.data)
    // this.post = history.state.data;

    // console.log(this.post)
    // this.post.comments = []

    this.route.queryParams
    .subscribe(params => {
      this.userId = params.userId;
      this.postId = params.postId;

    });

    this.getPost()
  }

  getPost(){
    var postDTO = new GetPostDTO();
    postDTO.PostId = this.postId;
    postDTO.UserId = this.userId;
    this.postService.getPostById(postDTO).subscribe(
      res => {
        console.log(res)
        this.post = res
        this.post1 = this.post;
        console.log(this.post1)
        this.post1.comments=[];
      }
    )
  }
}
