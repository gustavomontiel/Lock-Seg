import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { PantallaCompletaRoutingModule } from "./pantalla-completa-routing.module";
import { PantallaCompletaPage } from "./pantalla-completa.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PantallaCompletaRoutingModule
  ],
  declarations: [PantallaCompletaPage]
})
export class PantallaCompletaModule {}
