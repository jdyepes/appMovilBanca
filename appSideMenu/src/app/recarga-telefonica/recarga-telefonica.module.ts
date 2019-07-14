import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecargaTelefonicaPage } from './recarga-telefonica.page';

const routes: Routes = [
  {
    path: '',
    component: RecargaTelefonicaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecargaTelefonicaPage]
})
export class RecargaTelefonicaPageModule {}
