import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.page.html',
  styleUrls: ['./consulta-saldo.page.scss'],
})
export class ConsultaSaldoPage implements OnInit {

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

  options: any[] = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
    }
  ];


  ngOnInit() {
  }
}
