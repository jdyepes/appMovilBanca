import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-avance-de-efectivo',
  templateUrl: './avance-de-efectivo.page.html',
  styleUrls: ['./avance-de-efectivo.page.scss'],
})
export class AvanceDeEfectivoPage implements OnInit {

  prefijoAccion: string;
  tarjetaOrigen: string;
  cuentaDestino: string;
  correlativoOrigen: string;
  correlativoDestino: string;
  cvvTarjeta: number;
  montoEntero: number; 
  montoDecimal: number;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) { 
    this.prefijoAccion = 'A';
    this.operacion = 'AVANCE';
    this.numeroDestino = '88232';
  }

  ngOnInit() {
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
    }
  ];

  //correlativos
  options: number[] = [1,2,3,4,5,6];

  cards: any[] = [
    {
      id: 1,
      name: 'Visa',
      shortCode: 'v',
    },
    {
      id: 2,
      name: 'Master',
      shortCode: 'm',
    }
  ];

  //alertBox
  async realizarAvanceTDC(){
    let alert = await this.alertCtrl.create({
      header: 'Alerta',  
      message: 'Confirma que desea realizar un ' + '<b>' + this.operacion + '</b>' +
      ' con los siguientes datos: ' + '<BR>' +
      '<b>Tarjeta Origen: </b>' + this.tarjetaOrigen +' ' + this.correlativoOrigen + '<BR>' +
      '<b>CVV: </b>' + this.cvvTarjeta + '<BR>' +
      '<b>Cuenta Destino: </b>' + this.cuentaDestino + ' ' + this.correlativoDestino + '<BR>' +
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
            this.mensajeEnviar = this.prefijoAccion + ' ' + this.tarjetaOrigen + this.correlativoOrigen + ' ' + this.cuentaDestino + this.correlativoDestino + ' ' + this.cvvTarjeta + ' ' + this.montoEntero + ',' + this.montoDecimal;
            console.log('mensaje a enviar: ' + this.mensajeEnviar );
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
