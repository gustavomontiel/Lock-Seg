import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  urlChat: any;
  parametro: any;
  nroCli: any;
  elemento: any;
  mio: any;

  
  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    private theInAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.getUrlChat();
  }

  /*ngAfterViewChecked() {
    this.putNroCli();
  }*/

  private putNroCli(mio) {
    /*
    console.log('mio'+mio);
    this.nroCli = 4565;
    this.elemento = document.getElementById('prechat0Field');
    console.log(this.elemento);
    document.getElementById('prechat0Field').nodeValue = '55';
*/
  }
  private getUrlChat() {
    console.log('Chat');
    this.urlsService.getUrl('chat')
      .subscribe(parametro => {
        this.urlChat = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
        
      });
  }


}
