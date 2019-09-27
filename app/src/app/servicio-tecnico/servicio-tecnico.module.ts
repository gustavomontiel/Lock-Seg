import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicioTecnicoPage } from './servicio-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioTecnicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicioTecnicoPage]
})
export class ServicioTecnicoPageModule {}
