import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-movil-menu',
  templateUrl: './pago-movil-menu.page.html',
  styleUrls: ['./pago-movil-menu.page.scss'],
})
export class PagoMovilMenuPage implements OnInit {

  opcionPagoMovil: string;
  operacionPAT: string;
  operacionPAC: string;
  numeroDestino: string;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
                this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
                this.operacionPAT = this.rutaActiva.snapshot.params.operacionPAT;
                this.operacionPAC = this.rutaActiva.snapshot.params.operacionPAC;
            //  this.opcionPagoMovil ='PAT';
              }

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
