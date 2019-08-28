import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../constantes/prefijo-opciones';

@Component({
  selector: 'app-avance-de-efectivo',
  templateUrl: './avance-de-efectivo.page.html',
  styleUrls: ['./avance-de-efectivo.page.scss'],
})
export class AvanceDeEfectivoPage implements OnInit {

  prefijoAccion: string;
  tarjetaOrigen: string;
  cuentaDestino: string;
  correlativoOrigen: string;
  correlativoDestino: string;
  cvvTarjeta: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;
  subscription: any;

  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;
 
  constructor(public alertCtrl: AlertController, private sms: SMS,
              private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
    this.operacion = 'AVANCE';
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacion;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
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
    }
  ];

  // correlativos
  options: number[] = [1, 2, 3, 4, 5, 6];

  cards: any[] = [
    {
      id: 1,
      name: 'Visa',
      shortCode: 'v',
    },
    {
      id: 2,
      name: 'Master',
      shortCode: 'm',
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

  // alertBox
  async realizarAvanceTDC() {
    if (this.validarCampos()) {
      let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Confirma que desea realizar un ' + '<b>' + this.operacion + '</b>' +
        ' con los siguientes datos: ' + '<BR>' +
        '<b>Tarjeta Origen: </b>' + this.tarjetaOrigen +' ' + this.correlativoOrigen + '<BR>' +
        '<b>CVV: </b>' + this.cvvTarjeta + '<BR>' +
        '<b>Cuenta Destino: </b>' + this.cuentaDestino + ' ' + this.correlativoDestino + '<BR>' +
        '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal,

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
              //si
              this.mensajeEnviar = this.prefijoAccion + ' ' + this.tarjetaOrigen + this.correlativoOrigen + ' ' + this.cuentaDestino + this.correlativoDestino + ' ' + this.cvvTarjeta + ' ' + this.montoEntero + ',' + this.montoDecimal;
              console.log('mensaje a enviar: ' + this.mensajeEnviar );
              this.sendSMS(this.mensajeEnviar);
            }
          }
        ]
      });
      await alert.present();
  }
}

  validarCampos(): boolean {
    let numberPattern = new RegExp(/^\d*$/);
    let numberCVVPattern = new RegExp(/^[0-9]{3}$/);
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente.');
      return false;
    } else
    if (this.tarjetaOrigen === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione tarjeta origen.');
      this.tarjetaOrigen = undefined;
      return false;
    } else
    if (this.correlativoOrigen === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el correlativo de origen.');
      this.correlativoOrigen = undefined;
      return false;
    } else
    if (this.cvvTarjeta === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el CVV de la Tarjeta.');
      this.cvvTarjeta = undefined;
      return false;
    } else
    if (!numberCVVPattern.test(this.cvvTarjeta)) {
      this.mostrarError('Número de CVV es de 3 dígitos');
      return false;
    } else
    if (!numberPattern.test(this.cvvTarjeta)) {
      this.mostrarError('Número de CVV inválido');
      return false;
    } else
    if (this.cuentaDestino === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione la cuenta destino.');
      this.cuentaDestino = undefined;
      return false;
    } else
    if (this.correlativoDestino === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el correlativo de destino.');
      this.correlativoDestino = undefined;
      return false;
    } else
    if (this.montoEntero === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el monto.');
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
    } else {
      return true;
    }
  }

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
      this.navCtrl.navigateForward('avance-de-efectivo/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack('home');
  }
}
