import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-movimiento',
  templateUrl: './consulta-movimiento.page.html',
  styleUrls: ['./consulta-movimiento.page.scss'],
})
export class ConsultaMovimientoPage implements OnInit {

  constructor() { }
  accounts: any[] = [
    {
      id: 1,
      name: 'Corriente',
    },
    {
      id: 2,
      name: 'Ahorro',
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
