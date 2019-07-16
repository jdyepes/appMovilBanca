import { Component, OnInit } from '@angular/core';

import { SMS } from '@ionic-native/sms/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-suspension-tarjeta-de-debito',
  templateUrl: './suspension-tarjeta-de-debito.page.html',
  styleUrls: ['./suspension-tarjeta-de-debito.page.scss'],
})
export class SuspensionTarjetaDeDebitoPage implements OnInit {

  prefijoAccion: string;
  mensajeEnviar: string;
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'STD';
    this.numeroDestino = '88232';
  }

  ngOnInit() {
  }

  tipos: any[] = [
    {
      id: 1,
      type: 'V',
    },
    {
      id: 2,
      type: 'E',
    },
    {
      id: 3,
      type: 'P',
    }
  ];
  
  async sendSMS(mensaje: string) {
    // CONFIGURATION
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'  // send SMS with the native android SMS messaging
        //intent: '' // send SMS without opening any other app
      }
    };
    await this.sms.send(this.numeroDestino, mensaje, options);
  }

}
