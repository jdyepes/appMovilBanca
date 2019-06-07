import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.page.html',
  styleUrls: ['./consulta-saldo.page.scss'],
})
export class ConsultaSaldoPage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  accounts: any[] = [
    {
      id: 1,
      name: 'Cuenta Corriente',
    },
    {
      id: 2,
      name: 'Cuenta de Ahorros',
    }
  ];

  options: any[] = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
    }
  ];

  ngOnInit() {
  }

 async consultarSaldo(){
    let alert = await this.alertCtrl.create({
      header: 'Alerta',  
      message: '¿Seguro?',
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
            console.log('entro en ok');
          }
        }
      ]       
    });
    await alert.present();
  }
}
