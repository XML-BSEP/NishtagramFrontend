import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {PostLocations} from '../../model/search/postLocations'
import {PostIds} from '../../model/search/PostIds';
import { PostForSearch } from 'src/app/model/search/postForSearch';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchPostLocations(searchedLocation : String) : Observable<PostLocations[]>{ 
    return this.http.get<PostLocations[]>(`${environment.baseUrl}/${environment.getPostLocationsByLocationContaining}?searchedLocation=${searchedLocation}`);
  }

  getPostByIdForSearch(ids : PostIds) : Observable<PostForSearch[]> {
    return this.http.post<PostForSearch[]>(`${environment.baseUrl}/post/${environment.getPostByIdForSearch}`, ids)
  }

}
