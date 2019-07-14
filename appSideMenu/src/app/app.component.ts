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
      title: 'Consultas',
      url: '/consultas',
      icon: 'search'
    },
    {
      title: 'Transferencias',
      url: '/transferencias',
      icon: '',
      src: '/assets/icon/transfer.svg'
    },
    {
      title: 'Pago Móvil',
      url: '/pago-movil-menu',
      icon: 'pago-movil-menu',
      src: '/assets/icon/metodo-de-pago.svg'
    },
    {
      title: 'Pagos de TDC',
      url: '/pago-tarjeta-de-credito',
      icon: 'card'
    },
    {
      title: 'Avance de Efectivo',
      url: '/avance-de-efectivo',
      icon: 'cash'
    },
    {
      title: 'Recargas',
      url: '/recargas',
      icon: 'bookmarks'
    },
    {
      title: 'Suspension de TDD',
      url: '/suspension-tarjeta-de-debito',
      icon: 'close-circle'
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
