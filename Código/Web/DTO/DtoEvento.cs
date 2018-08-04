using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DTO
{

    public class DtoEvento : DtoAbmBase
    {
        [Required]
        public DateTime FechaEvento { get; set; }
        [Required]
        public int IdSenial { get; set; }
        [Required]
        public int IdDispositivo { get; set; }
        [Required]
        public int Valor { get; set; }

    }
}
