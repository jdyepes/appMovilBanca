/** Constantes para el menu principal HOME
 * Creado 25 Agosto 2019 fin 3er Sprint
 */
export const OPERACIONES = {
    numeroDestinoProveedor:  '88232',
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

let fecha = new Date();
let year = fecha.getFullYear();
export const MENSAJE_PAGINAS = {
   
    mensajeFooter: 'Centro de atención telefónica: 0800-597.2222 ' + '\n'+
    ' exterior: +58 212-579-2222' + '\n'+
    ' Todos los derechos reservados ' + year +
    ' BFC Banco Fondo Común, C.A. Banco Universal' + 
    ' RIF. J-00072306-0'
}