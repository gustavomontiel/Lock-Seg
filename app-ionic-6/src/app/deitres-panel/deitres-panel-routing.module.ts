import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeitresPanelPage } from './deitres-panel.page';
// /:account/:userCode
const routes: Routes = [
  {
    path: ':account/:userCode',
    component: DeitresPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeitresPanelPageRoutingModule {}
