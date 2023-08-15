import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PantallaCompletaPage } from "./pantalla-completa.page";

// /:account/:userCode
const routes: Routes = [
  {
    path: ':promoID',
    component: PantallaCompletaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaCompletaRoutingModule {}
