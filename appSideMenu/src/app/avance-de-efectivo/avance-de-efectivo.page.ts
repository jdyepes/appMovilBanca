import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  correlativoDestino:string;
  cvvTarjeta: number;  
  montoEntero: number; 
  montoDecimal: number;
  operacion: string;

  constructor(public alertCtrl: AlertController) { 
    this.prefijoAccion ='A';
    this.operacion ='AVANCE';
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
            console.log('mensaje a enviar: '+this.prefijoAccion + ' ' + this.tarjetaOrigen + this.correlativoOrigen + ' ' +this.cuentaDestino + this.correlativoDestino + ' ' + this.cvvTarjeta + ' ' + this.montoEntero + ',' + this.montoDecimal);
          }
        }
      ]       
    });
    await alert.present();
  }
}
