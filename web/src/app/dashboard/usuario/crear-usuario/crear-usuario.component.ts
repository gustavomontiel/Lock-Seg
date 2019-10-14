import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';


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
      rol: new FormControl(null, [Validators.required]),
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

        this.authService.crearUsuario( user ).subscribe(
          resp => {
            Swal.fire(
              'Guardado!',
              'Los datos fueron guardados correctamente.',
              'success'
            );
            const url = environment.APIEndpoint + '/users/' + resp.data.id;
            this.router.navigateByUrl(url);
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
