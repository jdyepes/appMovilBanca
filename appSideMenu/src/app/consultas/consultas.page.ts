import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { equal } from 'assert';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  constructor(public navCtrl: NavController) { }
  options: any[] = [
    {
      id: 1,
      name: 'a',
    },
    {
      id: 2,
      name: 'b',
    }
  ];

  ngOnInit() {
  }

  abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('consulta-saldo');
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('consulta-movimiento');
    }
    if (pagina === 3) {
      this.navCtrl.navigateForward('consulta-tarjeta-de-credito');
    }
  }

}
