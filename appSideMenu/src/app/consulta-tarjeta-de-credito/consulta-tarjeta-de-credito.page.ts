import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-tarjeta-de-credito',
  templateUrl: './consulta-tarjeta-de-credito.page.html',
  styleUrls: ['./consulta-tarjeta-de-credito.page.scss'],
})
export class ConsultaTarjetaDeCreditoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;
  prefijoAccion: string;
  
  constructor(public alertCtrl: AlertController) { 
    this.prefijoAccion ='S';
  }

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
    },
  ];

  //correlativos
  options: number[] = [1,2,3,4,5,6];

  ngOnInit() {
  }

  //alertBox
 async consultarTDC(){
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
