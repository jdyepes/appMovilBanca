import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-tarjeta-de-credito',
  templateUrl: './consulta-tarjeta-de-credito.page.html',
  styleUrls: ['./consulta-tarjeta-de-credito.page.scss'],
})
export class ConsultaTarjetaDeCreditoPage implements OnInit {

  constructor() { }

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
