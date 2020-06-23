import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  public mensaje: string;
  dpass: string;

  constructor(
    private authService: AuthService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  ionViewWillEnter() {
    this.obtenerEmail();
  }

  private crearForm() {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  private obtenerEmail() {
    console.log(this.storage);
    this.storage.get('EMAIL').then((datos) => {
      if (datos) {
        //console.log('se supone email: '+datos);
        this.login.setValue({ usuario: datos, password: '' });
      }
    }); 
  }


  loginUsuario() {
    this.authService.loginUsuario(
      this.login.get('usuario').value,
      this.login.get('password').value,
    ).subscribe(usuario => {
      this.login.setValue({ usuario: '', password: '' });
      //console.log('usr:' + usuario);
    },
      error => {
        //console.log('error en page:', error.error);
        this.mensaje = error.error.message;
      });
  }
}
