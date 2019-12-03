import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-debito',
  templateUrl: './debito.page.html',
  styleUrls: ['./debito.page.scss'],
})
export class DebitoPage implements OnInit {

  contacto: any;
  debito: FormGroup;

  constructor(
    private contactoService: ContactoService,
    private sanitizer: DomSanitizer,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.debito = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        console.log(response.data.user.email);
        this.debito.controls.email.setValue(response.data.user.email);
      }
    });

  }

  private insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        // console.log(response.data.user.email);
        console.log('ingresa debito');
        var body = { 'tipo': 'debito', 'titulo': 'Solicitud de débito automático', 'descripcion': this.debito.get('descripcion').value, 'user_id': response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log('aparentemente lo hizo:' + contacto);
          });
      }
    });
  }
}
