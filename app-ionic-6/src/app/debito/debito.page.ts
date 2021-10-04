import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

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
    private storageService: StorageService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.debito = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        this.debito.controls.email.setValue(userInfo.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        const body = { tipo: 'debito', titulo: 'Solicitud de débito automático', descripcion: this.debito.get('descripcion').value, user_id: userInfo.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            this.presentToast();
          });
      }
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su solicitud de débito automático a la brevedad nos contactaremos con usted.',
      duration: 48000,
      position: 'bottom',
      color: 'danger',
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
