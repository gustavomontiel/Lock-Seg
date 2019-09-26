import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: User;
  formUsuario: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    this.formUsuario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl(null, Validators.required),
      rol: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.cargarUsuario(id);
    });
  }

  cargarUsuario(id: string) {
    this.authService.getUsuarioId(id)
      .subscribe(usuario => {
        this.usuario = usuario.data;
        console.log(this.usuario);
        this.formUsuario.setValue({
          nombre: this.usuario.nombre,
          username: this.usuario.username,
          email: this.usuario.email,
          telefono: this.usuario.telefono,
          rol: this.usuario.roleNames[0],
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
        // this.authService.crearUsuario.subscribe(
        Swal.fire(
          'Guardado!',
          'Los cambios fueron guardados correctamente.',
          'success'
        );
      }
    });
    console.log('actualizar');
  }

  cambioRol(e) {
    console.log(e);
    console.log(this.formUsuario);
  }

}
