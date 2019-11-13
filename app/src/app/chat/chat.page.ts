import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../services/urls.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  urlChat: any;
  parametro: any;

  constructor(
    private urlsService: UrlsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getUrlChat();
  }

  private getUrlChat() {
    console.log('Chat');
    this.urlsService.getUrl('chat')
      .subscribe(parametro => {
        this.urlChat = this.sanitizer.bypassSecurityTrustResourceUrl(parametro.data.valor);
      });
  }


}
