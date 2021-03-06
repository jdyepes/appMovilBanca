import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'consultas', loadChildren: './consultas/consultas.module#ConsultasPageModule' },
  { path: 'transferencias', loadChildren: './transferencias/transferencias.module#TransferenciasPageModule' },
  { path: 'pago-movil', loadChildren: './pago-movil/pago-movil.module#PagoMovilPageModule' },
  { path: 'pago-tarjeta-de-credito', loadChildren: './pago-tarjeta-de-credito/pago-tarjeta-de-credito.module#PagoTarjetaDeCreditoPageModule' },
  { path: 'avance-de-efectivo', loadChildren: './avance-de-efectivo/avance-de-efectivo.module#AvanceDeEfectivoPageModule' },
  { path: 'recargas', loadChildren: './recargas/recargas.module#RecargasPageModule' },
  { path: 'suspension-tarjeta-de-debito', loadChildren: './suspension-tarjeta-de-debito/suspension-tarjeta-de-debito.module#SuspensionTarjetaDeDebitoPageModule' },
  { path: 'consulta-saldo', loadChildren: './consulta-saldo/consulta-saldo.module#ConsultaSaldoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
