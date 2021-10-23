import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deitres-zonas-panel',
  templateUrl: './deitres-zonas-panel.page.html',
  styleUrls: ['./deitres-zonas-panel.page.scss'],
})
export class DeitresZonasPanelPage implements OnInit {

  data: any;

  constructor() {}

  ngOnInit() {}
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }


}
