import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BancoBbvaPage } from './banco-bbva.page';

const routes: Routes = [
  {
    path: '',
    component: BancoBbvaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BancoBbvaPage]
})
export class BancoBbvaPageModule {}
