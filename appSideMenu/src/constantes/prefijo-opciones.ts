/** Constantes para el menu principal HOME
 * Creado 25 Agosto 2019 fin 3er Sprint
 */
export const OPERACIONES = {
    numeroDestinoProveedor:  '88232',
    nombreProveedor: 'UNPLUGGED',
    preSaldo:  'S',
    preMovimiento:  'M',
    preTransferencia:  'T',
    prePagoTDC:  'P',
    preAvanceEfectivo:  'A',
    prePagoMovilPAT:  'PAT',
    prePagoMovilPAC:  'PAC',
    preRecargasTelefonicas:  'RT',
    preRecargasDirectv:  'RD',
    preDirectvPrePago:  'RDD',
    preDirectvPrevioPago:  'RDP',
    preSuspensionTDD:  'STD'
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