import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NumeroDestinoPage } from './numero-destino.page';

const routes: Routes = [
  {
    path: '',
    component: NumeroDestinoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NumeroDestinoPage]
})
export class NumeroDestinoPageModule {}
