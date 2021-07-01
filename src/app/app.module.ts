import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
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
import { LoginComponent } from './sign-in/login/login.component';
import { RegisterComponent } from './registration/register/register.component'
import {RegistrationConfirmationComponent} from './registration/registration-confirmation/registration-confirmation.component'
import {ForgotPasswordComponent} from "./sign-in/forgot-password/forgot-password.component"
import {HomepageComponent} from "./feed/homepage/homepage.component"
import {FeedCardComponent} from "./feed/feed-card/feed-card.component"
import { CreatePostComponent } from './create-post/create-post.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { EditProfileComponent } from './userprofile/edit-profile/edit-profile.component';
import { FollowersDialogComponent } from './dialogs/followers-dialog/followers-dialog.component';
import { FollowingsDialogComponent } from './dialogs/followings-dialog/followings-dialog.component';
import { NotificationsDialogComponent } from './dialogs/notifications-dialog/notifications-dialog.component';
import { PostDetailsComponent } from './feed/post-details/post-details.component';
import { PostOptionsComponent } from './dialogs/post-options/post-options.component';
import { StoryDialogComponent } from './dialogs/story-dialog/story-dialog.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { StoryHighlightDialogComponent } from './dialogs/story-highlight-dialog/story-highlight-dialog.component';
import { NewhighlightDialogComponent } from './dialogs/newhighlight-dialog/newhighlight-dialog.component';
import { NewstoryDialogComponent } from './dialogs/newstory-dialog/newstory-dialog.component';
import { SearchComponent } from './feed/search/search.component';
import { Add2collectionDialogComponent } from './dialogs/add2collection-dialog/add2collection-dialog.component';
import { ForbiddenComponent } from './forbidden/forbidden.component'
import {TotpLoginComponent} from './sign-in/totpsignin/login.component';
import { AdminRequestVerificationComponent } from './admin-request-verification/admin-request-verification/admin-request-verification.component'
import { UserSettingsComponent } from './userprofile/user-settings/user-settings.component'
import { ReportPostDialogComponent } from './dialogs/report-post-dialog/report-post-dialog.component';
import { NotificationSettingsComponent } from './dialogs/notification-settings/notification-settings.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FollowRequestDialogComponent } from './dialogs/follow-request-dialog/follow-request-dialog.component';
import { PreRegistrationComponent } from './registration/pre-register/pre-registration/pre-registration.component';
import { AgentRegistrationComponent } from './registration/register-agent/agent-registration/agent-registration.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { BanUserDialog } from './dialogs/ban-user-dialog/ban-user.component';
import { CreateAdComponent } from './create-ad/create-ad/create-ad.component';
import { CreateCampaingComponent } from './create-campaing/create-campaing/create-campaing.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    NotUserNavBarComponent,
    RegularUserComponent,
    AdminNavBarComponent,
    LoginComponent,
    RegistrationConfirmationComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomepageComponent,
    FeedCardComponent,
    CreatePostComponent,
    ProfileComponent,
    ForbiddenComponent,
    EditProfileComponent,
    FollowersDialogComponent,
    FollowingsDialogComponent,
    NotificationsDialogComponent,
    PostDetailsComponent,
    PostOptionsComponent,
    StoryDialogComponent,
    StoryHighlightDialogComponent,
    NewhighlightDialogComponent,
    NewstoryDialogComponent,
    SearchComponent,
    Add2collectionDialogComponent,
    TotpLoginComponent,
    AdminRequestVerificationComponent,
    UserSettingsComponent,
    ReportPostDialogComponent,
    NotificationSettingsComponent,
    FollowRequestDialogComponent,
    PreRegistrationComponent,
    AgentRegistrationComponent,
    AdminReportsComponent,
    BanUserDialog,
    CreateAdComponent,
    CreateCampaingComponent

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
    MatCarouselModule.forRoot(),
    MatSnackBarModule,
    NgxMaterialTimepickerModule

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
