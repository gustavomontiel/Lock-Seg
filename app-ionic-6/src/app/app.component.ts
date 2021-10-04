import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    
    this.initializeApp();
  }

  async initializeApp() {
    
    this.platform.ready().then(async () => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {
        
        let ruta: string = this.activatedRoute.snapshot['_routerState'].url;
         
        ruta = ( ruta !== '' && !ruta.includes('login') && !!ruta ) ? ruta : 'home';

        state ? this.router.navigate([ruta]) : this.router.navigate(['login']);
        
      });

    });
  }
}
