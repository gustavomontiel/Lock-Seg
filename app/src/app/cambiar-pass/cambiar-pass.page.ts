import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.page.html',
  styleUrls: ['./cambiar-pass.page.scss'],
})
export class CambiarPassPage implements OnInit, OnDestroy {
  cambiarPass: FormGroup;
  public mensaje: string;

  inputPasswordType = 'password';
  passwordIcon = 'eye-off';
  inputNewPasswordType = 'password';
  newPasswordIcon = 'eye-off';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  ngOnDestroy() {
    this.inputPasswordType = 'password';
    this.passwordIcon = 'eye-off';
    this.inputNewPasswordType = 'password';
    this.newPasswordIcon = 'eye-off';
  }

  private crearForm() {
    this.cambiarPass = new FormGroup({
      password: new FormControl('', Validators.required),
      passwordDos: new FormControl('', Validators.required)
    });
  }

  private cambiarPassword() {
    console.log(this.cambiarPass.value);

    this.authService.cambiarPass(
      this.cambiarPass.get('password').value,
      this.cambiarPass.get('passwordDos').value,
    ).subscribe(usuario => {
      console.log('usr:' + usuario);
    },
      error => {
        console.log('error en page:', error.error);
        this.mensaje = error.error.message;
      });
  }

  public toggleInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  toggleInputNewPasswordType() {
    this.inputNewPasswordType = this.inputNewPasswordType === 'text' ? 'password' : 'text';
    this.newPasswordIcon = this.newPasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
