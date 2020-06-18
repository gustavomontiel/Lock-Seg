import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { ThemeableBrowser, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { optionsThemeable } from '../shared/optionsThemeable';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {

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

  urlGPS: any;
  parametro: any;
  loading: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    public loadingController: LoadingController,
    private themeableBrowser: ThemeableBrowser,
  ) { }
  
  ngOnInit() {
    this.getUrlHistorial();
  }




  private async getUrlHistorial() {
    this.urlGPS = this.urlsService.getParametro('gps');
    optionsThemeable.title.staticText = 'GPS';
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.urlGPS, '_blank', optionsThemeable);
  }

}
