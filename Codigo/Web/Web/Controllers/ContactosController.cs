using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BL;
using System.Dynamic;
using System.Collections;

namespace Web.Controllers
{
    public class ContactosController : BaseController<DtoContacto, rnAbmBase<DtoContacto>>
    {
        public ContactosController()
        {
            base.Setup(Entidad: "Contactos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }

        public IHttpActionResult GetByEmail([FromUri]string email)
        {
            DtoUsuario DtoFiltro = new DtoUsuario();
            DtoFiltro.Email = email;
            DtoFiltro.NumeroPaginaListado = 1;

            List<DtoUsuario> Lista = Repositorio.CargarDTOs<DtoUsuario, DtoUsuario>("PKG_USUARIOS.PR_GETALL", null, DtoFiltro);

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

        public override IHttpActionResult Post(DtoContacto DtoSel)
        {
            DtoSel.FechaInicio = TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
            return base.Post(DtoSel);
        }
        public IHttpActionResult GetContactos([FromUri] int numeroPagina, int IdUsuario)
        {

            DtoContacto DtoFiltro = new DtoContacto();
            DtoFiltro.IdDuenio = IdUsuario;
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