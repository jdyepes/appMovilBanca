import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SuspensionTarjetaDeDebitoPage } from './suspension-tarjeta-de-debito.page';

import { SMS } from '@ionic-native/sms/ngx';

const routes: Routes = [
  {
    path: '',
    component: SuspensionTarjetaDeDebitoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SMS],
  declarations: [SuspensionTarjetaDeDebitoPage]
})
export class SuspensionTarjetaDeDebitoPageModule {}
