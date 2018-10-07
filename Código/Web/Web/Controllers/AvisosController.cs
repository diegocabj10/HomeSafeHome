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
    public class AvisosController : BaseController<DtoAviso, rnAbmBase<DtoAviso>>
    {
        public AvisosController()
        {
            base.Setup(Entidad: "Avisos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
    }
}
