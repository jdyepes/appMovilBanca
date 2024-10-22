import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConsultaSaldoPage } from './consulta-saldo.page';

import { SMS } from '@ionic-native/sms/ngx';

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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SMS],
  declarations: [ConsultaSaldoPage]
})
export class ConsultaSaldoPageModule {}
