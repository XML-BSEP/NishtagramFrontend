import { PostDetailsComponent } from './feed/post-details/post-details.component';
import { EditProfileComponent } from './userprofile/edit-profile/edit-profile.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { HomepageComponent } from './feed/homepage/homepage.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { RegistrationConfirmationComponent } from './registration/registration-confirmation/registration-confirmation.component';
import { RegisterComponent } from './registration/register/register.component';
import { LoginComponent } from './sign-in/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { SearchComponent } from './feed/search/search.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TotpLoginComponent } from './sign-in/totpsignin/login.component';
import { AuthGuard } from './helpers';
import { Role } from './model/user/role';
import {AdminComponent} from './admin/admin.component'
import { AdminRequestVerificationComponent } from './admin-request-verification/admin-request-verification/admin-request-verification.component';
import { UserSettingsComponent } from './userprofile/user-settings/user-settings.component';
import { PreRegistrationComponent } from './registration/pre-register/pre-registration/pre-registration.component';
import { AgentRegistrationComponent } from './registration/register-agent/agent-registration/agent-registration.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { CreateAdComponent } from './create-ad/create-ad/create-ad.component';
import { CreateCampaingComponent } from './create-campaing/create-campaing/create-campaing.component';
import { AdminRegistrationRequestComponent } from './admin-registration-request/admin-registration-request/admin-registration-request.component';
import { ChangeCampaignComponent } from './change-campaign/change-campaign/change-campaign.component';
import { CampaignRequestsComponent } from './campaign-requests/campaign-requests/campaign-requests.component';
import { CampaignInfluencerRequestComponent } from './campaign-influencer-request/campaign-influencer-request/campaign-influencer-request.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    // ,
    // canActivate : [AuthGuard],
    // data : {roles: [Role.RegularUser]}
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'registration',
    component: RegisterComponent
  },{
    path: 'confirmRegistration',
    component : RegistrationConfirmationComponent
  },{
    path: 'forgotPassword',
    component : ForgotPasswordComponent
  },
  {
    path: 'home',
    component : HomepageComponent,
    // canActivate : [AuthGuard],
    // data : {roles: [Role.RegularUser]}
  },
  {
    path: 'createPost',
    component : CreatePostComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.RegularUser, Role.Agent]}
  },
  {
    path: 'postDetails',
    component : PostDetailsComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.RegularUser, Role.Admin, Role.Agent]}
  },
  {
    path: 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.RegularUser, Role.Agent]}
  },
  {
    path: 'settings',
    component : UserSettingsComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.RegularUser, Role.Agent]}
  },
  {
    path: 'editProfile',
    component : EditProfileComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.RegularUser, Role.Agent]}
  },
  {
    path:'search',
    component : SearchComponent
  },
  {
    path : "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "verify",
    component: TotpLoginComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.TemporaryUser]}
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.Admin]}

  }, 
  {
    path: "admin/verifications",
    component: AdminRequestVerificationComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.Admin]}
  },
  {
    path: "preRegistration",
    component: PreRegistrationComponent
  },
  {
    path: "agentRegistration",
    component: AgentRegistrationComponent
  },
  {
    path: "admin/reports", 
    component: AdminReportsComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.Admin]}
  },
  {
    path: 'createAd',
    component : CreateAdComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.NonExistentRole]}
  },
  {
    path: 'createCampaign',
    component : CreateCampaingComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.NonExistentRole]}
  }, 
  {
    path : "admin/registrationRequest",
    component: AdminRegistrationRequestComponent,
    canActivate : [AuthGuard],
    data : {roles : [Role.Admin]}
    
  },
  {
    path: 'changeCampaign',
    component : ChangeCampaignComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.NonExistentRole]}
  },
  {
    path: 'campaignRequest',
    component : CampaignRequestsComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.Agent]}
  },
  {
    path: 'influencerCampaignRequest',
    component : CampaignInfluencerRequestComponent,
    canActivate : [AuthGuard],
    data : {roles: [Role.Agent, Role.RegularUser]}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
