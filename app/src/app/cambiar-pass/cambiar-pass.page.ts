import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.page.html',
  styleUrls: ['./cambiar-pass.page.scss'],
})
export class CambiarPassPage implements OnInit {
  cambiarPass: FormGroup;
  public mensaje: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.crearForm();
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
    })  ;
  }

}
