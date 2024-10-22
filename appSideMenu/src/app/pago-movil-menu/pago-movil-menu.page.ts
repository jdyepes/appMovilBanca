import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../../constantes/prefijo-opciones';

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
  subscription: any;

  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;
 
  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
                this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
                this.operacionPAT = this.rutaActiva.snapshot.params.operacionPAT;
                this.operacionPAC = this.rutaActiva.snapshot.params.operacionPAC;
                this.opcionPagoMovil = this.operacionPAT;
                // this.initializeBackButton();
              }

    opcionesPagoMovil: any[] = [
      {
        id: 1,
        name: '',  // PAT 
      },
      {
        id: 2,
        name: '', // PAC
      }
    ];

    ionViewDidEnter() {
      this.initializeBackButton();
    }

      // deshabilita el boton regresar antes de salir de la pag
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    // evento cuando se presiona el boton de regresar en el telefono
    initializeBackButton() {
      this.subscription = this.platform.backButton.subscribeWithPriority(999999, () => {
        this.regresar();
      });
    }

  ngOnInit() {
    // this.initializeBackButton();
    this.opcionesPagoMovil[0].name = this.operacionPAT;
    this.opcionesPagoMovil[1].name = this.operacionPAC;
  }

    abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('pago-movil/'+ this.numeroDestino + '/' + this.operacionPAT + '/' + this.operacionPAC + '/' + this.opcionPagoMovil);
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('confirmar-pago-movil/' + this.numeroDestino + '/' + this.operacionPAT + '/' + this.operacionPAC + '/' + this.opcionPagoMovil);
    }
  }

  regresar() {
    this.navCtrl.navigateBack('home/' + this.numeroDestino);
   }
}
