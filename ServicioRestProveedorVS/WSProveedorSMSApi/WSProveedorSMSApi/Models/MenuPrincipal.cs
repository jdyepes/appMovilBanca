using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WSProveedorSMSApi.Models
{
    /// <summary>
    /// Se uiliza para crear un menu dimamico para la app movil TUBFC SMS
    /// Fecha Viernes 20/dic/2019
    /// </summary>
    public class MenuPrincipal
    {
        public int _id { get; set; }
        public int _posicion { get; set; } // orden donde se mostrara en el menu
        public string _titulo { get; set; } // nombre a mostrar en la opcion del menu principal
        public string _descripcion { get; set; }// breve descripcion del mismos
        public bool _disponible { get; set; } // estatus de si se habilita o no para ser mostrado
        

        public List<MenuPrincipal> _opciones { get; set; } // opciones submenu del menu principal
    }
}