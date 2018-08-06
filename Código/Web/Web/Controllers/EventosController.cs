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
        public IHttpActionResult GetAll([FromUri] int numeroPagina, int? Dispositivo, int? Senial, string Activo = "")
        {
            DtoEvento DtoFiltro = new DtoEvento();
            DtoFiltro.IdSenial = Senial;
            DtoFiltro.IdDispositivo = Dispositivo;
            DtoFiltro.Activo = Activo;
            DtoFiltro.NumeroPaginaListado = numeroPagina;

            IList Lista = rnAbm.GetAll(DtoFiltro);

            var TotalRegistrosListado = (DtoFiltro as DtoAbmBase).TotalRegistrosListado;

            if (TotalRegistrosListado == 0)
            {
                var message = string.Format("No existen registros con los filtros aplicados.");
                return Content(HttpStatusCode.NotFound, message);
            }
            //foreach (DtoAbmBase item in Lista)
            //{
            //    item.Id = FuncionesSeguridad.EncriptarWeb(item.Id); // encriptar id;                  
            //}
            IDictionary<string, object> resultado = new ExpandoObject();
            resultado["Lista"] = Lista;
            resultado["TotalRegistrosListado"] = TotalRegistrosListado;
            return Ok(resultado);
        }

    }
}