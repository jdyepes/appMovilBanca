import { Component, OnInit } from '@angular/core';
import { OPERACIONES, MENSAJE_PAGINAS } from '../constantes/prefijo-opciones';

import { Platform, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ProviderService} from '../provider-service';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/Proveedor';
@Component({
  selector: 'app-numero-destino',
  templateUrl: './numero-destino.page.html',
  styleUrls: ['./numero-destino.page.scss'],
})
export class NumeroDestinoPage {

  numeroDestinoProveedor: string = OPERACIONES.numeroDestinoProveedor;
  
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
    private navCtrl: NavController
  ) {
    this.cargarProveedor();
    this.initializeApp();
    this.numerosDestinoProveedor = [];
    this.numeroDestinoProveedor = OPERACIONES.numeroDestinoProveedor;
  }

  ionViewDidLoad() {
    this.cargarProveedor();
  }

  // antes de entrar a la app
  ionViewWillEnter() {
    
  }

/** Extrae los datos del proveedor mediante la peticion rest y lo mapea
 * a la clase Proveedores
 */
  async cargarProveedor() {
    let proAux = new Proveedor();
    await this.providerService.getProveedor()
      .subscribe(
        (data) => { // Success
          console.log(data);
          this.proveedor = data;
         // this.fillListInterface();
          
          let numberPattern = new RegExp(/^\d*$/);
      
          for (var i = 0; i< (this.proveedor.length); i++)
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
          if(numberPattern.test(this.numeroDestinoSeleccion) && this.numeroDestinoSeleccion != '' && this.numeroDestinoSeleccion != null )
          {
            this.numeroDestinoProveedor = proAux.$numero;            
          }            
        },
        (error) => {
          console.error(error);
          this.numeroDestinoProveedor = OPERACIONES.numeroDestinoProveedor;
          proAux = new Proveedor();  
          proAux.$id = 1;
              proAux.$nombre = '';
              proAux.$numero = this.numeroDestinoProveedor ;
              proAux.$disponible = true;              // hombres ricos 
              this.numerosDestinoProveedor.push(proAux);
        }
      );
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
    if(this.numeroDestinoSeleccion != '' && this.numeroDestinoSeleccion != null )
    {
        console.log('el valor seleccionado es:' + this.numeroDestinoSeleccion);
        this.navCtrl.navigateForward('/home/' + this.numeroDestinoSeleccion);        
    } 
    else 
    {
       this.mostrarError('Favor seleccione el número de destino.');
    }
  }
}
