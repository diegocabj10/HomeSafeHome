using System;
using System.Collections;
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
    public class ReportesController : BaseController<DtoReporte, rnAbmBase<DtoReporte>>
    {
        public ReportesController()
        {
            base.Setup(Entidad: "Reportes", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }

        public IHttpActionResult GetReportes([FromUri] int numeroPagina, int idUsuario)
        {

            DtoReporte DtoFiltro = new DtoReporte();
            DtoFiltro.IdUsuario = idUsuario;
            DtoFiltro.NumeroPaginaListado = numeroPagina;

            IList Lista = rnAbm.GetAll(DtoFiltro);

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
    }
}
