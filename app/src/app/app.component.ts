import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {
        // tslint:disable-next-line: no-unused-expression
        // console.log(this.activatedRoute.snapshot);
        
        let ruta = this.activatedRoute.snapshot['_routerState'].url 
        console.log('ruta', ruta);
        ruta = ( ruta != '' && !!ruta ) ? ruta : 'home';
        state ? this.router.navigate([ruta]) : this.router.navigate(['login']);
      });

    });
  }
}
