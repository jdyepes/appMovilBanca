import { Component } from '@angular/core';
import { OPERACIONES, MENSAJE_PAGINAS } from '../../constantes/prefijo-opciones';

import { Platform, AlertController, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ProviderService} from '../provider-service';

import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../../models/Proveedor';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-numero-destino',
  templateUrl: './numero-destino.page.html',
  styleUrls: ['./numero-destino.page.scss'],
})
export class NumeroDestinoPage {

  subscription: any;
  proveedor: any;
  numeroDestinoSeleccion: string;
  numerosDestinoProveedor: any[];
  mensajeFooter1: string = MENSAJE_PAGINAS.mensajeFooter1;
  mensajeFooter2: string = MENSAJE_PAGINAS.mensajeFooter2;
  mensajeFooter3: string = MENSAJE_PAGINAS.mensajeFooter3;
  mensajeFooter4: string = MENSAJE_PAGINAS.mensajeFooter4;
  mensajeFooter5: string = MENSAJE_PAGINAS.mensajeFooter5;

  /** Peticion que hace al servicio rest API
   * Creado 24 agosto 2019
   */
  servicioProveedor = new ProviderService(this.http);

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    public providerService: ProviderService,
    public http: HttpClient,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    public loadingService: LoadingService
  ) {

    /** Deshabilita el menu lateral izquierdo */
    this.menuCtrl.enable(false);

    this.initializeApp();
    this.numerosDestinoProveedor = [];
    console.log('entro constru ');
  }

  // se ejecuta cuando se ejecuta la app
  // solo lo hace una vez
  ionViewDidLoad() {

  }

  // antes de entrar a la app
  ionViewWillEnter() { 
    console.log('entro');
    if (this.numerosDestinoProveedor.length === 0) {
      this.cargarProveedor();
    }
  }

/** 
 * 24 ago 2019
 * Extrae los datos del proveedor mediante la peticion rest y lo mapea
 * a la clase Proveedores. Realiza la carga del spinner
 */
  async cargarProveedor() {
    let proAux = new Proveedor();
    this.loadingService.loadingPresent();
    await this.providerService.getProveedor()
    
    .subscribe(
        (data) => { // Success
          console.log(data);
          this.proveedor = data;

          // elimino el valor por defecto del numero de destino,
          // para volverlo a llenar con los valores extraidos del servicio
          this.numerosDestinoProveedor = [];
          let numberPattern = new RegExp(/^\d*$/);

          for (var i = 0; i < (this.proveedor.length); i++)
          {
              proAux.$id = data[i]['_id'];
              proAux.$nombre = data[i]['_nombre'];
              proAux.$numero = data[i]['_numero'];
              proAux.$disponible = data[i]['_disponible'];
              this.numerosDestinoProveedor.push(proAux);
              proAux = new Proveedor();
              console.log(this.numerosDestinoProveedor);
          }

          // Si el numero extraido es valido (numerico no vacio)
          if (numberPattern.test(this.numeroDestinoSeleccion) && this.numeroDestinoSeleccion != '' && this.numeroDestinoSeleccion != null )
          {
            this.llenarNumeroDestino();
          }
          // cierro spinner o loading
          this.loadingService.loadingDismiss();
        },
        (error) => { // error
          console.error(error);
          this.llenarNumeroDestino();
          // cierro spinner o loading
          this.loadingService.loadingDismiss();
        }
      );
  }

  /**
   * Metodo que llena el numero de destino del proveedor por defecto
   * en este caso se establece UNPLUGGED por defecto
   */
  llenarNumeroDestino() {
    let proAux = new Proveedor();
    console.log(this.numerosDestinoProveedor);
    // se lee en constantes el numero de destino del proveedor
    proAux.$id = 1;
    proAux.$nombre = OPERACIONES.nombreProveedor;
    proAux.$numero = OPERACIONES.numeroDestinoProveedor;
    proAux.$disponible = true;
    this.numerosDestinoProveedor.push(proAux);
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
      this.confirmarSalida();
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
        message: 'Desea salir de TUBFC',

        buttons: [
          {
            text: 'Cancelar',
            handler: () => { }
          },
          {
            text: 'OK',
            handler: () => {
              navigator['app'].exitApp();
            }
          }
        ]
      });
      await alert.present();
    }

  // muestra los mensajes de los campos si estan errados
  async mostrarError(mensaje: string) {

    let alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '<p>' + mensaje + '</p>',
      cssClass: 'alertColor',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  abrirSiguientePag() {
    if (this.numeroDestinoSeleccion !== '' && this.numeroDestinoSeleccion != null )
    {
        console.log('el valor seleccionado es:' + this.numeroDestinoSeleccion);
        this.navCtrl.navigateForward('/home/' + this.numeroDestinoSeleccion);
    } else {
       this.mostrarError('Favor seleccione el número de destino.');
    }
  }
}
