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
  prefijoAccion: string;

  constructor(public alertCtrl: AlertController) { 
    this.prefijoAccion ='S';
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
  options: number[] = [1,2,3,4,5,6];

  ngOnInit() {
  }

  //alertBox
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
            console.log('mensaje a enviar: '+this.prefijoAccion + ' ' + this.tipoCuenta+ this.correlativoSelected);
          }
        }
      ]       
    });
    await alert.present();
  }
}
