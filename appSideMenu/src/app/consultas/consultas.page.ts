import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../../constantes/prefijo-opciones';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  numeroProveedor: number;
  prefijoSaldo: string;
  prefijoMovimiento: string;
  subscription: any;
  
  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;
 
  constructor(public navCtrl: NavController, private rutaActiva: ActivatedRoute, private platform: Platform) {
   // this.initializeBackButton();
  }

  ngOnInit() {
    this.numeroProveedor = this.rutaActiva.snapshot.params.numeroProveedor;
    this.prefijoSaldo = this.rutaActiva.snapshot.params.operacionSaldo;
    this.prefijoMovimiento = this.rutaActiva.snapshot.params.operacionMov;  
   // this.initializeBackButton();
  }

  // evento cuando se presiona el boton de regresar en el telefono
  initializeBackButton() {
    this.subscription = this.platform.backButton.subscribeWithPriority(999999, () => {
      this.regresar();
    });
  }

  ionViewDidEnter() {
    this.initializeBackButton();
  }
  // deshabilita el boton regresar antes de salir de la pag
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('consulta-saldo/' + this.numeroProveedor + '/' + this.prefijoSaldo + '/' + this.prefijoMovimiento);
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('consulta-movimiento/' + this.numeroProveedor + '/' + this.prefijoSaldo + '/' + this.prefijoMovimiento);
    }
    if (pagina === 3) {
      // tslint:disable-next-line:max-line-length
      this.navCtrl.navigateForward('consulta-tarjeta-de-credito/' + this.numeroProveedor + '/' + this.prefijoSaldo + '/' + this.prefijoMovimiento);
    }
  }

  regresar() {
   this.navCtrl.navigateBack('/home/' + this.numeroProveedor);
  }
}
