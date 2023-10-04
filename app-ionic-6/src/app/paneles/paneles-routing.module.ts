import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeitresPanelPage } from './deitres-panel/deitres-panel.page';
import { GarnetPanelComponent } from './garnet-panel/garnet-panel.component';
import { TitaniumPanelComponent } from './titanium-panel/titanium-panel.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'deitres/:account/:userCode', component: DeitresPanelPage },
      { path: 'garnet/:account/:userCode/:zonasDisp/:partiDisp', component: GarnetPanelComponent },
      { path: 'titanium/:account/:userCode/:zonasCable/:zonasInha/:partiDisp', component: TitaniumPanelComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelesRoutingModule {}
