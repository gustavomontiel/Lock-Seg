import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async presentToast(msg: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: msg,
      position: 'bottom',
      color: color,
      duration: 10000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel', // Define el rol como "cancel" para cerrar el Toast
        },
      ],
    });
    toast.present();
  }
}
