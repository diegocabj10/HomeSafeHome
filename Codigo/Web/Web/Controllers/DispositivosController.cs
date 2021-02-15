using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using DTO;
namespace Web.Controllers
{
    public class DispositivosController : BaseController<DtoDispositivo, rnAbmBase<DtoDispositivo>>
    {
        public DispositivosController()
        {
            base.Setup(Entidad: "Dispositivos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
        
        public IHttpActionResult GetByUsuario([FromUri] int numeroPagina, int idUsuario)
        {
            DtoDispositivo DtoFiltro = new DtoDispositivo();
            DtoFiltro.IdUsuario = idUsuario;
            DtoFiltro.NumeroPaginaListado = numeroPagina;
            
            List<DtoDispositivo> Lista = Repositorio.CargarDTOs<DtoDispositivo, DtoDispositivo>("PKG_DISPOSITIVOS.PR_GETBYUSUARIO", null, DtoFiltro);

            var TotalRegistrosListado = DtoFiltro.TotalRegistrosListado;

            if (TotalRegistrosListado == 0)
            {
                var message = string.Format("No existen registros con los filtros aplicados.");
                return Content(HttpStatusCode.NotFound, message);
            }

            IDictionary<string, object> resultado = new ExpandoObject();
            resultado["Lista"] = Lista;
            resultado["TotalRegistrosListado"] = TotalRegistrosListado;
            return Ok(resultado);
        }

        public override IHttpActionResult Post(DtoDispositivo DtoSel)
        {
            DtoSel.FechaInicio = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
            return base.Post(DtoSel);
        }
       

    }
}
