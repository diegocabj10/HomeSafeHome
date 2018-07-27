using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Descripción breve de IDtoAbm
/// </summary>
namespace DTO
{
    public class DtoAbmBase
    {
        [Required(ErrorMessage = "El Id es un dato requerido")]
        public virtual string Id { get; set; }
        public string Nombre { get; set; }
        public virtual DateTime? FechaBaja { get; set; }
        public virtual string Activo { get; set; }
        public virtual int NumeroPaginaListado { get; set; }  // No es parte de la entidad, simplemente para paginar listado
        public virtual int TotalRegistrosListado { get; set; }  // No es parte de la entidad, simplemente para paginar listado
    }
}