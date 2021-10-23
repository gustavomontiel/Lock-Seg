import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeitresService } from '../services/deitres.service';

@Component({
  selector: 'app-deitres-panel',
  templateUrl: './deitres-panel.page.html',
  styleUrls: ['./deitres-panel.page.scss'],
})
export class DeitresPanelPage implements OnInit {
  account: string;
  userCode: string;
  panel: any;
  zonas: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private deitresService: DeitresService
  ) {
    console.log('DeitresPanelPage');
    activatedRoute.params.subscribe((params) => {
      this.account = params.account;
      this.userCode = params.userCode;
      this.getPanelStatus();
      this.getZonas();
    });
  }

  ngOnInit() {}

  getPanelStatus() {
    if (this.account) {
      console.log('llama');
      this.deitresService
        .consultaPanel(this.account, this.userCode)
        .then((res) => {
          res.subscribe((res2) => {
            this.panel = res2;
            console.log('this.panel', this.panel);
          });
        });
    }
  }

  armarPanel() {
    if (this.account) {
      this.deitresService
        .armarPanel(this.account, this.userCode)
        .then((res) => {
          res.subscribe((res2) => {
            this.panel = res2;
            console.log('this.panel', this.panel);
          });
        });
    }
  }

  desarmarPanel() {
    if (this.account) {
      this.deitresService
        .desarmarPanel(this.account, this.userCode)
        .then((res) => {
          res.subscribe((res2) => {
            this.panel = res2;
            console.log('this.panel', this.panel);
          });
        });
    }
  }

  getZonas() {
    if (this.account) {
      console.log('llama getZonas');
      this.deitresService.consultaZonas(this.account)
      .then((res) => {
        res.subscribe(
          (res) => {
            if (res.success) {
              this.zonas = res.zones;
              console.log('this.zonas', this.zonas);
            } else {
              console.log('error al buscar zonas');
            }
          },
          (err) => {
            console.log(err);
          });
      });
      
    }
  }

  incluirZona(zoneID: string) {
    this.deitresService.incluirZona(this.account, zoneID).then((res) => {
      res.subscribe((res2) => {
        console.log('incluirZona', res2);
      });
    });
  }
  excluirZona(zoneID: string) {
    this.deitresService.excluirZona(this.account, zoneID).then((res) => {
      res.subscribe((res2) => {
        console.log('excluirZona', res2);
      });
    });
  }
}
