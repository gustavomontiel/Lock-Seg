import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Device } from '@capacitor/device';
import { SignInWithApple as SignInWithAppleNgx, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { Router } from '@angular/router';

// var SignInWithApple: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showAppleSignIn = false;
  login: FormGroup;
  public mensaje: string;
  signInWithAppleAvailable = false;
  iosVersion: number;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private signInWithApple: SignInWithAppleNgx
  ) { }

  async ngOnInit() {
    this.crearForm();
    // Only show the Apple sign in button on iOS
    let device = await Device.getInfo();
    this.iosVersion = Number(device.osVersion.split('.')[0]);
    this.showAppleSignIn = device.platform === 'ios' && this.iosVersion > 12;
  }

  ionViewWillEnter() {
    this.obtenerEmail();
    if (this.authService.isAuthenticated()){
      this.router.navigate(["home"]);
    }
  }

  private crearForm() {
    this.login = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  private obtenerEmail() {
    this.storageService.get('EMAIL').then((datos) => {
      if (datos) {
        this.login.setValue({ usuario: datos, password: '' });
      }
    });
  }


  loginUsuario() {
    this.mensaje = '';
    this.authService.loginUsuario(
      this.login.get('usuario').value,
      this.login.get('password').value,
    ).subscribe(usuario => {
      this.login.setValue({ usuario: '', password: '' });
    },
      error => {
        console.log(JSON.stringify(error));
        
        let msg = error.error ? error.error.message : undefined;
        msg = typeof msg === 'string' ? msg : 'Error al intentar ingresar al sistema';
        this.mensaje = msg;
      });
  }

  openAppleSignIn() {
    this.mensaje = '';
    // const { SignInWithApple } = Plugins;
    /*
    SignInWithApple.Authorize()
      .then(async (res) => {
        if (res.response && res.response.identityToken) {
          
          this.loginEmail(res.response.email)
        } else {
          
          this.mensaje = JSON.stringify(res);
        }
      })
      .catch((error) => {
        let msg = error.error ? error.error.message : undefined;
        msg = typeof msg === 'string' ? msg : 'Error al intentar ingresar al sistema';
        this.mensaje = msg;
      });
      */
  }

  openAppleSignIn2() {
    
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
    .then((res: AppleSignInResponse) => {
      console.log('respuesta SignInWithApple.signin: ' + res);
    })
    .catch((error: AppleSignInErrorResponse) => {
      alert(error.code + ' ' + error.localizedDescription);
      console.error(error);
    });
  }

  loginEmail(email: string) {
    this.authService.loginEmail(email).subscribe(usuario => {
      this.login.setValue({ usuario: '', password: '' });
    },
      error => {
        
        this.mensaje = error.error.message || 'Error al intentar identificarse' ;
      });
  }

}
