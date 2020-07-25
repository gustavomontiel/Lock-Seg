import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
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
        this.movil.controls.email.setValue(response.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        // tslint:disable-next-line: max-line-length
        const body = { tipo: 'movil', titulo: 'Solicitud de móvil', descripcion: this.movil.get('descripcion').value, user_id: response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            this.presentToast();
          });
      }
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su solicitud de un móvil a domicilio.',
      duration: 48000,
      position: 'bottom',
      color:'danger',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

}
