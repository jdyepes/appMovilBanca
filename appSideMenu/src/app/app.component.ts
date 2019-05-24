import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Consultas',
      url: '/consultas',
      icon: 'consultas'
    },
    {
      title: 'Transferencias',
      url: '/transferencias',
      icon: 'transferencia'
    },
    {
      title: 'Pago Móvil',
      url: '/pago-movil',
      icon: 'pago-movil'
    },
    {
      title: 'Pagos de TDC',
      url: '/pago-tarjeta-de-credito',
      icon: 'paaa'
    },
    {
      title: 'Avance de Efectivo',
      url: '/avance-de-efectivo',
      icon: 'cash'
    },
    {
      title: 'Recargas',
      url: '/recargas',
      icon: 'consultas'
    },
    {
      title: 'Suspension de TDD',
      url: '/suspension-tarjeta-de-debito',
      icon: 'consultas'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
