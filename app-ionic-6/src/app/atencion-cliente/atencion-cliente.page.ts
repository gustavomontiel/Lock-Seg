import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-atencion-cliente',
  templateUrl: './atencion-cliente.page.html',
  styleUrls: ['./atencion-cliente.page.scss'],
})
export class AtencionClientePage implements OnInit {

  contacto: any;
  atencion: FormGroup;

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
    this.atencion = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        this.atencion.controls.email.setValue(userInfo.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const userInfo = typeof response === 'string' ? JSON.parse(response) : response;
        const body = { tipo: 'atencion', titulo: 'Solicitud de atenciónal cliente', descripcion: this.atencion.get('descripcion').value, user_id: userInfo.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            this.presentToast();
          });
      }
    });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su solicitud de atención al cliente.',
      duration: 48000,
      position: 'bottom',
      color:'danger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }

}
