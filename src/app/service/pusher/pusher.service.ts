declare const Pusher: any;
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  public pusher: any;
  public channel1: any;
  
  constructor(private http: HttpClient) {

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });

    //var curUsr = JSON.parse(localStorage.getItem('currentUser'))
    //this.channel = this.pusher.subscribe(curUsr.id);
  }




}
