import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading;
  peticiones = 0;

  constructor(
    public loadingController: LoadingController
  ) { }

  async present(msg = 'Procesando...') {
    this.peticiones++;
    if (this.peticiones === 1) {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        mode: 'ios',
        message: msg
      });
      this.loading.present();
    }
  }

  dismiss() {
    this.peticiones--;
    if (this.peticiones === 0) {
      this.loading.dismiss();
    } 
  }

}
