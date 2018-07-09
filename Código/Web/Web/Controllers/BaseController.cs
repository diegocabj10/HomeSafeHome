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
    public class BaseController<Tentidad, Trepositorio> : ApiController where Tentidad : new() where Trepositorio : rnAbmBase<Tentidad>, new()
    {
        protected rnAbmBase<Tentidad> rnAbm;
        protected string Entidad;
        protected string FormatoReporte;
        protected string SetIdNumerico;
        protected string SetIdNombreIdTipo;
        protected string SetIdString;
        protected List<int> IdRoles;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Entidad"></param>
        /// <param name="SetIdNumerico"></param>
        /// <param name="NombreProcSet"></param>
        /// <param name="IdRoles"></param>
        public void Setup(string Entidad, string SetIdNumerico = "", string SetIdString = "", string SetIdNombreIdTipo = "", string NombreProcSet = "", List<int> IdRoles = null)
        {
            this.Entidad = Entidad;
            this.SetIdNombreIdTipo = SetIdNombreIdTipo;
            this.SetIdNumerico = SetIdNumerico;
            this.SetIdString = SetIdString;
            this.IdRoles = IdRoles;
            rnAbm = new Trepositorio();
            rnAbm.Setup(Entidad);
        }
        /// <summary>
        ///En el procedimiento de Base de Datos deben estar ordenados cada uno de los SYS_REFCURSOR:
        //1.IdNumerico
        //2.IdString
        //3.SetIdNombreIdTipo
        //Cuando los llamo desde base.Setup tambien deben estar ordenados de la forma anteriormente nombrada
        /// </summary>
        /// <returns>Lista de Listas de combos</returns>
        [Route("GetCombos")]
        public virtual IHttpActionResult GetCombos()
        {
            List<List<object>> Listas = rnAbm.SetIds(SetIdNumerico, SetIdString, SetIdNombreIdTipo, IdRoles);
            int i = 0;
            IDictionary<string, object> resultado = new ExpandoObject();
            var items = SetIdNumerico.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            for (int j = 0; j < items.Length; j++)
            {
                resultado[items[j]] = Listas[i];
                i++;
            }
            items = SetIdString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            for (int j = 0; j < items.Length; j++)
            {
                resultado[items[j]] = Listas[i];
                i++;
            }
            items = SetIdNombreIdTipo.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            for (int j = 0; j < items.Length; j++)
            {
                resultado[items[j]] = Listas[i];
                i++;
            }
            if (Listas == null)
            {
                var message = string.Format("No existen listas para los combos de selección.");
                return Content(HttpStatusCode.NotFound, message);
            }
            return Ok(resultado);
        }
        [Route("GetById/{Id:int}")]
        public virtual IHttpActionResult GetById(int Id)
        {
            Tentidad Dto = rnAbm.BuscarPorId(Id);
            if (Dto == null)
            {
                var message = string.Format("El registro con el identificador = {0} no fue encontrado", Id);
                return Content(HttpStatusCode.NotFound, message);
            }
            else
            {
                return Ok(Dto);
            }

        }

        public virtual IHttpActionResult GetAll([FromUri]int NumeroPagListado)
        {
            Tentidad DtoFiltro = new Tentidad();
            DtoAbmBase dto = DtoFiltro as DtoAbmBase;
            dto.NumeroPaginaListado = NumeroPagListado;
            IList Lista = rnAbm.Buscar(DtoFiltro);

            var TotalRegistrosListado = (DtoFiltro as DtoAbmBase).TotalRegistrosListado;

            if (TotalRegistrosListado == 0)
            {
                var message = string.Format("No existen registros con los filtros aplicados.");
                return Content(HttpStatusCode.NotFound, message);
            }
            //foreach (DtoAbmBase item in Lista)
            //{
            //    item.Id = FuncionesSeguridad.EncriptarWeb(item.Id); // encriptar id;                  
            //}
            IDictionary<string, object> resultado = new ExpandoObject();
            resultado["Lista"] = Lista;
            resultado["TotalRegistrosListado"] = TotalRegistrosListado;
            return Ok(resultado);
        }


        public virtual IHttpActionResult Post(Tentidad DtoSel)
        {
            DtoAbmBase dto = DtoSel as DtoAbmBase;
            var Id = int.Parse(dto.Id);
            if (Id == 0)
            {
                rnAbm.Grabar(DtoSel);
            }
            else
            {
                var message = string.Format("El registro con el identificador = {0} no es correcto", dto.Id);
                return Content(HttpStatusCode.BadRequest, message);
            }

            return CreatedAtRoute("", new { id = dto.Id }, DtoSel);
        }

        public virtual IHttpActionResult Put(Tentidad DtoSel)
        {
            DtoAbmBase dto = DtoSel as DtoAbmBase;
            rnAbm.Grabar(DtoSel);
            return Content(HttpStatusCode.Accepted, DtoSel);

        }

        public virtual IHttpActionResult Delete(DtoAbmBase Dto)
        {
            DtoAbmBase dto = (DtoAbmBase)Dto;           
            Dto.Activo = Dto.Activo == "SI" ? "NO" : "SI";  // invertir activo
            rnAbm.ActivarDesactivar(Dto);
            return Ok();
        }

        //public virtual FileResult ImprimirPdf(string titulo, Tentidad DtoFiltro)
        //{
        //    (DtoFiltro as DtoAbmBase).NumeroPaginaListado = 1000;
        //    DataTable dt = new DataTable();
        //    dt = Repositorio.ExecuteTabla("pr_" + Entidad + "_sf", null, DtoFiltro);


        //    List<object> modelo = new List<object>();
        //    List<Dictionary<string, object>> datos = new List<Dictionary<string, object>>();
        //    Repositorio.ExecuteJqGrid("", null, modelo, datos, "", "DESCRIPCION", "ACTIVO", dt, "");

        //    byte[] contents = ReporteMaestro.CrearDocumento(modelo, datos, titulo).ToArray();

        //    Response.AddHeader("Content-Disposition", "inline");
        //    Response.AddHeader("filename", "reporte.pdf");
        //    return File(contents, "application/pdf");
        //}

        //public virtual IHttpActionResult ImprimirExcel(Tentidad DtoFiltro)
        //{

        //    DataTable dt = new DataTable();

        //    dt = Repositorio.ExecuteTabla("pr_" + Entidad + "_i", null, DtoFiltro);


        //   // string s = new DateTime(int.Parse(periodoExcel.Substring(0, 4)), int.Parse(periodoExcel.Substring(4, 2)), 1).ToString("MMMM_yyyy");

        //    string nombreUsuario = ManejoEstado.DtoUsuarioLogueado.Cuil;
        //    //string path = ReporteExcel.CrearExcel(Entidad, nombreUsuario, dt);
        //    string path = ReporteExcel.exportToExcel(Entidad, nombreUsuario, dt);

        //    //byte[] fileBytes = System.IO.File.ReadAllBytes(path);


        //    //return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", s + "-" + FormatoReporte);// "application/vnd.ms-excel"

        //    Response.AddHeader("Content-Disposition", "inline;filename=" + s + "-" + FormatoReporte);
        //    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //    Response.WriteFile(path);

        //    Response.End();
        //    System.IO.File.Delete(path);
        //}

    }
}