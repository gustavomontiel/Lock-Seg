import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  public mensaje: string;
  correo: any;
  nada: string;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.storage.get('USER_INFO').then((datos) => {
      if(datos){
        console.log(datos);
        if (datos.data.user.email){
          //this.router.navigate(['home']);
          console.log(datos.data.user.email);
          this.login.setValue({usuario:datos.data.user.email,password:''});
        }
      } 
    });
  }

  loginUsuario() {
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
