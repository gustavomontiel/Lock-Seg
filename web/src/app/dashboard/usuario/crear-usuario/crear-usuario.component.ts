import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { roleNames } from 'src/app/shared/guards/roleNames.data';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  usuario: User;
  formUsuario: FormGroup;
  roleNames = roleNames;

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: Store<AppState>
  ) { }

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
      password: new FormControl('', Validators.required),
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  crearUsuario() {

    Swal.fire({
      title: 'Guardar datos?',
      text: 'Confirma los datos?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const user = { ... this.formUsuario.value };
        console.log(user);

        this.authService.crearUsuario(user).subscribe(
          resp => {

            Swal.fire({
              title: 'Guardado!',
              html: 'Los datos fueron guardados correctamente.',
              type: 'success',
              timer: 2000
            }).then(res => {
              const url = '/usuarios';
              this.router.navigate([url]);
            });
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
