/** Constantes para el menu principal HOME
 * Creado 25 Agosto 2019 fin 3er Sprint
 */
export const OPERACIONES = {
    numeroDestinoProveedor:  '88232',
    nombreProveedor: 'UNPLUGGED',
    preSaldo:  'DES S',
    preMovimiento:  'DES M',
    preTransferencia:  'DES T',
    prePagoTDC:  'DES P',
    preAvanceEfectivo:  'DES A',
    prePagoMovilPAT:  'DES PAT',
    prePagoMovilPAC:  'DES PAC',
    preRecargasTelefonicas:  'DES RT',
    preRecargasDirectv:  'DES RD',
    preDirectvPrePago:  'DES RDD',
    preDirectvPrevioPago:  'DES RDP',
    preSuspensionTDD:  'DES STD'
}

/** mensaje pie de pagina principal (HOME) */
let fecha = new Date();
let year = fecha.getFullYear();
export const MENSAJE_PAGINAS = {

    mensajeFooter1: 'Centro de atención telefónica: 0800-597.2222 ' ,
    mensajeFooter2:  ' exterior: +58 212-579-2222',
    mensajeFooter3: ' Todos los derechos reservados ' + year,
    mensajeFooter4: ' BFC Banco Fondo Común, C.A. Banco Universal',
    mensajeFooter5: ' RIF. J-00072306-0'
}

/** Mensaje pie de pagina de las operaciones*/
export const MENSAJE_SUBPAGINAS = {

    mensajeFooter1: 'Esta aplicación utiliza mensajería de texto para' ,
    mensajeFooter2:  ' comunicarse con BFC Banco Fondo Común, cada',
    mensajeFooter3: ' transacción realizada empleará un mensaje de texto ' ,
    mensajeFooter4: '  SMS Premium.',    
}