import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OprerarAlarmaPage } from './oprerar-alarma.page';

const routes: Routes = [
  {
    path: '',
    component: OprerarAlarmaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OprerarAlarmaPage]
})
export class OprerarAlarmaPageModule {}
