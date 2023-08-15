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
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

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
  isActive: any

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
    public router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit() { this.isActiveUser(); }

  logoutUser() {
    this.authService.logout();
  }

  isActiveUser() {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const user_info = typeof response === 'string' ? JSON.parse(response) : response;

        const url = environment.APIEndpoint + "/active-status/" + user_info.data.user.id;
        this.http.get(url).subscribe(resp => {
          const respuesta = typeof resp === 'string' ? JSON.parse(resp) : resp;
          if (respuesta.activo === 1) {
            console.log('activo')
          } else {
            console.log('inactivo');
            this.logoutUser()
          }
        })
      }
    })
  }

  insertarContacto(account) {
    this.storageService.get('USER_INFO').then((response) => {
      if (response) {
        const user_info =typeof response === 'string' ? JSON.parse(response) : response;
        /* const { email, nombre, telefono } = user_info; */
        const msg = `Llamada urgente a ${account} ${user_info.data.user.nombre} ${user_info.data.user.email} ${user_info.data.user.telefono}`

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
    /* let msg = 'Está a punto de confimar el envío de una moto'; */
    let msg = '';
    let nombreCuenta = '';

    if (account) {
      nombreCuenta += account
        ? account.descripcion + ' (' +' Cuenta N°: '+ account.account +' Identificador: '+ account.identificador + ')'
        : '';

      /* msg += nombreCuenta ? ' a ' + nombreCuenta : ''; */

      const alert = await this.alertController.create({
        header: 'Pulsar',
        mode: 'md',
        cssClass: "panicAlert",
        message: msg,
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'boton1',
            handler: () => { },
          },
          {
            text: '',
            cssClass: 'boton2',
            handler: () => {
              this.insertarContacto(nombreCuenta);
            },

          },
        ],
      });
      await alert.present();

    }


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
    const browser = this.iab.create(this.url, target, this.iabOptionService.inappbrowserOption);
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
    const browser = this.iab.create(this.url, target, this.iabOptionService.inappbrowserOption);

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

    /* if (cuentas.length === 1) {
      this.deitresService.panelSeleccionado = cuentas[0];

      return cuentas[0];
    } */


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

      cuenta = cuentas.find(
        (item) => item.account === account
      );

      this.deitresService.panelSeleccionado = cuentas.find(
        (item) => item.account === account
      );

      return cuenta;
    }


  }

  async abrirPanelDeitres() {
    const account = await this.seleccionarCuenta();

    if (account) {
      this.router.navigate(['deitres-panel', account.account, account.identificador]);
    }
  }

  async presentToastSinCuenta() {
    const toast = await this.toastController.create({
      message: 'No tiene cuenta para realizar la acción.',
      duration: 10000,
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

  async verFacturas() {

    const { Device } = Plugins;
    let device = await Device.getInfo();

    const url = this.urlsService.getParametro('ver-facturas');
    // Si es ios se abre en el navegador del sistema operativo
    const target = (device.platform === 'ios') ? '_system' : '_blank';
    const browser = this.iab.create(url, target, this.iabOptionService.inappbrowserOption);

  }


}
