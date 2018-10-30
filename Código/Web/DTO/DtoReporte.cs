using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoReporte : DtoAbmBase
    {
        public string Senial { get; set; }
        public int IdUsuario { get; set; }
        public int Cantidad { get; set; }
        public DateTime Ultimo { get; set; }
    }
}
