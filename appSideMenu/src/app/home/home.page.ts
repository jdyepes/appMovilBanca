import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public appPages = [ 
    {
      title: 'Consultas',
      url: '/consultas',
      icon: 'search'
    },
    {
      title: 'Transferencias',
      url: '/transferencias',
      icon: '',
      src: '/assets/icon/transfer.svg'
    },
    {
      title: 'Pago Móvil',
      url: '/pago-movil-menu',
      icon: 'pago-movil',
      src: '/assets/icon/metodo-de-pago.svg'
    },
    {
      title: 'Pagos de TDC',
      url: '/pago-tarjeta-de-credito',
      icon: 'card'
    },
    {
      title: 'Avance de Efectivo',
      url: '/avance-de-efectivo',
      icon: 'cash'
    },
    {
      title: 'Recargas',
      url: '/recargas',
      icon: 'bookmarks'
    },
    {
      title: 'Suspension de TDD',
      url: '/suspension-tarjeta-de-debito',
      icon: 'close-circle'
    }
  ];

}
