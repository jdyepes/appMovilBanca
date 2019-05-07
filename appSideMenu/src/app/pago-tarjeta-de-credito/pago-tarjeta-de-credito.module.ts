import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagoTarjetaDeCreditoPage } from './pago-tarjeta-de-credito.page';

const routes: Routes = [
  {
    path: '',
    component: PagoTarjetaDeCreditoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagoTarjetaDeCreditoPage]
})
export class PagoTarjetaDeCreditoPageModule {}
