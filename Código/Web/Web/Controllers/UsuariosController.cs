using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BL;
namespace Web.Controllers
{
    public class UsuariosController : BaseController<DtoPerfil, rnAbmBase<DtoPerfil>>
    {
        public UsuariosController()
        {
            base.Setup(Entidad: "Usuarios", SetIdNombreIdTipo: "Perfiles");
        }
        public override IHttpActionResult GetById(int Id)
        {
            // Tentidad Dto = rnAbm.BuscarPorId(Id);
            object[] parametros = new object[] { Id, null };
            DtoUsuario Dto = Repositorio.CargarDTOs<DtoUsuario>("pkg_usuarios.pr_getbyid", parametros).FirstOrDefault();
            if (Dto == null)
            {
                var message = string.Format("El registro con el identificador = {0} no fue encontrado", Id);
                return Content(HttpStatusCode.NotFound, message);
            }
            else
            {
                Dto.IdPerfiles = new List<int>();
                if (parametros[1] != null)
                {
                    foreach (var item in ((decimal[])parametros[1]))
                    {
                        Dto.IdPerfiles.Add((int)item);
                    }

                }
                return Ok(Dto);
            }
        }        
        //public override IHttpActionResult Post(DtoPerfil DtoSel)
        //{
        //    FuncionesSeguridad.EliminarCacheElementosSeguridad();
        //    return base.Post(DtoSel);
        //}

        //public override IHttpActionResult Put(DtoPerfil DtoSel)
        //{
        //   FuncionesSeguridad.EliminarCacheElementosSeguridad();
        //    return base.Put(DtoSel);
        //}
    }
}
