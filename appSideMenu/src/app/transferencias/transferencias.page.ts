import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../constantes/prefijo-opciones';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {

  prefijoAccion: string;
  tipoCuentaOrigen: string;
  tipoCuentaDestino: string;
  correlativoOrigen: string;
  correlativoDestino: string;
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
 

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController, private sms: SMS, private rutaActiva: ActivatedRoute, 
    private navCtrl: NavController, private platform: Platform) {
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacion;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    this.operacion = 'TRANSFERENCIA';
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

  //correlativos
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
 async transferirCuenta() {
   let flag = this.validarCampos();
   if (flag) {
    let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
        ' con los siguientes datos: ' + '<BR>' +
        '<b>Cuenta Origen: </b>' + this.tipoCuentaOrigen +' ' + this.correlativoOrigen + '<BR>' +
        '<b>Cuenta Destino: </b>' + this.tipoCuentaDestino + ' ' + this.correlativoDestino + '<BR>' +
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
              this.mensajeEnviar = this.prefijoAccion + ' ' + this.tipoCuentaOrigen + this.correlativoOrigen + ' ' + this.tipoCuentaDestino + this.correlativoDestino + ' ' + this.montoEntero + ',' + this.montoDecimal;
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

    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente.');
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
    } else
    if (this.tipoCuentaDestino === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione la cuenta destino.');
      this.tipoCuentaDestino = undefined;
      return false;
    } else
    if (this.correlativoDestino === undefined) {
      this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione el correlativo de destino.');
      this.correlativoDestino = undefined;
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
      this.navCtrl.navigateForward('transferencias/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);    
  }

  regresar() {
    this.navCtrl.navigateBack('/home/' + this.numeroDestino);
  }
}
