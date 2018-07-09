using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using DTO;
namespace Web.Controllers
{
    [RoutePrefix("api/Eventos")]
    public class EventosController : BaseController<DtoAbmBase, rnAbmBase<DtoAbmBase>>
    {
        public EventosController()
        {
            base.Setup(Entidad: "Eventos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
    }
}