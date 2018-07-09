using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO
{

    public class DtoItemsSeguridad
    {
        public DtoItemsSeguridad()
        {
            MenuesHijos = new List<DtoMenuHijo>();
            MenuesPadres = new List<DtoMenuPadre>();
            PerfilesProcesos = new List<DtoPerfilesProcesos>();
            Procesos = new List<DtoProcesos>();
        }
        public List<DtoMenuHijo> MenuesHijos { get; set; }
        public List<DtoMenuPadre> MenuesPadres { get; set; }
        public List<DtoPerfilesProcesos> PerfilesProcesos { get; set; }
        public List<DtoProcesos> Procesos { get; set; }
    }
}