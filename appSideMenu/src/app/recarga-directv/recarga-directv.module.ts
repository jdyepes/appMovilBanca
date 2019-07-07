import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecargaDirectvPage } from './recarga-directv.page';

const routes: Routes = [
  {
    path: '',
    component: RecargaDirectvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecargaDirectvPage]
})
export class RecargaDirectvPageModule {}
