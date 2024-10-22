using System;
using System.Collections.Generic;
using System.Linq;
//using System.Web;
//using System.Web.Mvc;
using WSProveedorSMSApi.Models;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WSProveedorSMSApi.Controllers
{   
   // [RoutePrefix("api/books")]
    public class ProveedorController : ApiController
    {
        // GET api/proveedor/obtenerProveedor
        [HttpGet]
        public HttpResponseMessage obtenerProveedor()
        {
            try
            {
                /// lee desde el archivo de configuracion los numeros de destino del proveedor
                Proveedor pro = new Proveedor(
                    Convert.ToInt32(ConfigurationManager.AppSettings.Get("idProveedor")),
                    ConfigurationManager.AppSettings.Get("nombreProveedor"),
                    ConfigurationManager.AppSettings.Get("numeroProveedor"),
                    Convert.ToBoolean(ConfigurationManager.AppSettings.Get("disponibleProveedor"))
                    );
                return Request.CreateResponse(HttpStatusCode.OK,pro);
            } 
            catch (Exception ex)
            {
                var message = string.Format("No se pudo extraer el proveedor. El error es: " + ex.Message );
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
            }           
        }

        // GET api/proveedor/obtenerProveedores
        [HttpGet]
        public HttpResponseMessage obtenerProveedores()
        {
            try
            {
                List<Proveedor> proList = new List<Proveedor>
                    { 
                        new Proveedor(
                        Convert.ToInt32(ConfigurationManager.AppSettings.Get("idProveedor")),
                        ConfigurationManager.AppSettings.Get("nombreProveedor"),
                        ConfigurationManager.AppSettings.Get("numeroProveedor"),
                        Convert.ToBoolean(ConfigurationManager.AppSettings.Get("disponibleProveedor"))
                        ),
                        new Proveedor(
                        Convert.ToInt32(ConfigurationManager.AppSettings.Get("idProveedor2")),
                        ConfigurationManager.AppSettings.Get("nombreProveedor2"),
                        ConfigurationManager.AppSettings.Get("numeroProveedor2"),
                        Convert.ToBoolean(ConfigurationManager.AppSettings.Get("disponibleProveedor2"))
                        ),
                    };
                return Request.CreateResponse(HttpStatusCode.OK, proList);
            }
            catch (Exception ex)
            {
                var message = string.Format("No se pudo extraer el proveedor. El error es: " + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, message);
            }
        }
    }
}

