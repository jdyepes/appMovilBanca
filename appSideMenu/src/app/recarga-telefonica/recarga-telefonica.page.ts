import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-recarga-telefonica',
  templateUrl: './recarga-telefonica.page.html',
  styleUrls: ['./recarga-telefonica.page.scss'],
})
export class RecargaTelefonicaPage implements OnInit {

  prefijoAccion: string;
  operadoraSeleccion: any;
  telefonoSeleccion: number;
  tipoCuentaOrigen: any;
  correlativoOrigen: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'RT';
    this.operacion = 'RECARGA TELEFONICA';
    this.numeroDestino = '88232';
  }

  ngOnInit() {
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

  //alertBox
  async realizarPago() {
    let auxAccounts = this.tipoCuentaOrigen; // recibe la cuenta origen en objeto
    let auxOperadora = this.operadoraSeleccion;
    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
        ' con los siguientes datos: ' + '<BR>' +
        '<b>Teléfono: </b>' + auxOperadora.number + this.telefonoSeleccion + '<BR>' +
        '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' +
        '<b>Cuenta a debitar: </b>' + auxAccounts.name + ' ' + this.correlativoOrigen ,

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
            if ( auxOperadora.company === 'Digitel') {
              this.prefijoAccion = this.prefijoAccion + 'D';
            }
            if (auxOperadora.company === 'Movistar') {
              this.prefijoAccion = this.prefijoAccion + 'M';
            }
            if (auxOperadora.company === 'Movilnet') {
              this.prefijoAccion = this.prefijoAccion + 'O';
            }
             // tslint:disable-next-line:max-line-length
            this.mensajeEnviar = this.prefijoAccion + ' ' + auxOperadora.number + this.telefonoSeleccion + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + auxAccounts.shortCode + this.correlativoOrigen;
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
