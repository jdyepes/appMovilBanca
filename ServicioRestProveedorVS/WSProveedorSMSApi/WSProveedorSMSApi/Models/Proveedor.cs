using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSProveedorSMSApi.Models
{
    public class Proveedor
    {      
        public int _id { get; set; }
        public String _nombre { get; set; }
        public String _numero { get; set; }
        public bool _disponible { get; set; }

        public Proveedor(int id, String nombre, String numero, bool disponible)
        {
            _id = id;
            _nombre = nombre;
            _numero = numero;
            _disponible = disponible;
        }
    }
}