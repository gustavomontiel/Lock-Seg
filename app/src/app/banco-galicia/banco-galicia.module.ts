import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BancoGaliciaPage } from './banco-galicia.page';

const routes: Routes = [
  {
    path: '',
    component: BancoGaliciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BancoGaliciaPage]
})
export class BancoGaliciaPageModule {}
