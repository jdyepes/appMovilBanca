import { Component } from '@angular/core';

import { Platform, AlertController, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ProviderService} from '../provider-service';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/Proveedor';
import { OPERACIONES, MENSAJE_PAGINAS } from '../constantes/prefijo-opciones';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

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
  subscription: any;
  proveedor: any;
  mensajeFooter1: string = MENSAJE_PAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_PAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_PAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_PAGINAS.mensajeFooter4;
  mensajeFooter5: string = MENSAJE_PAGINAS.mensajeFooter5;

  /** Peticion que hace al servicio rest API
   * Creado 24 agosto 2019
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
    private alertCtrl: AlertController,
    public providerService: ProviderService,
    public http: HttpClient,
    private navCtrl: NavController,
    private rutaActiva: ActivatedRoute,
    private menuCtrl: MenuController
  ) {
    /** Habilita el menu lateral izquierdo */    
    //this.menuCtrl.enable(true);
    /** recepcion por parametro el numero de destino seleccionado en la vista anterior */
    this.numeroDestinoProveedor = this.rutaActiva.snapshot.params.numeroProveedor;
    this.initializeApp();
  }

  // se ejecuta cuando se ejecuta la app
  // solo lo hace una vez
  ionViewDidLoad() {

  }

  // antes de entrar a la app
  ionViewWillEnter() {
    this.llenarMenu(this.numeroDestinoProveedor);
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

/** Se inicia el boton de retroceso Android */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // salir de la app
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
    // this.confirmarSalida();
    this.regresar();
    });
  }
  // deshabilita el boton regresar antes de salir de la pag
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  //alertBox
  async confirmarSalida() {
      let alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Desea volver a seleccionar el número de destino?',

        buttons: [
          {
            text: 'Cancelar',
            handler: () => { }
          },
          {
            text: 'OK',
            handler: () => {
              // navigator['app'].exitApp();
              this.regresar();
            }
          }
        ]
      });
      await alert.present();
    }

  regresar() {
    this.navCtrl.navigateRoot('/numero-destino');
  }
}
