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
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'S';
    this.numeroDestino = '88232';
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
      message: '¿Seguro s?',
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
            this.sendSMS();
            console.log('mensaje a enviar: ' + this.mensajeEnviar);
          }
        }
      ]
    });
    await alert.present();
  }

async sendSMS() {
  // CONFIGURATION
  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: 'INTENT'  // send SMS with the native android SMS messaging
      //intent: '' // send SMS without opening any other app
    }
  };
  await this.sms.send(this.numeroDestino, this.mensajeEnviar, options);
  console.log('prueba ');
}
}
