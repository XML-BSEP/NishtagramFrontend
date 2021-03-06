import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateAd } from "src/app/model/agent/create_ad";
import { CreateDisposableCampaign } from "src/app/model/agent/create_disposable_campaign";
import { CreateMultipleCampaign } from "src/app/model/agent/create_multiple_campaign";
import { DisposableCampaign } from "src/app/model/agent/disposable_campaign";
import { DisposableCampaignRequest } from "src/app/model/agent/disposable_campaign_request";
import { MultipleCampaign } from "src/app/model/agent/multiple_campaign";
import { MultipleCampaignRequest } from "src/app/model/agent/multiple_campaign_request";
import { ShowAd } from "src/app/model/agent/show_ads";
import { ClickEvent } from "src/app/model/clickevent";
import { Comment } from "src/app/model/feed/comment";
import { LikePost } from "src/app/model/feed/likepost";
import { Post } from "src/app/model/feed/post";
import { PostDTO } from "src/app/model/feed/postdto";
import { Story } from "src/app/model/feed/story";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AgentService {
  
    constructor(private https : HttpClient) { }

    createAd(createAd : CreateAd) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.createAd}`, createAd)
    }

    getAllAdsPerAgent() : Observable<ShowAd[]> {
        return this.https.get<ShowAd[]>(`${environment.baseUrl}/${environment.getAllAdsPerAgent}`)
    }

    createDisposableCampaign(disposableCampaign : CreateDisposableCampaign) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.createDisposableCampaign}`, disposableCampaign)
    }

    createMultipleCampaign(multipleCampaign : CreateMultipleCampaign) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.createMultipleCampaign}`, multipleCampaign)
    }

    getAllDisposableCampaigns() : Observable<DisposableCampaign[]> {
        return this.https.get<DisposableCampaign[]>(`${environment.baseUrl}/${environment.getAllDisposableCampaigns}`)
    }

    getAllMultipleCampaigns() : Observable<MultipleCampaign[]> {
        return this.https.get<MultipleCampaign[]>(`${environment.baseUrl}/${environment.getAllMultipleCampaigns}`)
    }

    deleteDisposableCampaign(disposableCampaign : DisposableCampaign) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.deleteDisposableCampaign}`, disposableCampaign)
    }

    deleteMultipleCampaign(multi : MultipleCampaign) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.deleteMultipleCampaign}`, multi)
    }

    updateMultipleCampaign(multi : MultipleCampaign) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.updateMultipleCampaign}`, multi)
    }

    createDisposableCampaignRequest(disposableCampaignRequest : DisposableCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.createDisposableCampaignRequest}`, disposableCampaignRequest)
    }

    createMultipleCampaignRequest(multipleCampaignRequest : MultipleCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.createMultipleCampaignRequest}`, multipleCampaignRequest)
    }


    getAllDisposableCampaignRequests() : Observable<DisposableCampaignRequest[]> {
        return this.https.get<DisposableCampaignRequest[]>(`${environment.baseUrl}/${environment.getAllDisposableCampaignRequests}`)
    }

    getAllMultipleCampaignRequests() : Observable<MultipleCampaignRequest[]> {
        return this.https.get<MultipleCampaignRequest[]>(`${environment.baseUrl}/${environment.getAllMultipleCampaignRequests}`)
    }

    approveDisposableCampaignRequest(disposableCampaignRequest : DisposableCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.approveDisposableCampaignRequest}`, disposableCampaignRequest)
    }

    approveMultipleCampaignRequest(multipleCampaignRequest : MultipleCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.approveMultipleCampaignRequest}`, multipleCampaignRequest)
    }

    rejectDisposableCampaignRequest(disposableCampaignRequest : DisposableCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.rejectDisposableCampaignRequest}`, disposableCampaignRequest)
    }

    rejectMultipleCampaignRequest(multipleCampaignRequest : MultipleCampaignRequest) : Observable<Response> {
        return this.https.post<Response>(`${environment.baseUrl}/${environment.rejectMultipleCampaignRequest}`, multipleCampaignRequest)
    }

    getAllPostAds() : Observable<Post[]> {
        return this.https.get<Post[]>(`${environment.baseUrl}/${environment.getAllPostAds}`)
    }
    
    getAllStoryAds() : Observable<Story[]> {
        return this.https.get<Story[]>(`${environment.baseUrl}/${environment.getAllStoryAds}`)
    }

    generateApiToken() : Observable<String> {
        return this.https.get<String>(`${environment.baseUrl}/${environment.generateApiToken}`)
    }

    
  likePost(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.likeAd}`, likePost);
  }

  dislikePost(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.dislikeAd}`, likePost);
  }
  removeLike(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.removeLikeAd}`, likePost);

  }
  removeDislike(likePost : LikePost) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.removeDislikeAd}`, likePost);
  }

  comment(comment : Comment) : Observable<Response> {
    return this.https.post<Response>(`${environment.baseUrl}/${environment.commentAd}`, comment)
  }

  getAllComments(post : PostDTO) : Observable<Comment[]> {
    return this.https.post<Comment[]>(`${environment.baseUrl}/${environment.getCommentsAd}`, post);
  }

  createEvent(event : ClickEvent) : Observable<Response> {
      return this.https.post<Response>(`${environment.baseUrl}/${environment.createClickEvent}`, event)
  }
  }  