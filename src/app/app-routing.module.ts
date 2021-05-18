import { HomepageComponent } from './feed/homepage/homepage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationConfirmationComponent } from './registration-confirmation/registration-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
