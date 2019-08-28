import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, NavController } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../constantes/prefijo-opciones';

@Component({
  selector: 'app-recarga-telefonica',
  templateUrl: './recarga-telefonica.page.html',
  styleUrls: ['./recarga-telefonica.page.scss'],
})
export class RecargaTelefonicaPage implements OnInit {

  prefijoAccion: string;
  operadoraSeleccion: any;
  telefonoSeleccion: string;
  tipoCuentaOrigen: any;
  correlativoOrigen: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;
  recargasMenu: string;
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
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacionTel;
    this.operacion = 'RECARGA TELEFONICA';
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    // regreso a la pag anterior
    this.recargasMenu = 'recargas/' + this.numeroDestino + '/' + this.prefijoAccion + '/RD';
  }

  accounts: any[] = [
    {
      id: 1,
      name: 'Corriente',
      shortCode: 'c',
    },
    {
      id: 2,
      name: 'Ahorro',
      shortCode: 'a',
    }
  ];

  // correlativos
  options: number[] = [1, 2, 3, 4, 5, 6];

  operadoras: any[] = [
    {
      id: 1,
      company: 'Digitel',
      number: '0412',
    },
    {
      id: 2,
      company: 'Movistar',
      number: '0414',
    },
    {
      id: 3,
      company: 'Movistar',
      number: '0424',
    },
    {
      id: 4,
      company: 'Movilnet',
      number: '0416',
    },
    {
      id: 5,
      company: 'Movilnet',
      number: '0426',
    }
  ];

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

  // alertBox
  async realizarPago() {
   if (this.validarCampos()) {
    let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
          ' con los siguientes datos: ' + '<BR>' +
          '<b>Teléfono: </b>' + (this.operadoraSeleccion).number + this.telefonoSeleccion + '<BR>' +
          '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' +
          '<b>Cuenta a debitar: </b>' + (this.tipoCuentaOrigen).name + ' ' + this.correlativoOrigen ,

        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              //no
              console.log('entro en no');
            }
          },
          {
            text: 'OK',
            handler: () => {
              if ( (this.operadoraSeleccion).company === 'Digitel') {
                this.prefijoAccion = this.prefijoAccion + 'D';
              }
              if ((this.operadoraSeleccion).company === 'Movistar') {
                this.prefijoAccion = this.prefijoAccion + 'M';
              }
              if ((this.operadoraSeleccion).company === 'Movilnet') {
                this.prefijoAccion = this.prefijoAccion + 'O';
              }
              // tslint:disable-next-line:max-line-length
              this.mensajeEnviar = this.prefijoAccion + ' ' + (this.operadoraSeleccion).number + this.telefonoSeleccion + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + (this.tipoCuentaOrigen).shortCode + this.correlativoOrigen;
              console.log('mensaje a enviar: ' + this.mensajeEnviar);
              this.sendSMS(this.mensajeEnviar);
              this.prefijoAccion = this.rutaActiva.snapshot.params.operacionTel;
            }
          }
        ]
      });
      await alert.present();
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

  validarCampos(): boolean {
    let numberPattern = new RegExp(/^\d*$/);
    let telPattern = new RegExp(/^[0-9]{7}$/);
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente.');
      return false;
    } else
    if (this.operadoraSeleccion === undefined) {
        this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique la operadora.');
        return false;
    } else
    if (this.telefonoSeleccion === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número de teléfono.');
      return false;
    } else
    if (!telPattern.test(this.telefonoSeleccion)) {
      this.mostrarError('Teléfono inválido');
      return false;
    } else
    if (this.montoEntero === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el monto a recargar.');
      this.montoEntero = undefined;
      return false;
    } else
    if (this.montoDecimal === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique los dos decimales.');
      this.montoDecimal = undefined;
      return false;
    } else
    if (!numberPattern.test(this.montoEntero) || !numberPattern.test(this.montoDecimal)) {
      this.mostrarError('Ha ingresado un monto inválido');
      return false;
    } else
    if (this.tipoCuentaOrigen === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione la cuenta origen.');
      this.tipoCuentaOrigen = undefined;
      return false;
    } else
    if (this.correlativoOrigen === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el correlativo de origen.');
      this.correlativoOrigen = undefined;
      return false;
    } else {
      return true;
    }
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
      this.navCtrl.navigateForward('recarga-telefonica/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack(this.recargasMenu);
  }
}
