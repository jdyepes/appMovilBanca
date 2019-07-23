import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  numeroDestinoProveedor: string = '88232';
  prefijoSaldo: string = 'S';
  prefijoMovimiento: string = 'M';
  prefijoTransferencia: string = 'T';
  prefijoPagoTDC: string = 'P';
  prefijoAvanceEfectivo: string = 'A';
  prefijoPagoMovilPAT: string = 'PAT';
  prefijoPagoMovilPAC: string = 'PAC';
  prefijoRecargasTelefonicas: string = 'RT';
  prefijoRecargasDirectv: string = 'RD';
  prefijoDirectvPrePago: string = 'RDD';
  prefijoDirectvPrevioPago: string = 'RDP';
  prefijoSuspensionTDD: string = 'STD';

  public appPages = [
    {
      title: 'Consultas',
      url: '/consultas/' + this.numeroDestinoProveedor + '/' + this.prefijoSaldo + '/' + this.prefijoMovimiento ,
      icon: 'search'
    },
    {
      title: 'Transferencias',
      url: '/transferencias/' + this.numeroDestinoProveedor + '/' + this.prefijoTransferencia ,
      icon: '',
      src: '/assets/icon/transfer.svg'
    },
    {
      title: 'Pago Móvil',
      url: '/pago-movil-menu/' + this.numeroDestinoProveedor + '/' + this.prefijoPagoMovilPAT + '/' + this.prefijoPagoMovilPAC,
      icon: '' ,
      src: '/assets/icon/metodo-de-pago.svg'
    },
    {
      title: 'Pagos de TDC',
      url: '/pago-tarjeta-de-credito/' + this.numeroDestinoProveedor + '/' + this.prefijoPagoTDC,
      icon: 'card'
    },
    {
      title: 'Avance de Efectivo',
      url: '/avance-de-efectivo/' + this.numeroDestinoProveedor + '/' + this.prefijoAvanceEfectivo,
      icon: 'cash'
    },
    {
      title: 'Recargas',
      url: '/recargas/' + this.numeroDestinoProveedor + '/' + this.prefijoRecargasTelefonicas + '/' + this.prefijoRecargasDirectv ,
      icon: 'bookmarks'
    },
    {
      title: 'Suspension de TDD',
      url: '/suspension-tarjeta-de-debito/' + this.numeroDestinoProveedor + '/' + this.prefijoSuspensionTDD,
      icon: 'close-circle'
    }
  ];

}
