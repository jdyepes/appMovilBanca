import { Component, OnInit } from '@angular/core';

import { SMS } from '@ionic-native/sms/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MENSAJE_SUBPAGINAS } from '../constantes/prefijo-opciones';

@Component({
  selector: 'app-suspension-tarjeta-de-debito',
  templateUrl: './suspension-tarjeta-de-debito.page.html',
  styleUrls: ['./suspension-tarjeta-de-debito.page.scss'],
})
export class SuspensionTarjetaDeDebitoPage implements OnInit {

  prefijoAccion: string;
  mensajeEnviar: string;
  numeroDestino: string;
  tipoIdentificacion: string;
  numeroCedula: string;
  motivoSuspension: any;
  subscription: any;
  operacion: string;

  /** Mensajes pie de pagina */
  mensajeFooter1: string = MENSAJE_SUBPAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_SUBPAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_SUBPAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_SUBPAGINAS.mensajeFooter4;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private sms: SMS, private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform)
  {  }

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

  
  motivos: any[] = [
    {
      id: 1,
      name: 'Extravío',
    },
    {
      id: 2,
      name: 'Robo',
    },
    {
      id: 3,
      name: 'Deterioro',
    }
  ];

  ngOnInit() {
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacion;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
    this.operacion = 'SUSPENSIÓN DE TARJETA DE DÉBITO';
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
  async suspenderTarjeta() {
    if (this.validarCampos()) {
      let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
          ' con los siguientes datos: ' + '<BR>' +
          '<b>Cédula: </b>' + this.tipoIdentificacion + '-' + this.numeroCedula + '<BR>' +
          '<b>Motivo: </b>' + (this.motivoSuspension).name,
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
              this.mensajeEnviar = this.prefijoAccion + ' ' + this.tipoIdentificacion + this.numeroCedula + ' ' + (this.motivoSuspension).id;          
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
    let numberPattern = new RegExp(/^[0-9]{7,8}$/);
    if (this.prefijoAccion === undefined) {
      this.mostrarError('El prefijo no se pudo cargar. Intente nuevamente.');
      return false;
    } else
      if (this.tipoIdentificacion === undefined) {
        this.mostrarError('Campo requerido. ' + '<BR>' + 'Seleccione tipo de documento.');
        this.tipoIdentificacion = undefined;
        return false;
      } else
        if (this.numeroCedula === undefined) {
          this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el número de cédula.');
          this.numeroCedula = undefined;
          return false;
        } else
        if (!numberPattern.test(this.numeroCedula)) {
          this.mostrarError('Número de cédula inválido');
          return false;
        } 
        if (this.motivoSuspension === undefined) {
          this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique el motivo de ña suspensión.');
          this.motivoSuspension = undefined;
          return false;
        }
        else {
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
      this.navCtrl.navigateForward('suspension-tarjeta-de-debito/' + this.numeroDestino + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack('/home/' + this.numeroDestino);
  }
}
