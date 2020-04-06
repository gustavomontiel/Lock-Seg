import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactoService } from '../../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-panico',
  templateUrl: './panico.page.html',
  styleUrls: ['./panico.page.scss'],
})
export class PanicoPage implements OnInit {
  contacto: any;

  constructor(
    public modalController: ModalController,
    private contactoService: ContactoService,
    private storage: Storage,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        //console.log(response.data.user.email);
        console.log('ingresa');
        var body = { "tipo": "panico", "titulo": "Botón de Panico", "descripcion": "Llamada urgente", "user_id": response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log("panico - lo hizo:" + contacto);
            this.presentToast();
            this.closeModal();
          });
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su pedido de ayuda. Estamos en camino.',
      duration: 48000,
      position: 'bottom',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: "OK"
    });
    toast.present();
  }


}
