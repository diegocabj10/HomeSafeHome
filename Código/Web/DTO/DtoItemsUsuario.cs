using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoItemsUsuario
    {
        public string Usuario { get; set; }
        public string Clave { get; set; }
        public List<int> IdRoles { get; set; }
        public string DbSesionId { get; set; }
        public DateTime UltimoAcceso { get; set; }
        public int Accesos { get; set; }  // cantidad de accesos a cualquier webservice
        public DtoUsuario DtoUsuarioLogueado { get; set; }
        public DateTime FechaTopeAcceso { get; set; }
        public int ContadorTopeAcceso { get; set; }
    }
}
