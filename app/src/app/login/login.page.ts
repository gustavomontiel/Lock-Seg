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

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get('USER_INFO').then((datos) => {
      if(datos){
        if (datos.data.user.email){
          this.router.navigate(['home']);
        } 
      }//else {
        //this.crearForm();
     // }
    });
    
    this.crearForm();
  }

  private crearForm() {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
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
