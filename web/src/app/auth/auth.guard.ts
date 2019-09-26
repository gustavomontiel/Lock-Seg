import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private authService: AuthService,
    public router: Router
  ) {

  }

  canActivate() {
    if ( this.authService.isAuth() ) {
      console.log( 'PASO EL LoginGuard');
      return true;
    } else {
      console.log( 'Bloqueado por LoginGuard' );
      this.router.navigate(['/login']);
      return false;
    }
  }

}
