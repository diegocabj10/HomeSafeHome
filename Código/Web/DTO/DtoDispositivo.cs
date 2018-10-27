using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoDispositivo : DtoAbmBase
    {
        public DateTime? FechaInicio { get; set; }      
        public int IdUsuario { get; set; }
        public int IdDispositivo { get; set; }
        public DateTime? FechaAfueraCasa { get; set; }

    }
}
