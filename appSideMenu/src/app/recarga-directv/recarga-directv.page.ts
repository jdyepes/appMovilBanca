import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recarga-directv',
  templateUrl: './recarga-directv.page.html',
  styleUrls: ['./recarga-directv.page.scss'],
})
export class RecargaDirectvPage implements OnInit {

  prefijoAccion: string;
  operadoraSeleccion: string;
  telefonoSeleccion: number;
  tipoCuentaOrigen: string;
  correlativoOrigen: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;

  constructor(public alertCtrl: AlertController) {
    this.prefijoAccion = 'RD';
    this.operacion = 'RECARGA DIRECTV';
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

  //alertBox
  async realizarPago() {
    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
        ' con los siguientes datos: ' + '<BR>' +
        '<b>Teléfono: </b>' + this.operadoraSeleccion + this.telefonoSeleccion + '<BR>' +
        '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' +
        '<b>Cuenta a debitar: </b>' + this.tipoCuentaOrigen + ' ' + this.correlativoOrigen,

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
            // tslint:disable-next-line:max-line-length
            console.log('mensaje a enviar: ' + this.prefijoAccion + ' ' + this.operadoraSeleccion + this.telefonoSeleccion + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + this.tipoCuentaOrigen + this.correlativoOrigen);
          }
        }
      ]
    });
    await alert.present();
  }
}
