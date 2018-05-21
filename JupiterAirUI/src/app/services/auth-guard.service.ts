import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {
  }
  // auth guards the admin panel from unauthorised users
  canActivate() {
    if (!this.auth.isLoggedIn() || this.auth.getUserDetails().username !== 'admin') {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;

  }

}
