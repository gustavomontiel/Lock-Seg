import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeitresZonasPanelPageRoutingModule } from './deitres-zonas-panel-routing.module';

import { DeitresZonasPanelPage } from './deitres-zonas-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeitresZonasPanelPageRoutingModule
  ],
  declarations: [DeitresZonasPanelPage]
})
export class DeitresZonasPanelPageModule {}
