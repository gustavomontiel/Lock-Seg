import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isAdmin()) {
      console.log('Pasó el RoleGuard por ser admin');
      return true;
    } else {

      const roles = this.authService.getRoles();
      const rolesPermitidos = route.data.rolesPermitidos ;

      if (roles) {
        if (rolesPermitidos) {

          const rolesEncontrados = roles.filter(rol => {
            return rolesPermitidos.includes(rol);
          });

          if ( rolesEncontrados.length > 0 ) {
            console.log('Pasó el RoleGuard por tener rol permitido');
            return true;
          } else {
            console.log('Bloqueado por RoleGuard, no tiene roles que le permitan el acceso');
            Swal.fire(
              'Error!',
              'Acceso denegado.',
              'error'
            );
            return false;
          }
        } else {
          console.log('Pasó el RoleGuard por no estar definido roles para la ruta');
          return true;
        }
      } else {
        console.log('Bloqueado por RoleGuard, no tiene roles o no esta logueado');
        Swal.fire(
          'Error!',
          'Acceso denegado.',
          'error'
        );
        this.router.navigate(['/login']);
        return false;
      }

    }

  }
}
