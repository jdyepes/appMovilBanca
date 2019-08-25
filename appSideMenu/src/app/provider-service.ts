import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PATH, AppUrlBase, METHOD } from './constantes/PathUrl.conts';
import { Proveedor } from './models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  apiUrlProveedor = AppUrlBase.appUrlBase + PATH.PROVEEDOR;
  urlRoot: string;

  proveedorLista: Proveedor[];
  constructor(private http: HttpClient) {
    this.urlRoot = this.apiUrlProveedor + METHOD.ObtenerProveedor;
  }

  /** Se obtiene el proveedor disponible
   * para extraer el numero de tel de destino
   * desde la url ubicada en la carpeta Constantes
   */
  getProveedor() {
    return this.http.get(this.urlRoot);
  }

}
