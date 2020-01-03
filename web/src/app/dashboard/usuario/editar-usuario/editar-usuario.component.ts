import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { roleNames } from 'src/app/shared/guards/roleNames.data';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  usuario: User;
  formUsuario: FormGroup;
  roleNames = roleNames;

  formPassword: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) {
  }

  ngOnInit() {

    this.subscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

    this.formUsuario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      roleNames: new FormControl([], [Validators.required]),
      codigo_gestion: new FormControl('', Validators.required),
    });

    this.formPassword = new FormGroup({
      password: new FormControl(null, Validators.required),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarUsuario(id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cargarUsuario(id: string) {

    this.authService.getUsuarioId(id)
      .subscribe(usuario => {
        this.usuario = usuario.data;
        console.log(this.usuario);
        this.formUsuario.setValue({
          nombre: this.usuario.nombre,
          email: this.usuario.email,
          telefono: this.usuario.telefono,
          roleNames: this.usuario.roleNames ? this.usuario.roleNames : '',
          codigo_gestion: this.usuario.codigo_gestion
        });
      });

  }

  actualizarUsuario() {

    Swal.fire({
      title: 'Guardar cambios?',
      text: 'Confirma los cambios?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        this.usuario.password = this.formPassword.get('password').value;

        this.authService.updateUser( this.usuario ).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
          },
          error => {
            let msg = '';
            if (error instanceof HttpErrorResponse) {
              const validationErrors = error.error.data;
              if ( error.status === 422 || error.status === 400) {
                Object.keys(validationErrors).forEach(prop => {
                  const formControl = this.formUsuario.get(prop);
                  if (formControl) {
                    msg += '<br>' + validationErrors[prop];
                    formControl.setErrors({
                      serverError: validationErrors[prop]
                    });
                  }
                });
              }
            }

            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.' + msg,
              'error'
            );

          }
        );
      }
    });

  }

  actualizarPassword() {

    Swal.fire({
      title: 'Combiar contraseña?',
      text: 'Confirma el cambio de contraseña?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const user = { ... this.formUsuario.value, id: this.usuario.id };
        console.log(user);

        this.authService.updateUser( user ).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'La contraseña ha sido actualizada correctamente.',
              'success'
            );
          },
          error => {
            let msg = '';
            if (error instanceof HttpErrorResponse) {
              const validationErrors = error.error.data;
              if ( error.status === 422 || error.status === 400) {
                Object.keys(validationErrors).forEach(prop => {
                  const formControl = this.formUsuario.get(prop);
                  if (formControl) {
                    msg += '<br>' + validationErrors[prop];
                    formControl.setErrors({
                      serverError: validationErrors[prop]
                    });
                  }
                });
              }
            }

            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.' + msg,
              'error'
            );

          }
        );
      }
    });

  }

}
