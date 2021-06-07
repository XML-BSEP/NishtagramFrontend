import { NewUser } from './../../model/user/newUser';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisteredUser } from 'src/app/model/user/registeredUser';
import { ConfirmRegistration} from 'src/app/model/user/confirmRegistration'
import { NewPost } from 'src/app/model/createPost/newPost';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/feed/post';
import { LikePost } from 'src/app/model/feed/likepost';
import { Comment } from 'src/app/model/feed/comment';
import { PostDTO } from 'src/app/model/feed/postdto';
import { UserInFeed } from 'src/app/model/feed/userInFeed';
import { PostInProfile } from 'src/app/model/profile/postInProfile';
import { GetPostDTO } from 'src/app/model/getpost'
import { Story } from 'src/app/model/feed/story';
import { ProfileStory } from 'src/app/model/profile/profileStory';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private https : HttpClient) { }

  postMedia(newPost : NewPost) : Observable<Response> {
     return this.https.post<Response>(`${environment.baseUrl}/${environment.createPost}`, newPost)
  }

  generateFeed() : Observable<Post[]> {
    return this.https.get<Post[]>(`${environment.baseUrl}/${environment.feed}`)
  }

  likePost(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.like}`, likePost);
  }

  dislikePost(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.dislike}`, likePost);
  }
  removeLike(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.removeLike}`, likePost);

  }
  removeDislike(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.removeDislike}`, likePost);
  }

  comment(comment : Comment) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.comment}`, comment)
  }

  getAllComments(post : PostDTO) : Observable<Comment[]> {
    return this.https.post<Comment[]>(`${environment.baseUrl}/${environment.getComments}`, post);
  }

  getAllPostsInProfile(user : UserInFeed) : Observable<PostInProfile[]> {
    return this.https.post<PostInProfile[]>(`${environment.baseUrl}/${environment.getMyPosts}`, user)
  }

  getPostById(getPost : GetPostDTO) : Observable<Post[]> {
    return this.https.post<Post[]>(`${environment.baseUrl}/${environment.getPostById}`, getPost)
  }

  getStories() : Observable<Story[]> {
    return this.https.get<Story[]>(`${environment.baseUrl}/${environment.getStories}`)
  }

  addStory(story : ProfileStory) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.addStory}`, story)
  }

  
}