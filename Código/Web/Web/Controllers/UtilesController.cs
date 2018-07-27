using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using DTO;
using System.Web;

namespace Web.Controllers
{
    [RoutePrefix("api/Utiles")]
    public class UtilesController : ApiController
    {
        
        /// <summary>
        /// Metodo que genera token en caso de no tener.
        /// </summary>
        /// <returns></returns> 

        [HttpGet]
        public virtual IHttpActionResult GetLogin()
        {
            List<DtoMenuPadre> menuesPadres;
            List<DtoMenuHijo> menuesHijos;
            //Cargo menues
            FuncionesSeguridad.CrearMenuDinamico2(out menuesHijos, out menuesPadres);

            foreach (var padre in menuesPadres)
            {
                padre.Hijos = menuesHijos.Where(x => x.IdProcesoPadre == padre.IdProceso).ToList();
            }

            var ob = new TokenObject
            {
                menu = menuesPadres,
                dtoUs = ManejoEstado.DtoUsuarioLogueado
            };

            return Ok(ob);
        }
    }

    class TokenObject
    {
        public List<DtoMenuPadre> menu { get; set; }
        public DtoUsuario dtoUs { get; set; }
    }

}
