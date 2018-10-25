using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoNotificacion : DtoAbmBase
    {
        public DateTime FechaNotificacion { get; set; }
        public int IdUsuario { get; set; }
        public int IdEvento { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public string NombreDispositivo { get; set; }
    }
}
