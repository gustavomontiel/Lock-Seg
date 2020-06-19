import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { LoadingController } from '@ionic/angular';
import { optionsThemeable } from '../shared/optionsThemeable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  contacto: any;
  url: any;
  parametro: any;
  loading: any;

  constructor(
    private authService: AuthService,
    private contactoService: ContactoService,
    private storage: Storage,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
    private urlsService: UrlsService,
    private themeableBrowser: ThemeableBrowser,
    public loadingController: LoadingController,

  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logout();
  }

  insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        console.log('ingresa');
        const body = { tipo: 'panico', titulo: 'Botón de Panico', descripcion: 'Llamada urgente', user_id: response.data.user.id };
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log('panico - lo hizo:' + contacto);
            this.presentToast();
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
      closeButtonText: 'OK'
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Botón de pánico',
      message: 'Está a punto de confimar el envío de una moto a su domicilio',
      cssClass: 'alertConfirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            this.insertarContacto();
          }
        }
      ]
    });

    await alert.present();
  }

  verAlarma() {
    this.url = this.urlsService.getParametro('historial');
    optionsThemeable.title.staticText = 'Alarma';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.url, '_blank', optionsThemeable);
  }

  verGps() {
    this.url = this.urlsService.getParametro('gps');
    optionsThemeable.title.staticText = 'GPS';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.url, '_blank', optionsThemeable);
  }

}
