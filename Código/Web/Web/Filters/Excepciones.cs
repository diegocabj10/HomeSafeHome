using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Web.Filters
{
    public class Excepciones: ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            //Log error
          
            context.Response = context.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Ha ocurrido un error en el sistema, intente nuevamente");
        }
    }
}