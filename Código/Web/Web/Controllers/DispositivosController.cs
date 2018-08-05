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
    public class DispositivosController : BaseController<DtoAbmBase, rnAbmBase<DtoAbmBase>>
    {
        public DispositivosController()
        {
            base.Setup(Entidad: "Dispositivos", SetIdNumerico: "", SetIdNombreIdTipo: "");
        }
    }
}
