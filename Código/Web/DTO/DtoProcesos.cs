using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DTO
{
    public class DtoProcesos : DtoAbmBase
    {

        public int? IdProceso
        {
            get
            {
                int nro = 0;
                int.TryParse(Id, out nro);
                if (nro == 0)
                    return null;
                else
                    return nro;
            }
        }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
#pragma warning disable CS0108 // 'DtoProcesos.Nombre' oculta el miembro heredado 'DtoAbmBase.Nombre'. Use la palabra clave new si su intención era ocultarlo.
        public string Nombre { get; set; }
#pragma warning restore CS0108 // 'DtoProcesos.Nombre' oculta el miembro heredado 'DtoAbmBase.Nombre'. Use la palabra clave new si su intención era ocultarlo.
        public string MenuPadre { get; set; }
        public int? OrdenMenu { get; set; }
        public string Url { get; set; }
        public int? IdProcesoPadre { get; set; }

    }
}
