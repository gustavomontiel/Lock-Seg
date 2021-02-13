import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ContactoService } from '../services/contacto.service';
import { AuthService } from '../services/auth.service';
import { UrlsService } from '../services/urls.service';
import { Platform } from '@ionic/angular';
import { InappBrowserOptionService } from '../services/inapp-browser-option.service';


@Component( {
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
} )

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
    private urlsService: UrlsService,
    public loadingController: LoadingController,
    private iab: InAppBrowser,
    public platform: Platform,
    public iabOptionService: InappBrowserOptionService
  ) { }

  ngOnInit() {

  }

  logoutUser() {
    this.authService.logout();
  }

  insertarContacto() {
    this.storage.get( 'USER_INFO' ).then( ( response ) => {
      if ( response ) {
        const body = { tipo: 'panico', titulo: 'Botón de Panico', descripcion: 'Llamada urgente', user_id: response.data.user.id };
        this.contactoService.insertarContacto( body )
          .subscribe( contacto => {
            this.presentToast();
          } );
      }
    } );
  }

  async presentToast() {
    const toast = await this.toastController.create( {
      message: 'Hemos recibido su pedido de ayuda. Estamos en camino.',
      duration: 48000,
      position: 'bottom',
      color: 'danger',
      showCloseButton: true,
      closeButtonText: 'OK'
    } );
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create( {
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
    } );

    await alert.present();
  }

  verAlarma() {
    this.url = this.urlsService.getParametro( 'historial' );
    const browser = this.iab.create( this.url, '_blank', this.iabOptionService.inappbrowserOption );
  }

  verGps() {
    this.url = this.urlsService.getParametro( 'gps' );
    const browser = this.iab.create( this.url, '_blank', this.iabOptionService.inappbrowserOption );
  }

}
