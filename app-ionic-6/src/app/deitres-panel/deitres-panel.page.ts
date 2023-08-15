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
    public deitresService: DeitresService
  ) {
    console.log('DeitresPanelPage');
    activatedRoute.params.subscribe((params) => {
      this.account = params.account;
      this.userCode = params.userCode;
      this.getPanelStatus();
    });
  }

  ngOnInit() {  }

  getPanelStatus() {
    console.log('getPanelStatus', this.deitresService.panelSeleccionado);

    if (this.account) {
      this.deitresService.consultaPanel(this.account, this.userCode)
        .then((res) => {
          console.log(res);
          res.subscribe((res2) => {
            console.log('this.panel getPanelStatus', res2);
            this.panel = res2;
            this.getZonas();
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
            console.log('this.panel armarPanel', res2);
            if (res2.armed) {
              this.getPanelStatus();
            }
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
            console.log('this.panel desarmarPanel', res2);
            if (!res2.armed) {
              this.getPanelStatus();
            }
          });
        });
    }
  }

  getZonas() {
    if (this.account) {
      this.deitresService.consultaZonas(this.account)
      .then((res) => {
        res.subscribe(
          (res) => {
            if (res.success) {
              console.log('getZonas', res);
              this.zonas = res.zones;
              this.setearIncluidos();
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

  setearIncluidos() {
    this.panel.excludedZones && this.panel.excludedZones.forEach( zoneID => {
      console.log(zoneID);

      const zona = this.zonas.find(x => x.zoneID === zoneID)
      zona && (zona.excluded = true);
    });
    console.log('setearIncluidos', this.zonas);
  }

  incluirZona(zoneID: string) {
    this.deitresService.incluirZona(this.account, zoneID).then((res) => {
      res.subscribe((res2) => {
        console.log('incluirZona', res2);
        if (!res2.excluded) {
          this.getPanelStatus();
        }
      });
    });
  }

  excluirZona(zoneID: string) {
    this.deitresService.excluirZona(this.account, zoneID).then((res) => {
      res.subscribe((res2) => {
        console.log('excluirZona', res2);
        if (res2.excluded) {
          this.getPanelStatus();
        }

      });
    });
  }
}
