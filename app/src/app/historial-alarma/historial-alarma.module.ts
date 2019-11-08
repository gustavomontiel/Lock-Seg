import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistorialAlarmaPage } from './historial-alarma.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialAlarmaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistorialAlarmaPage]
})
export class HistorialAlarmaPageModule {}
