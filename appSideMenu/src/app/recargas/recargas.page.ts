import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../../constantes/prefijo-opciones';

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.page.html',
  styleUrls: ['./recargas.page.scss'],
})
export class RecargasPage implements OnInit {

  numeroProveedor: number;
  prefijoTelefonia: string;
  prefijoDirectv: string;
  subscription: any;

  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;
 
  constructor(public navCtrl: NavController, private rutaActiva: ActivatedRoute, 
              private platform: Platform) {}

  ngOnInit() {
    this.numeroProveedor = this.rutaActiva.snapshot.params.numeroProveedor;
    this.prefijoTelefonia = this.rutaActiva.snapshot.params.operacionTel;
    this.prefijoDirectv = this.rutaActiva.snapshot.params.operacionDirectv;
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
      this.navCtrl.navigateForward('recarga-telefonica/' + this.numeroProveedor + '/' + this.prefijoTelefonia + '/' + this.prefijoDirectv);
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('recarga-directv/' + this.numeroProveedor + '/' + this.prefijoTelefonia + '/' + this.prefijoDirectv);
    }
  }

  regresar() {
    this.navCtrl.navigateBack('/home/' + this.numeroProveedor);
  }
}
