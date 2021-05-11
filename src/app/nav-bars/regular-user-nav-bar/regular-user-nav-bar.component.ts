import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-customer-nav-bar',
  templateUrl: './regular-user-nav-bar.component.html',
  styleUrls: ['./regular-user-nav-bar.component.css']
})
export class RegularUserComponent implements OnInit {

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
}
