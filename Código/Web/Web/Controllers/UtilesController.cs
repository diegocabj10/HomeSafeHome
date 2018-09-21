using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using DTO;
using System.Web;
using System.Dynamic;

namespace Web.Controllers
{

    public class UtilesController : ApiController
    {
        
        /// <summary>
        /// Metodo que genera token en caso de no tener.
        /// </summary>
        /// <returns></returns> 

      
        public virtual IHttpActionResult PostLogin(DtoUsuario usuario)
        {
            DtoUsuario UsuarioLogueado = FuncionesSeguridad.LoginInterno(usuario.Email, usuario.Password);
            List<DtoMenuPadre> menuesPadres;
            List<DtoMenuHijo> menuesHijos;
            //Cargo menues
            FuncionesSeguridad.CrearMenuDinamico2(out menuesHijos, out menuesPadres, UsuarioLogueado);

            foreach (var padre in menuesPadres)
            {
                padre.Hijos = menuesHijos.Where(x => x.IdProcesoPadre == padre.IdProceso).ToList();
            }

            IDictionary<string, object> resultado = new ExpandoObject();
            resultado["Usuario"] = UsuarioLogueado;
            resultado["Menu"] = menuesPadres; 
            return Ok(resultado);
        }
    }

    class TokenObject
    {
        public List<DtoMenuPadre> menu { get; set; }
        public DtoUsuario dtoUs { get; set; }
    }

}
