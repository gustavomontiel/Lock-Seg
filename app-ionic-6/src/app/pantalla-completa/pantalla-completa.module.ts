import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DeitresPanelPageRoutingModule } from "../deitres-panel/deitres-panel-routing.module";
import { SharedModule } from "../shared/shared.module";
import { PantallaCompletaRoutingModule } from "./pantalla-completa-routing.module";
import { PantallaCompletaPage } from "./pantalla-completa.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantallaCompletaRoutingModule,
    SharedModule
  ],
  declarations: [PantallaCompletaPage]
})
export class PantallaCompletaModule {}
