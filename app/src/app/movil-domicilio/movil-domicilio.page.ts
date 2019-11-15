import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-movil-domicilio',
  templateUrl: './movil-domicilio.page.html',
  styleUrls: ['./movil-domicilio.page.scss'],
})

export class MovilDomicilioPage implements OnInit {
  contacto: any;
  movil: FormGroup;

  constructor(
    private contactoService: ContactoService,
    private sanitizer: DomSanitizer,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.movil = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        console.log(response.data.user.email);
        this.movil.controls.email.setValue(response.data.user.email);
      }
    });

  }

  private insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        // console.log(response.data.user.email);
        console.log('ingresa');
        var body = { 'tipo': 'movil', 'titulo': 'Solicitud de móvil', 'descripcion': this.movil.get('descripcion').value, 'user_id': response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log('aparentemente lo hizo:' + contacto);
          });
      }
    });
  }

}
