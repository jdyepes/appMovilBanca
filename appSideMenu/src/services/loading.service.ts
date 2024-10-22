import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

/** Clase creada sab 21 sep 19
 * Muestra el spinner de carga utilizado para extraer los numeros
 * de destino del proveedor en la vista numero-destino
 */
export class LoadingService {
    isLoading = false;
    constructor(
        public loadingController: LoadingController
    ) { }

    async loadingPresent() {
        this.isLoading = true;
        return await this.loadingController.create({
            message: 'Por favor espere...',
            spinner: 'circles',
            translucent: true
        }).then(a => {
            a.present().then(() => {
                console.log('loading presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort laoding'));
                }
            });
        });
    }

    async loadingDismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
}
