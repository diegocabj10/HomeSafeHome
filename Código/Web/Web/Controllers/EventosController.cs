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
    public class EventosController : BaseController<DtoEvento, rnAbmBase<DtoEvento>>
    {
        public EventosController()
        {
            base.Setup(Entidad: "Eventos", SetIdNumerico: "Seniales,Dispositivos", SetIdNombreIdTipo: "");
        }


        //notificacion.Fecha_Notificacion = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
        public override IHttpActionResult Post(DtoEvento DtoSel)
        {
           
            var Id = int.Parse(DtoSel.Id);
            if (Id == 0)
            {
                DtoSel.FechaEvento = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
                rnAbm.PostPut(DtoSel);
            }
            else
            {
                var message = string.Format("El registro con el identificador = {0} no es correcto", DtoSel.Id);
                return Content(HttpStatusCode.BadRequest, message);
            }

            return CreatedAtRoute("", new { id = DtoSel.Id }, DtoSel);
        }

        public override IHttpActionResult GetById(int Id)
        {
            DtoNotificacion Dto = Repositorio.CargarDTOs<DtoNotificacion>("PKG_NOTIFICACIONES.PR_GETBYID", new object[] { Id }).FirstOrDefault();
            if (Dto == null)
            {
                var message = string.Format("El registro con el identificador = {0} no fue encontrado", Id);
                return Content(HttpStatusCode.NotFound, message);
            }
            else
            {
                return Ok(Dto);
            }

        }

        public IHttpActionResult GetNotificaciones([FromUri] int numeroPagina, int idUsuario, string Titulo = "", string Mensaje = "")
        {

            DtoNotificacion DtoFiltro = new DtoNotificacion();
            DtoFiltro.IdUsuario = idUsuario;
            DtoFiltro.NumeroPaginaListado = numeroPagina;
            
            IList Lista = Repositorio.CargarDTOs<DtoNotificacion, DtoNotificacion>("PKG_NOTIFICACIONES.PR_GETALL", null, DtoFiltro);
           
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