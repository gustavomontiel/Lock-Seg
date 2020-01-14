import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-servicio-tecnico',
  templateUrl: './servicio-tecnico.page.html',
  styleUrls: ['./servicio-tecnico.page.scss'],
})

export class ServicioTecnicoPage implements OnInit {

  contacto: any;
  servicio: FormGroup;

  constructor(
    private contactoService: ContactoService,
    private sanitizer: DomSanitizer,
    private storage: Storage,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.servicio = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        console.log(response);
        this.servicio.controls.email.setValue(response.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        // console.log(response.data.user.email);
        console.log('ingresa');
        var body = { 'tipo': 'servicio', 'titulo': 'Solicitud de servico técnico', 'descripcion': this.servicio.get('descripcion').value, 'user_id': response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log('servicio - lo hizo:' + contacto);
            this.presentToast();
          });
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su solicitud de servicio técnico.',
      duration: 48000,
      position: 'bottom',
      color:'danger',
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }


}
