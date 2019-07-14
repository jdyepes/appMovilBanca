import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirmar-pago-movil',
  templateUrl: './confirmar-pago-movil.page.html',
  styleUrls: ['./confirmar-pago-movil.page.scss'],
})
export class ConfirmarPagoMovilPage implements OnInit {

  clavePago: string;

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  //alertBox
  async enviarSMS() {
    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Desea enviar esta clave: ' + '<b>' + this.clavePago + '</b>',
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
            console.log('mensaje a enviar: ' + this.clavePago);
          }
        }
      ]
    });
    await alert.present();
  }

}
