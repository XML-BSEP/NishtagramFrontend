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
  }  