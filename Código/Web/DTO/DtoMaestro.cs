using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DtoMaestro : DtoAbmBase
    {
        //public string Codigo { get; set; }
        [Required(ErrorMessage = "La descripción es un dato requerido")]
        public string Descripcion { get; set; }
   
    }
}
