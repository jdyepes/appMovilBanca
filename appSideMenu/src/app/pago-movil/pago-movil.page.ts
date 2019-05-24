import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.page.html',
  styleUrls: ['./pago-movil.page.scss'],
})
export class PagoMovilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  options: any[] = [
    {
      id: 1,
      name: 'Banesco',
    },
    {
      id: 2,
      name: 'Provincial',
    },
    {
      id: 3,
      name: 'Mercantil',
    },
    {
      id: 4,
      name: 'BFC',
    }
  ]

  //// Operadoras por confirmar
  operadoras: any[] = [
    {
      id: 1,
      name: 'Movilnet',
    },
    {
      id: 2,
      name: 'Movistar',
    },
    {
      id: 3,
      name: 'Digitel',
    }  
  ]
}
