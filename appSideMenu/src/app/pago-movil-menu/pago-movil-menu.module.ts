import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagoMovilMenuPage } from './pago-movil-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PagoMovilMenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagoMovilMenuPage]
})
export class PagoMovilMenuPageModule {}
