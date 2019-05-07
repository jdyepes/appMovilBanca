import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
}
