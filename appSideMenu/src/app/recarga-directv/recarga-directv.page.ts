import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recarga-directv',
  templateUrl: './recarga-directv.page.html',
  styleUrls: ['./recarga-directv.page.scss'],
})
export class RecargaDirectvPage implements OnInit {

  prefijoAccion: string;
  servicioSeleccion: any;
  numeroClienteContrato: number|string;
  tipoCuentaOrigen: any;
  correlativoOrigen: string;
  montoEntero: string;
  montoDecimal: string;
  operacion: string;
  mostrar: boolean;
  prepago: boolean;
  mensajeEnviar: string;

  constructor(public alertCtrl: AlertController) {
    this.prefijoAccion = 'RD';
    this.operacion = 'RECARGA DIRECTV';
    this.mostrar = false;
  }

  ngOnInit() {
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

  // tipo de servicios Directv
  servicios: any[] = [
    {
      id: 1,
      name: 'Prepago',
    },
    {
      id: 2,
      name: 'Previo Pago',
    }
  ];

  //correlativos
  options: number[] = [1, 2, 3, 4, 5, 6];

  //evento del seleccionarServicio
  mostrarContenido()
  {
    let aux = this.servicioSeleccion;
    aux.id === 1 ? this.prepago = true : false; //prepago
    aux.id === 2 ? this.prepago = false : true; //previo pago
    this.mostrar = true; //oculta o no el contenido
    this.numeroClienteContrato = '';
    this.prefijoAccion = 'RD';
  }

  //alertBox
  async realizarPago() {
    let auxAccounts = this.tipoCuentaOrigen; // recibe la cuenta origen en objeto
    let auxServicios = this.servicioSeleccion;
    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Confirma que desea realizar una ' + '<b>' + this.operacion + '</b>' +
        ' con los siguientes datos: ' + '<BR>' +
        '<b>Servicio: </b>' + auxServicios.name  + '<BR>' +
        '<b>Nro Cliente/Contrato: </b>' + this.numeroClienteContrato + '<BR>' +
        '<b>Monto: </b>' + this.montoEntero + ',' + this.montoDecimal + '<BR>' +
        '<b>Cuenta a debitar: </b>' + auxAccounts.name + ' ' + this.correlativoOrigen,

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
            if (auxServicios.id === 1) {//Prepago
              this.prefijoAccion = this.prefijoAccion + 'D';
            }
            if (auxServicios.id === 2) {//Previo Pago
              this.prefijoAccion = this.prefijoAccion + 'P';
            }
            // tslint:disable-next-line:max-line-length
            this.mensajeEnviar = this.prefijoAccion + ' ' + this.numeroClienteContrato + ' ' + this.montoEntero + ',' + this.montoDecimal + ' ' + auxAccounts.shortCode + this.correlativoOrigen;
            console.log('mensaje a enviar: ' + this.mensajeEnviar);
          }
        }
      ]
    });
    await alert.present();
  }
}
