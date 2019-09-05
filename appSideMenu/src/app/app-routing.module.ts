import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    /** Establece como pagina de inicio de la app */
    path: '',
    redirectTo: 'numero-destino',
    pathMatch: 'full'
  },
  {
    path: 'home/:numeroProveedor',
    loadChildren: './home/home.module#HomePageModule'
  },
 
  /** Se coloca las urls con parametros solo a las opciones del menu principal */
  /** El resto son los submenus que recibiran solos los parametros del proveedor y la operacion */
  { path: 'consultas/:numeroProveedor/:operacionSaldo/:operacionMov', loadChildren: './consultas/consultas.module#ConsultasPageModule' },
  { path: 'transferencias/:numeroProveedor/:operacion', loadChildren: './transferencias/transferencias.module#TransferenciasPageModule' },
  { path: 'pago-movil-menu/:numeroProveedor/:operacionPAT/:operacionPAC', loadChildren: './pago-movil-menu/pago-movil-menu.module#PagoMovilMenuPageModule' },
  { path: 'pago-tarjeta-de-credito/:numeroProveedor/:operacion', loadChildren: './pago-tarjeta-de-credito/pago-tarjeta-de-credito.module#PagoTarjetaDeCreditoPageModule' },
  { path: 'avance-de-efectivo/:numeroProveedor/:operacion', loadChildren: './avance-de-efectivo/avance-de-efectivo.module#AvanceDeEfectivoPageModule' },
  { path: 'recargas/:numeroProveedor/:operacionTel/:operacionDirectv', loadChildren: './recargas/recargas.module#RecargasPageModule' },
  { path: 'suspension-tarjeta-de-debito/:numeroProveedor/:operacion', loadChildren: './suspension-tarjeta-de-debito/suspension-tarjeta-de-debito.module#SuspensionTarjetaDeDebitoPageModule' },

  /** Opciones submenus */
  { path: 'consulta-saldo/:numeroProveedor/:operacion', loadChildren: './consulta-saldo/consulta-saldo.module#ConsultaSaldoPageModule' },
  { path: 'consulta-movimiento/:numeroProveedor/:operacion', loadChildren: './consulta-movimiento/consulta-movimiento.module#ConsultaMovimientoPageModule' },
  { path: 'consulta-tarjeta-de-credito/:numeroProveedor/:operacion', loadChildren: './consulta-tarjeta-de-credito/consulta-tarjeta-de-credito.module#ConsultaTarjetaDeCreditoPageModule' },
  { path: 'pago-movil/:numeroProveedor/:operacionPAT/:operacionPAC/:valorSeleccion', loadChildren: './pago-movil/pago-movil.module#PagoMovilPageModule' },
  { path: 'confirmar-pago-movil/:numeroProveedor/:operacionPAT/:operacionPAC/:valorSeleccion', loadChildren: './confirmar-pago-movil/confirmar-pago-movil.module#ConfirmarPagoMovilPageModule' },
  { path: 'recarga-telefonica/:numeroProveedor/:operacionTel', loadChildren: './recarga-telefonica/recarga-telefonica.module#RecargaTelefonicaPageModule' },
  { path: 'recarga-directv/:numeroProveedor/:operacionDirectv', loadChildren: './recarga-directv/recarga-directv.module#RecargaDirectvPageModule' },
  { path: 'spinner', loadChildren: './spinner/spinner.module#SpinnerPageModule' },
  { path: 'numero-destino', loadChildren: './numero-destino/numero-destino.module#NumeroDestinoPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
