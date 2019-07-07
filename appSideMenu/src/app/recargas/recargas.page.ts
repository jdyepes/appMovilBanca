import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.page.html',
  styleUrls: ['./recargas.page.scss'],
})
export class RecargasPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('recarga-telefonica');
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('recarga-directv');
    }
  }

}
