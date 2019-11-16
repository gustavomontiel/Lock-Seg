import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  public mensaje: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.login = new FormGroup({
      usuario: new FormControl('amazal@fibertel.com.ar', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  private loginUsuario() {
    console.log(this.login.value);
    this.authService.loginUsuario(
      this.login.get('usuario').value,
      this.login.get('password').value,
    ).subscribe(usuario => {
      console.log('usr:' + usuario);
    },
    error => {
      console.log('error en page:', error.error);
      this.mensaje = error.error.message;
    })  ;
  }
}
