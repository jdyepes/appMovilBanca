import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-confirmar-pago-movil',
  templateUrl: './confirmar-pago-movil.page.html',
  styleUrls: ['./confirmar-pago-movil.page.scss'],
})
export class ConfirmarPagoMovilPage implements OnInit {

  clavePago: string;
  opcionPagoMovil: string;
  operacionPAT: string;
  operacionPAC: string;
  numeroDestino: string;
  subscription: any;
  pagoMovilMenu: string; // pagina anterior
  mensajeEnviar: string;
  parametroPAT: string;
  parametroPAC: string;
  prefijoAccion: string;

  /** Navegacion entre paginas por rutas */
  constructor(public alertCtrl: AlertController,
              private sms: SMS, private rutaActiva: ActivatedRoute,
              private navCtrl: NavController, private platform: Platform) {
    this.parametroPAT = this.rutaActiva.snapshot.params.operacionPAT; // paramtros para el ->
    this.parametroPAC = this.rutaActiva.snapshot.params.operacionPAC; // regreso a la pagina anterior
    this.prefijoAccion = this.rutaActiva.snapshot.params.valorSeleccion; // valor seleccionado por el usuario (PAT por defecto)
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
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
  async enviarSMS() {
    if (this.validarCampos()) {
      let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Desea enviar esta clave: ' + '<b>' + this.clavePago + '</b>',
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
              this.mensajeEnviar = this.prefijoAccion + ' ' + this.clavePago;
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
      if (this.clavePago === undefined) {
        this.mostrarError('Campo requerido. ' + '<BR>' + 'Indique la clave de confirmación.');
        this.clavePago = undefined;
        return false;
      } else
        if (!numberPattern.test(this.clavePago)) {
        this.mostrarError('Ha ingresado la clave inválida');
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
      this.navCtrl.navigateForward('confirmar-pago-movil/' + this.numeroDestino + '/' + this.parametroPAT + '/' + this.parametroPAC + '/' + this.prefijoAccion);
      event.target.complete();
    }, 1000);
  }

  regresar() {
    this.navCtrl.navigateBack(this.pagoMovilMenu);
  }

}
