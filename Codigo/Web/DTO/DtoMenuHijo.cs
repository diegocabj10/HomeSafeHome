using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO
{
    public class DtoMenuHijo
    {
        public int IdProceso { get; set; }
        public string Nombre { get; set; }
        public string URL { get; set; }
        public int IdProcesoPadre { get; set; }
        public int OrdenMenu { get; set; }
    }
}
