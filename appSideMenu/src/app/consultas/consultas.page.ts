import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  constructor() { }
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
  ngOnInit() {
  }

}
