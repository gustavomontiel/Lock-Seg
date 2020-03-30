import { Component, OnInit } from '@angular/core';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {

  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  urlPagar: any;
  parametro: any;
  miURL: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer) {  }

  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithCordovaBrowser(url : string){
      let target = "_self";
      this.theInAppBrowser.create(url,target,this.options);
  } 

  ngOnInit() {
  }

  public traerURI(url: string) {
    
    console.log(url);
    this.urlsService.getUrl(url)
      .subscribe(parametro => {
        console.log(parametro);
        this.urlPagar = parametro.data.valor;
        console.log(this.urlPagar);
        /*let target = "_blank";
        //this.theInAppBrowser.create(this.urlPagar, target, this.options);*/
        this.openWithInAppBrowser(this.urlPagar);
      });

    
  }

}
