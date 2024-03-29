import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ContactoService } from '../services/contacto.service';
import { AuthService } from '../services/auth.service';
import { UrlsService } from '../services/urls.service';
import { Platform } from '@ionic/angular';
import { InappBrowserOptionService } from '../services/inapp-browser-option.service';
import { StorageService } from '../services/storage.service';
import { DeitresService } from '../services/deitres.service';
import { actionSheetController } from '@ionic/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

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
    private storageService: StorageService,
    public toastController: ToastController,
    public alertController: AlertController,
    private urlsService: UrlsService,
    public loadingController: LoadingController,
    private iab: InAppBrowser,
    public platform: Platform,
    public iabOptionService: InappBrowserOptionService,
    private deitresService: DeitresService,
    public router: Router
  ) {}

  ngOnInit() {}

  logoutUser() {
    this.authService.logout();
  }

  insertarContacto(account) {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const user_info =
          typeof response === 'string' ? JSON.parse(response) : response;

          const { email, nombre, telefono } = user_info;
        const msg = `Llamada urgente ${account} ${nombre} ${email} ${telefono}`

        const body = {
          tipo: 'panico',
          titulo: 'Botón de Panico',
          descripcion: msg,
          user_id: user_info.data.user.id,
        };

        this.contactoService.insertarContacto(body).subscribe((contacto) => {
          this.presentToast();
        });
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hemos recibido su pedido de ayuda. Estamos en camino.',
      duration: 30000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const account = await this.seleccionarCuenta(false);

    let msg = 'Está a punto de confimar el envío de una moto';
    let nombreCuenta = '';

    if (account) {
      nombreCuenta += account
        ? account.descripcion + ' (' + account.account + ')'
        : '';
      msg += nombreCuenta ? ' a ' + nombreCuenta : '';
    }

    const alert = await this.alertController.create({
      header: 'Botón de pánico',
      message: msg,
      cssClass: 'alertConfirmacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            this.insertarContacto(nombreCuenta);
          },
        },
      ],
    });

    await alert.present();
  }

  async verAlarma() {
    const { Device } = Plugins;
    let device = await Device.getInfo();

    this.url = this.urlsService.getParametro('historial');
    // const browser = this.iab.create(
    //   this.url,
    //   '_blank',
    //   this.iabOptionService.inappbrowserOption
    // );

    const target = (device.platform === 'ios') ? '_system' : '_blank';
    const browser = this.iab.create( this.url, target, this.iabOptionService.inappbrowserOption );
  }

  async verGps() {

    const { Device } = Plugins;
    let device = await Device.getInfo();
    
    this.url = this.urlsService.getParametro('gps');
    // const browser = this.iab.create(
    //   this.url,
    //   '_blank',
    //   this.iabOptionService.inappbrowserOption
    // );
    const target = (device.platform === 'ios') ? '_system' : '_blank';
    const browser = this.iab.create( this.url, target, this.iabOptionService.inappbrowserOption );

  }

  async seleccionarCuenta(soloPanel = false) {
    this.deitresService.panelSeleccionado = {};
    this.deitresService.getToken();
    let cuenta;
    let cuentas: any[] = await this.authService.getCuentasPanel().toPromise();

    if (soloPanel) {
      cuentas = cuentas.filter((item) => item.marca == 1);
    }

    if (cuentas.length < 1 || !cuentas) {
      soloPanel && this.presentToastSinCuenta();
      return cuenta;
    }

    if (cuentas.length === 1) {
      this.deitresService.panelSeleccionado = cuentas[0].account;
      return cuentas[0].account;
    }

    const buttons = [];
    cuentas.forEach((item) => {
      buttons.push({
        text: item.descripcion,
        role: item.account,
        cssClass: 'actionSel',
      });
    });
    buttons.push({ text: 'Cancelar', role: 'cancel', cssClass: 'cancel' });

    const actionSheet = await actionSheetController.create({
      mode: 'ios',
      header: 'Seleccione una cuenta:',
      buttons: buttons,
    });
    actionSheet.present();

    const { role: account } = await actionSheet.onDidDismiss();
    if (account !== 'cancel') {
      cuenta = account;
      this.deitresService.panelSeleccionado = cuentas.find(
        (item) => item.account == account
      );
    }
    return cuenta;
  }

  async abrirPanelDeitres() {
    const account = await this.seleccionarCuenta(true);
    if (account) {
      this.router.navigate(['deitres-panel', account, '01']);
    }
  }

  async presentToastSinCuenta() {
    const toast = await this.toastController.create({
      message: 'No tiene cuenta para realizar la acción.',
      duration: 30000,
      position: 'bottom',
      color: 'danger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
        },
      ],
    });

    toast.present();
  }
}
