import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.scss']
})
export class EliminarUsuarioComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  usuario: User;
  formUsuario: FormGroup;
  roleNames = ['administrador', 'administrativo', 'guardia', 'cliente'];

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

  eliminarUsuario() {

    Swal.fire({
      title: 'Eliminar registro?',
      text: 'Confirma la eliminación del registro?',
      type: 'question',
      showCancelButton: true,
    }).then((result) => {

      if (result.value) {
        const user = { ... this.formUsuario.value, id: this.usuario.id };
        console.log(user);

        this.authService.deleteUser(user).subscribe(
          resp => {

            Swal.fire({
              title: 'Eliminado!',
              text: 'El registro ha sido eliminado correctamente.',
              type: 'success',
              timer: 2000
            }).then( res => {
              const url = '/usuarios';
              this.router.navigate([url]);
            });

          },
          err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'No se pudo realizar la acción.',
              'error'
            );
          }
        );
      }
    });

  }

}
