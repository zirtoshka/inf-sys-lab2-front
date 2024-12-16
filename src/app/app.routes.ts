import {Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth-tools/authGuard';


export const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch: 'full'},
  {
	path: 'home', component: HomeComponent,
	canActivate: [AuthGuard],
  },
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
