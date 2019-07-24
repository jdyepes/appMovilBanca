import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.page.html',
  styleUrls: ['./consulta-movimiento.page.scss'],
})
export class ConsultaMovimientoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;
  prefijoAccion: string;
  mensajeEnviar: string;
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS, private rutaActiva: ActivatedRoute) {
    this.prefijoAccion = this.rutaActiva.snapshot.params.operacion;
    this.numeroDestino = this.rutaActiva.snapshot.params.numeroProveedor;
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

  ngOnInit() {
  }

  
  async consultarMovimiento() {
    if (this.tipoCuenta === undefined) {
      this.mostrarError('Campo no seleccionado. Seleccione una Cuenta');
    } else
      if (this.correlativoSelected === undefined) {
        this.mostrarError('Campo no seleccionado. Seleccione correlativo');
      } else {
        this.mensajeEnviar = this.prefijoAccion + ' ' + this.tipoCuenta + this.correlativoSelected;
        console.log('mensaje a enviar: ' + this.mensajeEnviar);
        this.sendSMS(this.mensajeEnviar);
      }
  }

  //alertBox
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
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      //window.location.reload();
    }, 1000);
  }
}
