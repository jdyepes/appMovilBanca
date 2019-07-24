import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  numeroProveedor: number;
  prefijoSaldo: string;
  prefijoMovimiento: string;

  constructor(public navCtrl: NavController, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.numeroProveedor = this.rutaActiva.snapshot.params.numeroProveedor;
    this.prefijoSaldo = this.rutaActiva.snapshot.params.operacionSaldo;
    this.prefijoMovimiento = this.rutaActiva.snapshot.params.operacionMov;
  }

  abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('consulta-saldo/' + this.numeroProveedor + '/' + this.prefijoSaldo);
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('consulta-movimiento/' + this.numeroProveedor + '/' + this.prefijoMovimiento);
    }
    if (pagina === 3) {
      this.navCtrl.navigateForward('consulta-tarjeta-de-credito/' + this.numeroProveedor + '/' + this.prefijoSaldo);
    }
  }

}
