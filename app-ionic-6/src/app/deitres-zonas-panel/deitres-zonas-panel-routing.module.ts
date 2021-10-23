import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeitresZonasPanelPage } from './deitres-zonas-panel.page';

const routes: Routes = [
  {
    path: '',
    component: DeitresZonasPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeitresZonasPanelPageRoutingModule {}
