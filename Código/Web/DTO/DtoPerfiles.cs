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
#pragma warning disable CS0108 // 'DtoPerfil.Nombre' oculta el miembro heredado 'DtoAbmBase.Nombre'. Use la palabra clave new si su intención era ocultarlo.
        public string Nombre { get; set; }
#pragma warning restore CS0108 // 'DtoPerfil.Nombre' oculta el miembro heredado 'DtoAbmBase.Nombre'. Use la palabra clave new si su intención era ocultarlo.
        //[Required(ErrorMessage = "La lista de procesos es un dato requerido")]
        //[MinLength(1)]
        public List<int> IdProcesos { get; set; }

    }
}
