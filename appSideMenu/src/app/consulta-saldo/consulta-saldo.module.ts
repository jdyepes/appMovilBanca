import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaSaldoPage } from './consulta-saldo.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaSaldoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaSaldoPage]
})
export class ConsultaSaldoPageModule {}
