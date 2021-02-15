using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BL;
using System.Collections;
using System.Dynamic;

namespace Web.Controllers
{
    public class NotificacionesController : BaseController<DtoNotificacion, rnAbmBase<DtoNotificacion>>
    {
        public NotificacionesController()
        {
            base.Setup(Entidad: "Notificaciones", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
        public IHttpActionResult GetNotificaciones([FromUri] int numeroPagina, int idUsuario,string Titulo = "", string Mensaje = "")
        {
          
            DtoNotificacion DtoFiltro = new DtoNotificacion();
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
