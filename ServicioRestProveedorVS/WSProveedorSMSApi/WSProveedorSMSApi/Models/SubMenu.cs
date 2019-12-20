using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSProveedorSMSApi.Models
{
    public class SubMenu : MenuPrincipal
    {
        public string _prefijo { get; set; } // prefijo o nemotecnico de la operacion. Ej S C1 (Saldo)
        public bool _disponible { get; set; } // estatus de si se habilita o no para ser mostrado 
    }
}