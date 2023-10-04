import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { TitaniumService } from 'src/app/services/titanium.service';

@Component({
  selector: 'app-titanium-panel',
  templateUrl: './titanium-panel.component.html',
  styleUrls: ['./titanium-panel.component.scss'],
})
export class TitaniumPanelComponent implements OnInit {

  numeroSistema: string;
  userCode: string;
  accessToken: any;
  currentStatus: any;
  zonasCable: any;
  zonasInha: any;
  partiDisp: any;
  seq: any;
  mostrarProblemas:boolean = false;
  mostrarAlarma:boolean = false;

  selectedPartition: any = 0;
  wirelessZonesStartsFrom: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    public titaniumService: TitaniumService,
    private loadingService: LoadingService,

  ) {
    console.log('TitaniumPanelComponent');
    activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.numeroSistema = params.account;
      this.userCode = params.userCode;
      this.zonasCable = params.zonasCable;
      this.zonasInha = params.zonasInha;
      this.partiDisp = params.partiDisp;
      this.getPanelStatus();
    });
    this.seq = 1;
    this.wirelessZonesStartsFrom = parseInt(this.titaniumService.getWirelessZonesIdStartsFrom());
  }

  ngOnInit() {  }

  seqCounter() {
    const i = this.seq++
    return i.toString().padStart(3, '0');
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.getPanelStatus();
      event.target.complete();
    }, 2000);
  }

  getPanelStatus() {
    /* console.log('getPanelStatus', this.deitresService.panelSeleccionado); */
    this.titaniumService.consultaPanel(this.numeroSistema, this.seqCounter())
      .then((res) => {
        console.log(res);
        res.subscribe((res2) => {
          this.currentStatus = res2;
          this.mostrarAlarma = false;
          this.showProblemas(res2);
          console.log(res2);
        });
      })
  }

  armarPanel() {
    if (this.numeroSistema) {
      this.titaniumService.armarPanel(this.numeroSistema, this.seqCounter(), this.userCode, (parseInt(this.selectedPartition)+1).toString())
        .then((res) => {
          res.subscribe((res2) => {
            this.currentStatus = this.titaniumService.descifrarEstado(res2)
          });
        })
    }
  }

  desarmarPanel() {
    if (this.numeroSistema) {
      this.titaniumService.desarmarPanel(this.numeroSistema, this.seqCounter(), this.userCode, (parseInt(this.selectedPartition)+1).toString())
        .then((res) => {
          res.subscribe((res2) => {
            this.currentStatus = this.titaniumService.descifrarEstado(res2)
          });
        })
    }
  }

  incluirZona(zoneID: string) {
    this.titaniumService.incluirZona(this.numeroSistema, zoneID, this.seqCounter())
      .then((res) => {
        res.subscribe((res2) => {
          console.log('incluirZona', res2);
          this.currentStatus = this.titaniumService.descifrarEstado(res2)
        });
      })
  }

  excluirZona(zoneID: string) {
    this.titaniumService.excluirZona(this.numeroSistema, zoneID, this.seqCounter())
      .then((res) => {
        res.subscribe((res2) => {
          console.log('excluirZona', res2);
          this.currentStatus = this.titaniumService.descifrarEstado(res2)
        });
      })
  }

  sumaArray(arr, inicio, fin) {
    let suma = 0;
    for (let i = inicio; i < fin; i++) {
      suma = suma + parseInt(arr[i]);
    }
    return suma;
  }

  showProblemas(estado : any){
    estado.regProblemas.forEach(problema => {
      if (problema == 1) {
        this.mostrarProblemas = true;
      }
    });

    estado.estadoParticiones.forEach(particion => {
      if (particion == 1) {
        estado.zonaAbierta.forEach(zona => {
          if (zona == 1) {
            this.mostrarAlarma = true;
          }
        });
      }
    });
  }


}
