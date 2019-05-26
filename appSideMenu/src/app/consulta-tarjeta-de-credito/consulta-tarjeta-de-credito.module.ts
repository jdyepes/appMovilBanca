import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaTarjetaDeCreditoPage } from './consulta-tarjeta-de-credito.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaTarjetaDeCreditoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaTarjetaDeCreditoPage]
})
export class ConsultaTarjetaDeCreditoPageModule {}
