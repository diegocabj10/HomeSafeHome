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
    public class SenialesController : BaseController<DtoAbmBase, rnAbmBase<DtoAbmBase>>
    {
        public SenialesController()
        {
            base.Setup(Entidad: "Seniales", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
    }
}
