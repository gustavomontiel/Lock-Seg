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
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
