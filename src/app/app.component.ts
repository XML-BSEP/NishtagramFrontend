import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';
import { AuthenticatedUser } from './model/security/authenticatedUser';
import { Role } from './model/user/role';
import { AuthenticationService } from './service/authentication/authentication.service';
import { PusherService } from './service/pusher/pusher.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nishtagramfronend';

  user : AuthenticatedUser
  router : Router
  showHeader : boolean
  constructor(private authService : AuthenticationService, private _router : Router, private pusherService : PusherService, private snackBar: MatSnackBar) {
    this.router = _router
    var curUsr = JSON.parse(localStorage.getItem('currentUser'))
    console.log(curUsr)
    if (curUsr != null) {
      this.pusherService.channel1 = this.pusherService.pusher.subscribe(curUsr.id);
      // this.appComponent.initializePusher();
      this.pusherService.channel1.bind('notification', data => {
        snackBar.open(data.content, 'Ok', {
          duration: 4000
        });
     })
    }
 
   

  
  }



  public isNotLogged() {
    return !this.authService.getUserValue();
  }

  public isAdmin() {
    if( localStorage.getItem('currentUser')!=null){
      var role = JSON.parse(localStorage.getItem('currentUser')).role
      return this.authService.getUserValue() && role === Role.Admin;
    }
    else return false;
  }


  public isRegularUser() {
    if( localStorage.getItem('currentUser')!=null){
      var role = JSON.parse(localStorage.getItem('currentUser')).role
      return this.authService.getUserValue() && role === Role.RegularUser;
    }
    else return false;
  }

  public initializePusher() {

    this.pusherService.channel1.bind('notification', data => {
      console.log("dadsadadd");
    })
  }

}
