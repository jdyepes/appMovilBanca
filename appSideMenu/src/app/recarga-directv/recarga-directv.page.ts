import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';

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

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private sms: SMS, private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform)
  {
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacionDirectv;
    this.operacion = 'RECARGA DIRECTV';
    this.mostrar = false;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    // regreso a la pag anterior
    this.recargasMenu = 'recargas/' + this.numeroDestino + '/RT/' + this.prefijoAccion;
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
      name: 'Prepago',
    },
    {
      id: 2,
      name: 'Previo Pago',
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
    let numberPattern = new RegExp(/^\d*$/);
    let prepagoPattern = new RegExp(/^[0-9]{12}$/);
    let previoPagoPattern = new RegExp(/^([0-9]{5})|([0-9]{8})$/);
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente');
      return false;
    } else
    if (this.numeroClienteContrato === undefined || this.numeroClienteContrato === '') {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número.');
      this.numeroClienteContrato = undefined;
      return false;
    } else
      if (!prepagoPattern.test(this.numeroClienteContrato) && ((this.servicioSeleccion).id === 1)) {
      this.mostrarError('Número de Tarjeta inválido. Ingrese un total de doce dígitos');
      return false;
    } else
    if (!previoPagoPattern.test(this.numeroClienteContrato) && ((this.servicioSeleccion).id === 2)) {
      this.mostrarError('Número de Cliente inválido. Ingrese un mínimo de 5 y un máximo de 8 dígitos');
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

  // evento del seleccionarServicio
  mostrarContenido()
  {
    let aux = this.servicioSeleccion;
    aux.id === 1 ? this.prepago = true : false; // prepago
    aux.id === 2 ? this.prepago = false : true; // previo pago
    this.mostrar = true; // oculta o no el contenido
    this.numeroClienteContrato = '';
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacionDirectv;
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
          '<b>Servicio: </b>' + auxServicios.name  + '<BR>' +
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
              if (auxServicios.id === 1) {//Prepago
                this.prefijoAccion = this.prefijoAccion + 'D';
              }
              if (auxServicios.id === 2) {//Previo Pago
                this.prefijoAccion = this.prefijoAccion + 'P';
              }
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
