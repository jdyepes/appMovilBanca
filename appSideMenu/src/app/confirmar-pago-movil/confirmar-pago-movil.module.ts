import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmarPagoMovilPage } from './confirmar-pago-movil.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarPagoMovilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmarPagoMovilPage]
})
export class ConfirmarPagoMovilPageModule {}
