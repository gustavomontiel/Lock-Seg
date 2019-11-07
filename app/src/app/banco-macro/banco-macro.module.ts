import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BancoMacroPage } from './banco-macro.page';

const routes: Routes = [
  {
    path: '',
    component: BancoMacroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BancoMacroPage]
})
export class BancoMacroPageModule {}
