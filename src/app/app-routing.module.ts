import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { HomepageComponent } from './feed/homepage/homepage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationConfirmationComponent } from './registration-confirmation/registration-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';

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
    path: 'profile',
    component : ProfileComponent
  },
  {
    path: 'editProfile',
    component : EditProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
