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
    this.nroCli = 4565;
  }

  private getUrlChat() {
    const urlParametro = this.urlsService.getParametro('chat');
    this.urlChat = this.sanitizer.bypassSecurityTrustResourceUrl(urlParametro);
  }

}
