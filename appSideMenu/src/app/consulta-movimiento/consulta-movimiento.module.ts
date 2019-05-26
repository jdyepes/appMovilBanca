import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaMovimientoPage } from './consulta-movimiento.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaMovimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaMovimientoPage]
})
export class ConsultaMovimientoPageModule {}
