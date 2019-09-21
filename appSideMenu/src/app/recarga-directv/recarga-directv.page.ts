import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../../constantes/prefijo-opciones';

@Component({
  selector: 'app-recarga-directv',
  templateUrl: './recarga-directv.page.html',
  styleUrls: ['./recarga-directv.page.scss'],
})
export class RecargaDirectvPage implements OnInit {

  prefijoAccion: string;
  servicioSeleccion: any;
  numeroClienteContrato: string;
  tipoCuentaOrigen: any;
  correlativoOrigen: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mostrar: boolean;
  prepago: boolean;
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
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacionDirectv;
    this.operacion = 'RECARGA DIRECTV';    
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    // regreso a la pag anterior
    this.recargasMenu = 'recargas/' + this.numeroDestino + '/RT/' + this.prefijoAccion;
    this.servicioSeleccion = 'Prepago';
    this.prepago = true;
    this.montoDecimal === undefined ? this.montoDecimal = '00' : this.montoDecimal ;
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

  // tipo de servicios Directv
  servicios: any[] = [
    {
      id: 1,
      name: '',
    }/*,
   {
      id: 2,
      name: 'Previo Pago',
    }*/
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
    this.servicios[0].id = 1;
    this.servicios[0].name = 'Prepago';
  }

  validarCampos(): boolean {
    let numberPattern = new RegExp(/^\d*$/);
    let prepagoPattern = new RegExp(/^[0-9]{12}$/);    // se quita opcion previo pago el miercoles 4 sep
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente');
      return false;
    } else
    if (this.numeroClienteContrato === undefined || this.numeroClienteContrato === '') {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número de tarjeta.');
      this.numeroClienteContrato = undefined;
      return false;
    } else
      if (!prepagoPattern.test(this.numeroClienteContrato)) {
      this.mostrarError('Número de Tarjeta inválido. Ingrese un total de doce dígitos');
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

  //alertBox
  async realizarPago() {
    if (this.validarCampos()) {
      let auxAccounts = this.tipoCuentaOrigen; // recibe la cuenta origen en objeto
      let auxServicios = this.servicioSeleccion;
      let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
          ' con los siguientes datos: ' + '<BR>' +
          '<b>Servicio: </b>' + auxServicios  + '<BR>' +
          '<b>Nro Cliente/Contrato: </b>' + this.numeroClienteContrato + '<BR>' +
          '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' +
          '<b>Cuenta a debitar: </b>' + auxAccounts.name + ' ' + this.correlativoOrigen,

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
              if (auxServicios === 'Prepago') { //Prepago
                this.prefijoAccion = this.prefijoAccion + 'D';
              }
              // se quito opcion previo pago mier 4 sep   
              // tslint:disable-next-line:max-line-length
              this.mensajeEnviar = this.prefijoAccion + ' ' + this.numeroClienteContrato + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + auxAccounts.shortCode + this.correlativoOrigen;
              console.log('mensaje a enviar: ' + this.mensajeEnviar);
              this.sendSMS(this.mensajeEnviar);
            }
          }
        ]
      });
      await alert.present();
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.navCtrl.pop();
    this.navCtrl.navigateBack('spinner');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.pop();
      this.navCtrl.navigateForward('recarga-directv/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack(this.recargasMenu);
  }
}
