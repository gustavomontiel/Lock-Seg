import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';
import { PanicoPage } from '../modals/panico/panico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    SharedModule
  ],
  declarations: [HomePage, PanicoPage],
  entryComponents: [PanicoPage]
})
export class HomePageModule {}
