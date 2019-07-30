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
  subscription: any;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
                this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
                this.operacionPAT = this.rutaActiva.snapshot.params.operacionPAT;
                this.operacionPAC = this.rutaActiva.snapshot.params.operacionPAC;
                this.opcionPagoMovil =this.operacionPAT;
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

    ngOnInit() {   
      this.opcionesPagoMovil[0].name = this.operacionPAT;
      this.opcionesPagoMovil[1].name = this.operacionPAC;
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

    seleccionPagoMovil() {     
      console.log(this.opcionPagoMovil);
    }

    abrirSiguientePag(pagina: number) {
    if (pagina === 1) {
      this.navCtrl.navigateForward('pago-movil/'+ this.numeroDestino + '/' + this.operacionPAT + '/' + this.operacionPAC + '/' + this.opcionPagoMovil);
    }
    if (pagina === 2) {
      this.navCtrl.navigateForward('confirmar-pago-movil');
    }
  }

  regresar() {
    this.navCtrl.navigateBack('/home');
   }
}
