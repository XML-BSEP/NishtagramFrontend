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
import { StoryHighlightOnProfile } from 'src/app/model/profile/storyHighlightOnProfile';
import { ViewHighlight } from 'src/app/model/highlight/viewhighlight';
import { SaveHighlight } from 'src/app/model/newhighlight';
import { UsersCollection } from 'src/app/model/feed/usersCollection';
import { CollectionDTO } from 'src/app/userprofile/profile/collectiondto';
import { PostInfo } from 'src/app/feed/feed-card/postinfo';
import { ReportPost } from 'src/app/model/reports/reportPost';
import { StoryReport } from 'src/app/model/reports/reportStory';
import { Mute } from 'src/app/model/profile/mute';
import { MutedContentDTO } from 'src/app/model/muteContentdto';
import { Report } from 'src/app/model/reports/report';
import { ReviewReport } from 'src/app/model/reports/reviewReport';
import { GetStoryForAdmin } from 'src/app/model/reports/getstoryadmin';

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

  getAllStories(userDTO : UserInFeed) : Observable<ProfileStory[]> {
    return this.https.post<ProfileStory[]>(`${environment.baseUrl}/${environment.getAllStoriesOnProfile}`, userDTO)
  }

  getAllHighlightsByUser(userDTO : UserInFeed) : Observable<StoryHighlightOnProfile[]> {
    return this.https.post<StoryHighlightOnProfile[]>(`${environment.baseUrl}/${environment.getAllHighlights}`, userDTO)
  }

  getStoriesInOneHighlight(highlightDTO : ViewHighlight) : Observable<StoryHighlightOnProfile> {
    return this.https.post<StoryHighlightOnProfile>(`${environment.baseUrl}/${environment.getAllHighlightStories}`, highlightDTO)
  }

  updateHighlight(highlight : SaveHighlight) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.saveHighlight}`, highlight)
  }

  getAllCollections() : Observable<UsersCollection[]> {
    return this.https.get<UsersCollection[]>(`${environment.baseUrl}/${environment.getCollections}`);
  }

  getCollection(collectionName : CollectionDTO) : Observable<UsersCollection> {
    return this.https.post<UsersCollection>(`${environment.baseUrl}/${environment.getPostsInCollection}`, collectionName)
  }

  getAllFavorites() : Observable<PostInProfile[]> {
    return this.https.get<PostInProfile[]>(`${environment.baseUrl}/${environment.getFavorites}`)
  }

  addToFavorite(postInfo : PostInfo) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.addToFavorites}`, postInfo)
  }

  addToCollection(postInfo : PostInfo) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.addToCollection}`, postInfo)
  }

  removeFromFavorites(postInfo : PostInfo) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.removeFavorite}`, postInfo)
  }

  getLikedMedia() : Observable<PostInProfile[]> {
    return this.https.get<PostInProfile[]>(`${environment.baseUrl}/${environment.getLikedMedia}`)
  }
  getDisikedMedia() : Observable<PostInProfile[]> {
    return this.https.get<PostInProfile[]>(`${environment.baseUrl}/${environment.getDislikedMedia}`)
  }

  getAllReportTypes() : Observable<String[]> {
    return this.https.get<String[]>(`${environment.baseUrl}/${environment.getAllReportTypes}`)
  }

  reportPost(reportPost : ReportPost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.reportPost}`, reportPost)
  }

  reportStory(reportStory : StoryReport) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.reportStory}`, reportStory)
  }

  isMuted(MutedContentDTO : MutedContentDTO) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.isMuted}`, MutedContentDTO)
  }

  mute(MutedContentDTO : MutedContentDTO) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.muteContent}`, MutedContentDTO)
  }

  unmute(MutedContentDTO : MutedContentDTO) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.unmuteContent}`, MutedContentDTO)
  }

  getAllRejectedReports() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getRejectedReports}`);
  }

  getAllApprovedReports() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getApprovedReports}`);
  }

  getAllPendingReports() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getPendingReports}`);
  }
  
  reviewReport(report : ReviewReport) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.reviewReport}`, report)
  }

  getAllRejectedReportsStory() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getRejectedReportsStory}`);
  }

  getAllApprovedReportsStory() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getApprovedReportsStory}`);
  }

  getAllPendingReportsStory() : Observable<Report[]> {
    return this.https.get<Report[]>(`${environment.baseUrl}/${environment.getPendingReportsStory}`);
  }
  
  reviewReportStory(report : ReviewReport) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.reviewReportStory}`, report)
  }

  getStoryByIdForAdmin(getStory : GetStoryForAdmin) : Observable<Story> {
    return this.https.post<Story>(`${environment.baseUrl}/${environment.getStoryForAdmin}`, getStory)
  }
}
