using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoContacto: DtoAbmBase
    {
        public DateTime? FechaInicio { get; set; }
        public string Email { get; set; }
        public int IdDuenio { get; set; }
        public int IdContacto { get; set; }
        public string PersonaNombre { get; set; }
    }
}
