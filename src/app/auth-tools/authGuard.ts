import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.authService.fetchStatus();

    if (!this.authService.isLoggedIn) {
      this.authService.login();
      return false;
    }
    return true;
  }
}
