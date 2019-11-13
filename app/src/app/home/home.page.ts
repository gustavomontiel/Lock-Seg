import { Component } from '@angular/core';
import { MiAlarmaPage } from '../mi-alarma/mi-alarma.page';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  miAlarma = MiAlarmaPage;

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

  contacto: any;

  constructor(
    private theInAppBrowser: InAppBrowser,
    private authService: AuthService,
    private contactoService: ContactoService,
    private sanitizer: DomSanitizer,
    private storage: Storage,
    ) {  }

  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.theInAppBrowser.create(url,target,this.options);
  }
  public openWithCordovaBrowser(url : string){
      let target = "_self";
      this.theInAppBrowser.create(url,target,this.options);
  } 

  logoutUser() {
    this.authService.logout();
  }

  private insertarContacto() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        //console.log(response.data.user.email);
        console.log('ingresa');
        var body = { "tipo": "panico", "titulo": "Botón de Panico", "descripcion": "yaaaaa",  "user_id": response.data.user.id};
        this.contactoService.insertarContacto(body)
          .subscribe(contacto => {
            console.log("panico - lo hizo:" + contacto);
          });
      }
    });
  }



}
