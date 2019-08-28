import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { SMS } from '@ionic-native/sms/ngx';
import { MENSAJE_SUBPAGINAS } from '../constantes/prefijo-opciones';


@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.page.html',
  styleUrls: ['./consulta-saldo.page.scss'],
})
export class ConsultaSaldoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;
  prefijoAccion: string;
  mensajeEnviar: string;
  numeroDestino: string;
  consultasMenu: string;
  subscription: any;

  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private sms: SMS, private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform)
  {
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacion;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    // regreso a la pag anterior
    this.consultasMenu = 'consultas/' + this.numeroDestino + '/' + this.prefijoAccion + '/M';
  }

  accounts: any[] = [
    {
      id: 1,
      name: 'Ahorro',
      shortCode: 'a',
    },
    {
      id: 2,
      name: 'Corriente',
      shortCode: 'c',
    },
    {
      id: 3,
      name: 'Prestamo',
      shortCode: 'p',
    }
  ];

  // correlativos
  options: number[] = [1, 2, 3, 4, 5, 6];

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
    this.initializeBackButton();
  }

  validarCampos(): boolean {
    let flag = false;
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente');
    } else
    if (this.tipoCuenta === undefined) {
      this.mostrarError('Campo no seleccionado. Seleccione una Cuenta');
    } else
    if (this.correlativoSelected === undefined) {
      this.mostrarError('Campo no seleccionado. Seleccione correlativo');
    } else {
      flag = true;
    }
    return flag;
  }
 async consultarSaldo() {
   if (this.validarCampos()) {
      this.mensajeEnviar = this.prefijoAccion + ' ' + this.tipoCuenta + this.correlativoSelected;
      console.log('mensaje a enviar: ' + this.mensajeEnviar);
      this.sendSMS(this.mensajeEnviar);
   }
  }

  // alertBox
  async mostrarError(mensaje: string) {

    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '<p>' + mensaje + '</p>',
      cssClass: 'alertColor',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  /// Envia el mensaje mostrando la mensajeria del telefono
  async sendSMS(mensaje: string) {
    // CONFIGURATION
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the native android SMS messaging
        //intent: '' // send SMS without opening any other app
      }
    };
    await this.sms.send(this.numeroDestino, mensaje, options);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.navCtrl.pop();
    this.navCtrl.navigateBack('spinner');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.pop();
      this.navCtrl.navigateForward('consulta-saldo/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete ();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack(this.consultasMenu);
  }
}
