import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthService
  ) { }

  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
