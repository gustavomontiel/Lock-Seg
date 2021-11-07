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
      console.log('this.loading = await this.loadingController.create');
      this.loading = await this.loadingController.create({
        cssClass: '',
        mode: 'ios',
        message: msg
      })
      this.loading.present();
    }
  }

  dismiss() {
    this.peticiones--;
    if (this.peticiones === 0) {
      if (this.loading) {
        this.loading.dismiss();
      } else {
        setTimeout(() => {
          this.loading.dismiss();
        }, 2500);
      }
    } 
  }

}
