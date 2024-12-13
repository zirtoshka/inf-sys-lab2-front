import {CanActivateFn, Router, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {inject} from '@angular/core';
import {AuthService} from './auth-tools/auth.service';
import {deleteCookie} from './auth-tools/cookie-utils';
import {AuthGuard} from './auth-tools/authGuard';


export const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
    // , canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];



// const authGuard: CanActivateFn = (route, state) => {
//   if (inject(AuthService).isLoggedIn) {
//     return true;
//   }
//   deleteCookie("token");
//   inject(Router).navigate(['']);
//   return false;
// }
