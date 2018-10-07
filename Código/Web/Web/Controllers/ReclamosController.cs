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
    public class ReclamosController : BaseController<DtoReclamo, rnAbmBase<DtoReclamo>>
    {
        public ReclamosController()
        {
            base.Setup(Entidad: "Reclamos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
    }
}
