import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.page.html',
  styleUrls: ['./pago-movil.page.scss'],
})
export class PagoMovilPage implements OnInit {

  prefijoAccion: string;
  bancoSeleccion: string;
  operadoraSeleccion: string;
  telefonoSeleccion: number;
  tipoIdentificacion: string;
  numeroCedula: number;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mensajeEnviar: string;
  numeroDestino: string;

  constructor(public alertCtrl: AlertController, private sms: SMS) {
    this.prefijoAccion = 'PAT';
    this.operacion = 'PAGO';
    this.numeroDestino = '88232';
  }

  ngOnInit() {
  }

  banks: any[] = [
    {
      id: 1,
      name: 'Mercantil',
      code: '0105',
    },
    {
      id: 2,
      name: 'Provincial',
      code: '0108',
    },
    {
      id: 3,
      name: 'Banesco',
      code: '0134',
    },
    {
      id: 4,
      name: 'BFC Banco Fondo Común',
      code: '0151',
    },
    {
      id: 5,
      name: 'Mi Banco',
      code: '0169',
    },
    {
      id: 6,
      name: 'Banca amiga',
      code: '0172',
    },
    {
      id: 7,
      name: 'BNC Banco Nacional de Crédito',
      code: '0191',
    },
    {
      id: 8,
      name: 'Banfanb',
      code: '0177',
    },
    {
      id: 9,
      name: 'Occidental de Descuento',
      code: '0116',
    },
    {
      id: 10,
      name: 'Venezolano de Crédito',
      code: '0104',
    },
    {
      id: 11,
      name: '100% Banco',
      code: '0156',
    },
    {
      id: 12,
      name: 'Del Sur',
      code: '0157',
    },
    {
      id: 13,
      name: 'Bicentenario del Pueblo',
      code: '0175',
    },
    {
      id: 14,
      name: 'Del Tesoro',
      code: '0163',
    },
    {
      id: 15,
      name: 'Banco Caroní',
      code: '0128',
    },
    {
      id: 16,
      name: 'Banco de Venezuela S.A.C.A.',
      code: '0102',
    },
    {
      id: 17,
      name: 'Banplus',
      code: '0174',
    },
    {
      id: 18,
      name: 'Banco del Caribe',
      code: '0114',
    },
    {
      id: 19,
      name: 'Exterior',
      code: '0115',
    },
    {
      id: 20,
      name: 'Banco Agrícola de Venezuela',
      code: '0166',
    },
    {
      id: 21,
      name: 'Banco Activo',
      code: '0171',
    },
    {
      id: 22,
      name: 'Banco Plaza',
      code: '0138',
    },
    {
      id: 23,
      name: 'BANCRECER',
      code: '0168',
    }
  ];

  operadoras: any[] = [
    {
      id: 1,
      company: 'Digitel',
      number: '0412',
    },
    {
      id: 2,
      company: 'Movistar',
      number: '0414',
    },
    {
      id: 3,
      company: 'Movistar',
      number: '0424',
    },
    {
      id: 4,
      company: 'Movilnet',
      number: '0416',
    },
    {
      id: 5,
      company: 'Movilnet',
      number: '0426',
    }
  ];

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

  //alertBox
 async realizarPago(){
  let alert = await this.alertCtrl.create({
     header: 'Alerta',  
     message: 'Confirma que desea realizar un ' + '<b>' + this.operacion + '</b>' +
     ' con los siguientes datos: ' + '<BR>' +
     '<b>Banco: </b>' + this.bancoSeleccion + '<BR>' +
     '<b>Teléfono: </b>' + this.operadoraSeleccion + this.telefonoSeleccion + '<BR>' +
     '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' + 
     '<b>C.I.: </b>' + this.tipoIdentificacion + this.numeroCedula,

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
           this.mensajeEnviar = this.prefijoAccion + ' ' + this.bancoSeleccion + ' ' + this.operadoraSeleccion + this.telefonoSeleccion + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + this.tipoIdentificacion + this.numeroCedula;
           console.log('mensaje a enviar: ' + this.mensajeEnviar);
           this.sendSMS(this.mensajeEnviar);
         }
       }
     ]
   });
   await alert.present();
 }

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
