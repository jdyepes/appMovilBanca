import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suspension-tarjeta-de-debito',
  templateUrl: './suspension-tarjeta-de-debito.page.html',
  styleUrls: ['./suspension-tarjeta-de-debito.page.scss'],
})
export class SuspensionTarjetaDeDebitoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tipos: any[] = [
    {
      id: 1,
      type: 'V',
    },
    {
      id: 2,
      type: 'E',
    },
    {
      id: 3,
      type: 'P',
    }
  ];
  
}
