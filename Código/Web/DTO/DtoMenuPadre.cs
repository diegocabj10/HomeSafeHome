using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO
{    
    public class DtoMenuPadre
    {
        public int IdProceso { get; set; }
        public string Nombre { get; set; }
        public int Orden { get; set; }
        public List<DtoMenuHijo> Hijos { get; set; }
        public DtoMenuPadre()
        {
            Hijos = new List<DtoMenuHijo>();
        }
    }
}
