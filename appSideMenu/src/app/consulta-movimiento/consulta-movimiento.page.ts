import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.page.html',
  styleUrls: ['./consulta-movimiento.page.scss'],
})
export class ConsultaMovimientoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;
  prefijoAccion: string;

  constructor(public alertCtrl: AlertController) {
      this.prefijoAccion ='M';
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
  async consultarMovimiento(){
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
