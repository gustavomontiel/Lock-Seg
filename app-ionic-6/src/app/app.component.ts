import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
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
    private navCtrl: NavController
  ) {

    this.initializeApp();
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (window.location.pathname === '/home') {
        // Salir de la aplicación si estamos en la página de inicio ('/home')
        navigator['app'].exitApp();
      } else {
        // Navegar hacia atrás si no estamos en la página de inicio
        this.navCtrl.pop();
      }
    });
  }

  async initializeApp() {

    this.platform.ready().then(async () => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authState.subscribe(state => {

        let ruta: string = this.activatedRoute.snapshot['_routerState'].url;

        ruta = ( ruta !== '' && !ruta.includes('login') && !!ruta ) ? ruta : 'home';

        state ? this.router.navigate([ruta], { replaceUrl: true }) : this.router.navigate(['login'], { skipLocationChange: true });

      });

    });
  }
}
