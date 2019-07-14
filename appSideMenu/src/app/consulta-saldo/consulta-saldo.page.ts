import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.page.html',
  styleUrls: ['./consulta-saldo.page.scss'],
})
export class ConsultaSaldoPage implements OnInit {

  tipoCuenta: string;
  correlativoSelected: string;
  prefijoAccion: string;
  mensajeEnviar: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'S';
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
            this.mensajeEnviar = this.prefijoAccion + ' ' + this.tipoCuenta + this.correlativoSelected;
            console.log('mensaje a enviar: ' + this.mensajeEnviar);
          }
        }
      ]
    });
    await alert.present();
  }

sendSMS() {
  this.sms.send('4122002889', 'prueba');
}
}
