import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  canActivate() {

    if ( this.authService.isAdmin() ) {
      console.log( 'PASO EL AdminGuard');
      return true;
    } else {
      console.log( 'Bloqueado por AdminGuard' );
      this.router.navigate(['/login']);
      return false;
    }

  }
}
