import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser } from './model/security/authenticatedUser';
import { Role } from './model/user/role';
import { AuthenticationService } from './service/authentication/authentication.service';

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
  constructor(private authService : AuthenticationService, private _router : Router) {
    this.router = _router
  }



  public isNotLogged() {
    return !this.authService.getUserValue();
  }

  public isAdmin() {
    return this.authService.getUserValue() && this.authService.getUserValue().role === Role.Admin;
  }


  public isRegularUser() {
    if (this.router.url === '/forbidden') {
      return false;
    }
    return this.authService.getUserValue() && this.authService.getUserValue().role === Role.RegularUser;
  }

}
