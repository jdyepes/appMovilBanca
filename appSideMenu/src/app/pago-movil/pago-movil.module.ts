import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PagoMovilPage } from './pago-movil.page';
import { SMS } from '@ionic-native/sms/ngx';

const routes: Routes = [
  {
    path: '',
    component: PagoMovilPage
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
  declarations: [PagoMovilPage]
})
export class PagoMovilPageModule {}
