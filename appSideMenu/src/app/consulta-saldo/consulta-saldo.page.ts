import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.page.html',
  styleUrls: ['./consulta-saldo.page.scss'],
})
export class ConsultaSaldoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;

  constructor(public alertCtrl: AlertController) { }

  accounts: any[] = [
    {
      id: 1,
      name: 'Ahorro',
    },
    {
      id: 2,
      name: 'Corriente',
    },
    {
      id: 3,
      name: 'Visa',
    },
    {
      id: 4,
      name: 'Master',
    },
    {
      id: 5,
      name: 'Prestamo',
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
            console.log('la seleccion fue: '+ this.correlativoSelected);
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
