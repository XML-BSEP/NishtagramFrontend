import { NewUser } from './../../model/user/newUser';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisteredUser } from 'src/app/model/user/registeredUser';
import { ConfirmRegistration} from 'src/app/model/user/confirmRegistration'
import { NewPost } from 'src/app/model/createPost/newPost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private https : HttpClient) { }

  postMedia(newPost : NewPost) : Observable<Response> {
     return this.https.post<Response>(`${environment.baseUrl}/${environment.createPost}`, newPost)
  }
}