import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avance-de-efectivo',
  templateUrl: './avance-de-efectivo.page.html',
  styleUrls: ['./avance-de-efectivo.page.scss'],
})
export class AvanceDeEfectivoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  accounts: any[] = [
    {
      id: 1,
      name: 'Cuenta Corriente',
    },
    {
      id: 2,
      name: 'Cuenta de Ahorros',
    }
  ]

  options: any[] = [
    {
      id: 1,
      name: 'a',
    },
    {
      id: 2,
      name: 'b',
    }
  ]

  cards: any[] = [
    {
      id: 'V1',
      name: 'Visa',
    },
    {
      id: 'M1',
      name: 'Master Card',
    }
  ]

}
