import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  usuario: User;
  formUsuario: FormGroup;

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
      roleNames: new FormControl('', [Validators.required]),
      codigo_gestion: new FormControl('', Validators.required),
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
          roleNames: this.usuario.roleNames[0] ? this.usuario.roleNames[0] : '',
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
        const user = { ... this.formUsuario.value, id: this.usuario.id };
        console.log(user);

        this.authService.updateUser( user ).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los cambios fueron guardados correctamente.',
              'success'
            );
          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Los cambios no fueron guardados.',
              'error'
            );
          }
        );
      }
    });

  }

  cambioRol(e) {
    console.log(e);
    console.log(this.formUsuario);
  }

}
