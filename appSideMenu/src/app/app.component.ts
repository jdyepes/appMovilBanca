import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OPERACIONES } from './constantes/prefijo-opciones';
import { ProviderService } from './provider-service';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from './models/Proveedor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  numeroDestinoProveedor: string = OPERACIONES.numeroDestinoProveedor;
  prefijoSaldo: string = OPERACIONES.preSaldo;
  prefijoMovimiento: string = OPERACIONES.preMovimiento;
  prefijoTransferencia: string = OPERACIONES.preTransferencia;
  prefijoPagoTDC: string = OPERACIONES.prePagoTDC;
  prefijoAvanceEfectivo: string = OPERACIONES.preAvanceEfectivo;
  prefijoPagoMovilPAT: string = OPERACIONES.prePagoMovilPAT;
  prefijoPagoMovilPAC: string = OPERACIONES.prePagoMovilPAC;
  prefijoRecargasTelefonicas: string = OPERACIONES.preRecargasTelefonicas;
  prefijoRecargasDirectv: string = OPERACIONES.preRecargasDirectv;
  prefijoDirectvPrePago: string = OPERACIONES.preDirectvPrePago;
  prefijoDirectvPrevioPago: string = OPERACIONES.preDirectvPrevioPago;
  prefijoSuspensionTDD: string = OPERACIONES.preSuspensionTDD;
  proveedor: any;

  /** Peticion que hace al servicio rest API
   * Creado martes 27 agosto 2019
   */
  servicioProveedor = new ProviderService(this.http);
  
  public appPages = [
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
     {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    },
    {
      title: '',
      url: '',
      icon: '',
      src: ''
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public http: HttpClient,
    public providerService: ProviderService
  ) {    
    this.initializeApp();
    this.cargarProveedor();
    // this.llenarMenu(this.numeroDestinoProveedor);
  }

  /** Realiza la peticion rest antes de que la aplicacion este lista 
   * Creado martes 27 de agosto 2019
   */
  ionViewDidLoad() {
    this.cargarProveedor();
  }

  // antes de entrar a la app
  ionViewWillEnter() {
    this.llenarMenu(this.numeroDestinoProveedor);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

/** Extrae los datos del proveedor mediante la peticion rest y lo mapea
 * a la clase Proveedores
 */
async cargarProveedor() {
  await this.providerService.getProveedor()
    .subscribe(
      (data) => { // Success
        this.proveedor = data;
       // this.fillListInterface();
        let proAux = new Proveedor();
        let numberPattern = new RegExp(/^\d*$/);
        proAux.$id = data['_id'];
        proAux.$nombre = data['_nombre'];
        proAux.$numero = data['_numero'];
        proAux.$disponible = data['_disponible'];
        console.log(proAux);
        // Si el numero extraido es valido (numerico no vacio)
        if(numberPattern.test(proAux.$numero) && proAux.$numero != '' && proAux.$numero != null )
        {
          this.numeroDestinoProveedor = proAux.$numero;   
          this.llenarMenu(this.numeroDestinoProveedor);         
        }          
      },
      (error) => {
        console.error(error);
        this.numeroDestinoProveedor = OPERACIONES.numeroDestinoProveedor;
      }
    );

}

  /** Se llena las opciones del menu principal con el numero del 
   * proveedor extraido mediante el servicio rest api
   * Creado 25 ago 2019 fin 3er sprint
   */
  llenarMenu(numeroTelefono) {
    this.appPages[0].title = 'Consultas';
    this.appPages[0].url = '/consultas/' + this.numeroDestinoProveedor + '/' + this.prefijoSaldo + '/' + this.prefijoMovimiento;
    this.appPages[0].icon = 'search';
    this.appPages[0].src = '';

    this.appPages[1].title = 'Transferencias';
    this.appPages[1].url = '/transferencias/' + this.numeroDestinoProveedor + '/' + this.prefijoTransferencia;
    this.appPages[1].icon = '';
    this.appPages[1].src = '/assets/icon/transfer.svg';

    this.appPages[2].title = 'Pago Móvil';
    this.appPages[2].url = '/pago-movil-menu/' + this.numeroDestinoProveedor + '/' + this.prefijoPagoMovilPAT + '/' + this.prefijoPagoMovilPAC;
    this.appPages[2].icon = '';
    this.appPages[2].src = '/assets/icon/metodo-de-pago.svg';

    this.appPages[3].title = 'Pagos de TDC';
    this.appPages[3].url = '/pago-tarjeta-de-credito/' + this.numeroDestinoProveedor + '/' + this.prefijoPagoTDC;
    this.appPages[3].icon = 'card';
    this.appPages[3].src = '';

    this.appPages[4].title = 'Avance de Efectivo';
    this.appPages[4].url = '/avance-de-efectivo/' + this.numeroDestinoProveedor + '/' + this.prefijoAvanceEfectivo;
    this.appPages[4].icon = 'cash';
    this.appPages[4].src = '';

    this.appPages[5].title = 'Recargas';
    this.appPages[5].url = '/recargas/' + this.numeroDestinoProveedor + '/' + this.prefijoRecargasTelefonicas + '/' + this.prefijoRecargasDirectv;
    this.appPages[5].icon = 'bookmarks';
    this.appPages[5].src = '';

    this.appPages[6].title = 'Suspension de TDD';
    this.appPages[6].url = '/suspension-tarjeta-de-debito/' + this.numeroDestinoProveedor + '/' + this.prefijoSuspensionTDD;
    this.appPages[6].icon = 'close-circle';
    this.appPages[6].src = '';
}
}
