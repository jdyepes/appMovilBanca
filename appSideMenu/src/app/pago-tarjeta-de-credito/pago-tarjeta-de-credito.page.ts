import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-tarjeta-de-credito',
  templateUrl: './pago-tarjeta-de-credito.page.html',
  styleUrls: ['./pago-tarjeta-de-credito.page.scss'],
})
export class PagoTarjetaDeCreditoPage implements OnInit {

  constructor() { }
  accounts: any[] = [
    {
      id: 1,
      name: 'Cuenta Corriente',
    },
    {
      id: 2,
      name: 'Cuenta de Ahorros',
    }
  ];

  ngOnInit() {
  }

}
