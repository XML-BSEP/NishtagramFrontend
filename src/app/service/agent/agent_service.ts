import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateAd } from "src/app/model/agent/create_ad";
import { CreateDisposableCampaign } from "src/app/model/agent/create_disposable_campaign";
import { CreateMultipleCampaign } from "src/app/model/agent/create_multiple_campaign";
import { ShowAd } from "src/app/model/agent/show_ads";
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
  }  