import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  montoDecimal: any;

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
      name: 'a',
    },
    {
      id: 2,
      name: 'b',
    }
  ];

  cards: any[] = [
    {
      id: 'V1',
      name: 'Visa',
    },
    {
      id: 'M1',
      name: 'Master Card',
    }
  ];

  ngOnInit() {
  }

}
