import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SMS } from '@ionic-native/sms/ngx';

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

  constructor(public alertCtrl: AlertController, private sms: SMS, private navCtrl: NavController) {
    this.prefijoAccion = 'S';
    this.numeroDestino = '88232';
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

  //correlativos
  options: number[] = [1, 2, 3, 4, 5, 6];

  ngOnInit() {
  }

 async consultarSaldo() {
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
      window.location.reload();
    }, 1000);
  }
}
