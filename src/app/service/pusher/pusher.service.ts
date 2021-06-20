declare const Pusher: any;
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel1: any;
  
  constructor(private http: HttpClient) {

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel1 = this.pusher.subscribe('1234');
  }




}
