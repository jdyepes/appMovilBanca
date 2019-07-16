import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';

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

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'T';
    this.operacion = 'TRANSFERENCIA';
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
  options: number[] = [1,2,3,4,5,6];

  ngOnInit() {
  }

  //alertBox
 async transferirCuenta(){
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
}
