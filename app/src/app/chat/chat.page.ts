import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


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

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer,
    private theInAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() {
    this.getUrlChat();
  }

  private putNroCli() {
    console.log('putNroCli()');
    this.nroCli = 4565;
  }

  private getUrlChat() {
    console.log('Chat');
    this.urlsService.getUrl('chat')
      .subscribe(
        parametro => {

          this.urlChat = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
          /*
                  setTimeout(() => {

                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); 
                    Tawk_API.embedded='tawk_5ae8b0d9227d3d7edc24de5c';

                    Tawk_API.onLoad = function(){
                      Tawk_API.setAttributes({
                      'name' : 'gm',
                      'email': 'gm@email.com',
                      // gm@email.com y tawk_5ae8b0d9227d3d7edc24de5c
                      'hash' : '61acc5f98c5195e52654501c7fa13114873ea3267ac45d83057b11604a4dc89c' 
                      }, function (error) {});
                    };
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/5ae8b0d9227d3d7edc24de5c/1dr6qs44k';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);

                  }, 100);
          */

        }
      );
  }

}
