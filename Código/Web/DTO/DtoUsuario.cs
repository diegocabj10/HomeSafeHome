using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO{
    public class DtoUsuario: DtoAbmBase
    {        
        public string Email { get; set; }
        public string Password { get; set; }

        public DateTime? FechaInicio { get; set; }
        public DateTime? UltimoLogin { get; set; }
        public List<int> IdPerfiles { get; set; }
        public string PersonaNombre { get; set; }
        public string DbSessionId { get; set; }
        public string SessionId { get; set; }
      
    }
}
