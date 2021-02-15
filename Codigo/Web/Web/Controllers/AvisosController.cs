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
    public class AvisosController : BaseController<DtoAviso, rnAbmBase<DtoAviso>>
    {
        public AvisosController()
        {
            base.Setup(Entidad: "Avisos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }

        public override IHttpActionResult Post(DtoAviso DtoSel)
        {
            DtoSel.FechaAviso = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
            return base.Post(DtoSel);
        }

        public IHttpActionResult GetAvisos([FromUri] int numeroPagina, int idUsuario, string Titulo = "", string Mensaje = "")
        {

            DtoAviso DtoFiltro = new DtoAviso();
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
