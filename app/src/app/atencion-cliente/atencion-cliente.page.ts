import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

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
    private storage: Storage,
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
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        // console.log(response.data.user.email);
        this.atencion.controls.email.setValue(response.data.user.email);
      }
    });

  }

  insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        //console.log(response.data.user.email);
        console.log('ingresa');
        var body = { 'tipo': 'atencion', 'titulo': 'Solicitud de atenciónal cliente', 'descripcion': this.atencion.get('descripcion').value, 'user_id': response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log('atencion - lo hizo:' + contacto);
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
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }

}
