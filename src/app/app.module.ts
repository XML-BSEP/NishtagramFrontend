import { AdminNavBarComponent } from './nav-bars/admin-nav-bar/admin-nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NotUserNavBarComponent } from './nav-bars/not-user-nav-bar/not-user-nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import {RegularUserComponent} from "./nav-bars/regular-user-nav-bar/regular-user-nav-bar.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    NotUserNavBarComponent,
    RegularUserComponent,
    AdminNavBarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    // {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true},
    // {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
