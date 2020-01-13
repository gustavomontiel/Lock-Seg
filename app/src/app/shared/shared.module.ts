import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Componentes
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        MenuComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MenuComponent
    ]
})
export class SharedModule { }
