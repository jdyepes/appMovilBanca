// Creado 3er Sprint 24/Agosto/2019
// Url completa : http://localhost:60978/api/proveedor/obtenerProveedor

export const PATH = {
    PROVEEDOR: '/proveedor'
};

/** Se establece el metodo a consumir en el API rest */
export const METHOD = {
    ObtenerProveedor: '/obtenerProveedores'
};

/** Se establece el timeout de la peticion REST */
export const TIMEOUT = {
    ObtenerTimeOut: 3500 // esta en milisegundos
};

export const AppUrlBase = {
   //appUrlBase: 'http://localhost:60978/api'
   /** Publicado en mi servidor local en IIS */
   /** Local */  
   //appUrlBase: 'http://192.168.0.103/ServicioRestProveedorSMS/api'
   /** Local desarrollo BFC */
   appUrlBase: 'http://10.60.102.84/ServicioRestProveedorSMS/api'
};
