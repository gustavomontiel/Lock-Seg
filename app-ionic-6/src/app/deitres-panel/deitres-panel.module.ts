import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeitresPanelPageRoutingModule } from './deitres-panel-routing.module';

import { DeitresPanelPage } from './deitres-panel.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeitresPanelPageRoutingModule,
    SharedModule
  ],
  declarations: [DeitresPanelPage]
})
export class DeitresPanelPageModule {}
