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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    component : HomepageComponent
  },
  {
    path: 'createPost',
    component : CreatePostComponent
  },
  {
    path: 'postDetails',
    component : PostDetailsComponent
  },
  {
    path: 'profile',
    component : ProfileComponent
  },
  {
    path: 'editProfile',
    component : EditProfileComponent
  },
  {
    path:'search',
    component : SearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
