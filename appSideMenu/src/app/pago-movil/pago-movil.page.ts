import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, NavController } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.page.html',
  styleUrls: ['./pago-movil.page.scss'],
})
export class PagoMovilPage implements OnInit {

  parametroPAT: string;
  parametroPAC: string;
  prefijoAccion: string;
  bancoSeleccion: any;
  operadoraSeleccion: string;
  telefonoSeleccion: string;
  tipoIdentificacion: string;
  numeroCedula: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;
  pagoMovilMenu: string; // pagina anterior
  subscription: any;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private sms: SMS, private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
    this.parametroPAT = this.rutaActiva.snapshot.params.operacionPAT; // paramtros para el ->
    this.parametroPAC = this.rutaActiva.snapshot.params.operacionPAC; // regreso a la pagina anterior
    this.prefijoAccion = this.rutaActiva.snapshot.params.valorSeleccion; // valor seleccionado por el usuario (PAT por defecto)   
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    this.operacion = 'PAGO';
  }

  banks: any[] = [
    {
      id: 1,
      name: 'Mercantil',
      code: '0105',
    },
    {
      id: 2,
      name: 'Provincial',
      code: '0108',
    },
    {
      id: 3,
      name: 'Banesco',
      code: '0134',
    },
    {
      id: 4,
      name: 'BFC Banco Fondo Común',
      code: '0151',
    },
    {
      id: 5,
      name: 'Mi Banco',
      code: '0169',
    },
    {
      id: 6,
      name: 'Banca amiga',
      code: '0172',
    },
    {
      id: 7,
      name: 'BNC Banco Nacional de Crédito',
      code: '0191',
    },
    {
      id: 8,
      name: 'Banfanb',
      code: '0177',
    },
    {
      id: 9,
      name: 'Occidental de Descuento',
      code: '0116',
    },
    {
      id: 10,
      name: 'Venezolano de Crédito',
      code: '0104',
    },
    {
      id: 11,
      name: '100% Banco',
      code: '0156',
    },
    {
      id: 12,
      name: 'Del Sur',
      code: '0157',
    },
    {
      id: 13,
      name: 'Bicentenario del Pueblo',
      code: '0175',
    },
    {
      id: 14,
      name: 'Del Tesoro',
      code: '0163',
    },
    {
      id: 15,
      name: 'Banco Caroní',
      code: '0128',
    },
    {
      id: 16,
      name: 'Banco de Venezuela S.A.C.A.',
      code: '0102',
    },
    {
      id: 17,
      name: 'Banplus',
      code: '0174',
    },
    {
      id: 18,
      name: 'Banco del Caribe',
      code: '0114',
    },
    {
      id: 19,
      name: 'Exterior',
      code: '0115',
    },
    {
      id: 20,
      name: 'Banco Agrícola de Venezuela',
      code: '0166',
    },
    {
      id: 21,
      name: 'Banco Activo',
      code: '0171',
    },
    {
      id: 22,
      name: 'Banco Plaza',
      code: '0138',
    },
    {
      id: 23,
      name: 'BANCRECER',
      code: '0168',
    }
  ];

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

  tipos: any[] = [
    {
      id: 1,
      type: 'V', 
    },
    {
      id: 2,
      type: 'E',     
    },
    {
      id: 3,
      type: 'P',
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
    this.pagoMovilMenu = 'pago-movil-menu/' + this.numeroDestino + '/' + this.parametroPAT + '/' + this.parametroPAC; // pagina anterior
    this.initializeBackButton();
  }

// muestra los mensajes de los campos si estan errados
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

  //alertBox
 async realizarPago(){
  if(this.validarCampos()) {
    let alert = await this.alertCtrl.create({
      header: 'Alerta',  
      message: 'Confirma que desea realizar un ' + '<b>' + this.operacion + '</b>' +
      ' con los siguientes datos: ' + '<BR>' +
      '<b>Operacion: </b>' + this.prefijoAccion + '<BR>' +
      '<b>Banco: </b>' + (this.bancoSeleccion).code + ' | ' + (this.bancoSeleccion).name + '<BR>' +
      '<b>Teléfono: </b>' + this.operadoraSeleccion + this.telefonoSeleccion + '<BR>' +
      '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' + 
      '<b>C.I.: </b>' + this.tipoIdentificacion + this.numeroCedula,

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
            this.mensajeEnviar = this.prefijoAccion + ' ' + (this.bancoSeleccion).code + ' ' + this.operadoraSeleccion + this.telefonoSeleccion + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + this.tipoIdentificacion + this.numeroCedula;
            console.log('mensaje a enviar: ' + this.mensajeEnviar);
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
    let telPattern = new RegExp(/^[0-9]{7}$/);
    let cedPattern = new RegExp(/^[0-9]{8}$/);
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente.');
      return false;
    } else
    if (this.bancoSeleccion === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el banco destino.');
      this.bancoSeleccion = undefined;
      return false;
    } else
    if (this.operadoraSeleccion === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione la operadora.');
      this.operadoraSeleccion = undefined;
      return false;
    } else
    if (this.telefonoSeleccion === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número telefónico.');
      this.telefonoSeleccion = undefined;
      return false;
    } else
    if (!telPattern.test(this.telefonoSeleccion)) {
      this.mostrarError('Teléfono inválido');
      return false;
    } else
    if (this.tipoIdentificacion === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el tipo de documentación.');
      this.tipoIdentificacion = undefined;
      return false;
    } else
    if (this.numeroCedula === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número de cédula.');
      this.numeroCedula = undefined;
      return false;
    } else
    if (!cedPattern.test(this.numeroCedula)) {
      this.mostrarError('Número de cédula inválido');
      return false;
    } else
    if (this.montoEntero === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el monto a transferir.');
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
      this.navCtrl.navigateForward('pago-movil/' + this.numeroDestino + '/' + this.parametroPAT + '/' + this.parametroPAC + '/' + this.prefijoAccion);
      event.target.complete ();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack(this.pagoMovilMenu);
  }
}
