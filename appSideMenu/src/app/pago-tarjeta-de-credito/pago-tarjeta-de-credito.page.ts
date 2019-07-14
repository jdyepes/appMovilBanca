import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago-tarjeta-de-credito',
  templateUrl: './pago-tarjeta-de-credito.page.html',
  styleUrls: ['./pago-tarjeta-de-credito.page.scss'],
})
export class PagoTarjetaDeCreditoPage implements OnInit {

  prefijoAccion: string;
  tipoCuentaOrigen: string;
  tarjetaDestino: string;
  correlativoOrigen: string;
  correlativoDestino:string;
  montoEntero: number;
  montoDecimal: number;
  operacion: string;

  constructor(public alertCtrl: AlertController) { 
    this.prefijoAccion ='P';
    this.operacion ='PAGO TDC';
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
async realizarPagoTDC(){
   let alert = await this.alertCtrl.create({
      header: 'Alerta',  
      message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
      ' con los siguientes datos: ' + '<BR>' +
      '<b>Cuenta Origen: </b>' + this.tipoCuentaOrigen +' ' + this.correlativoOrigen + '<BR>' +
      '<b>Cuenta Destino: </b>' + this.tarjetaDestino + ' ' + this.correlativoDestino + '<BR>' +
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
            console.log('mensaje a enviar: '+this.prefijoAccion + ' ' + this.tipoCuentaOrigen + this.correlativoOrigen + ' ' +this.tarjetaDestino + this.correlativoDestino + ' ' + this.montoEntero + ',' + this.montoDecimal);
          }
        }
      ]       
    });
    await alert.present();
  }
}
