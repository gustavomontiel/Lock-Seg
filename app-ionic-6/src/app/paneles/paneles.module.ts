import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { PanelesRoutingModule } from './paneles-routing.module';
import { DeitresPanelPage } from './deitres-panel/deitres-panel.page';
import { TitaniumPanelComponent } from './titanium-panel/titanium-panel.component';
import { GarnetPanelComponent } from './garnet-panel/garnet-panel.component';



@NgModule({
  declarations: [
    DeitresPanelPage,
    TitaniumPanelComponent,
    GarnetPanelComponent
  ],
  imports: [
    PanelesRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
  ]
})
export class PanelesModule { }
