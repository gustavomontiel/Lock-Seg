import { Component } from '@angular/core';
import { MiAlarmaPage } from '../mi-alarma/mi-alarma.page';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  miAlarma = MiAlarmaPage;

  options: InAppBrowserOptions = {
    location: 'no', // Or 'no'
    hidden: 'no', // Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes', // Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', // Android only
    closebuttoncaption: 'Close', // iOS only
    disallowoverscroll: 'no', // iOS only
    toolbar: 'yes', // iOS only
    enableViewportScale: 'no', // iOS only
    allowInlineMediaPlayback: 'no', // iOS only
    presentationstyle: 'pagesheet', // iOS only
    fullscreen: 'yes', // Windows only
  };

  contacto: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private authService: AuthService,
    private contactoService: ContactoService,
    private sanitizer: DomSanitizer,
    private storage: Storage,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  public openWithInAppBrowser(url: string) {
    const target = '_blank';
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    const target = '_self';
    this.theInAppBrowser.create(url, target, this.options);
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

}
