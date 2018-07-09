using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DTO
{

    public class DtoPerfil: DtoAbmBase
    {
        [Required(ErrorMessage = "El nombre es un dato requerido")]
        [MaxLength(200)]
        public string Nombre { get; set; }
        //[Required(ErrorMessage = "La lista de procesos es un dato requerido")]
        //[MinLength(1)]
        public List<int> IdProcesos { get; set; }

    }
}
