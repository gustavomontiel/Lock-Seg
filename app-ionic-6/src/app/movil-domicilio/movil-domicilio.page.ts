import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

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
    private storageService: StorageService,
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
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        this.movil.controls.email.setValue(userInfo.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        const body = { tipo: 'movil', titulo: 'Solicitud de móvil', descripcion: this.movil.get('descripcion').value, user_id: userInfo.data.user.id };
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
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    toast.present();
  }

}
