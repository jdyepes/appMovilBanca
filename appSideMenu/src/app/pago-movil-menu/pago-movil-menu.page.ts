import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pago-movil-menu',
  templateUrl: './pago-movil-menu.page.html',
  styleUrls: ['./pago-movil-menu.page.scss'],
})
export class PagoMovilMenuPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

    abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('pago-movil');
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('confirmar-pago-movil');
    }
  }
}
