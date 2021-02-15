using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoAviso : DtoAbmBase
    {
        public int IdUsuario { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public DateTime FechaAviso { get; set; }
    }
}
