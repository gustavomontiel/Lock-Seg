import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { InappBrowserOptionService } from '../services/inapp-browser-option.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  tel: string = 'tel:+543764433870'

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private iab: InAppBrowser,
    public platform: Platform,
    public iabOptionService: InappBrowserOptionService,
    public router: Router
  ) { }

  public openWithInAppBrowser(url: string) {
    let target = "_blank";
    this.theInAppBrowser.create(url, target, this.options);
  }
  public openWithCordovaBrowser(url: string) {
    let target = "_self";
    this.theInAppBrowser.create(url, target, this.options);
  }

  ngOnInit() {
  }

  async abrirChat() {
    const { Device } = Plugins;
    let device = await Device.getInfo();

    const url = this.urlsService.getParametro('chat');
    
    if (device.platform === 'ios') {
      const browser = this.iab.create(url, '_system', this.iabOptionService.inappbrowserOption);
    } else {
      this.router.navigate(['/chat']);
    }


  }
}
