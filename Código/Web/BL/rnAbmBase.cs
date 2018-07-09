using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DTO;
using System.Data;

namespace BL
{
    public class rnAbmBase<Tentidad> where Tentidad : new()
    {
        protected string Entidad;

        public void Setup(string Entidad)
        {
            this.Entidad = Entidad;
        }

        /// <summary>
        /// usarlo siempre que devuelva id numerico
        /// </summary>
        /// <returns></returns>
        public virtual List<DtoIdNumericoNombre> SetIdNumericoNombre()
        {
            return Repositorio.CargarDTOs<DtoIdNumericoNombre>("pr_" + Entidad + "_set", null);
        }

        //public virtual List<DtoIdNombreIdTipo> SetIdIndecNombre()
        //{
        //    return Repositorio.CargarDTOs<DtoIdNombreIdTipo>("pr_" + Entidad + "_seti", null);
        //}


        /// <summary>
        /// usarlo siempre que devuelva id numerico
        /// </summary>
        /// <param name="lista"></param>
        /// <returns></returns>
        public virtual List<List<DtoIdNumericoNombre>> SetIdNumericoNombreLista()
        {
            List<List<DtoIdNumericoNombre>> ListaDeLista = Repositorio.CargarDTOsLista<DtoIdNumericoNombre>("pr_" + Entidad + "_set", null);
            return ListaDeLista;
        }

        /// <summary>
        /// usarlo siempre que devuelva id index
        /// </summary>
        /// <returns></returns>
        //public virtual List<List<DtoIdNombreIdTipo>> SetIdIndecNombreLista()
        //{
        //    List<List<DtoIdNombreIdTipo>> ListaDeLista = Repositorio.CargarDTOsLista<DtoIdNombreIdTipo>("pr_" + Entidad + "_seti", null);
        //    return ListaDeLista;
        //}

        public List<List<object>> SetIds(string setIdNumerico, string setIdString, string SetIdNombreIdTipo, List<int> IdRoles = null)
        {
            List<List<object>> listas = new List<List<object>>();
            object[] parametros = null;
            if (IdRoles != null)
                parametros = new object[] { IdRoles.ToArray() };
            Repositorio.ExecuteReader("pr_" + Entidad + "_set", parametros, delegate (IDataReader dred)
            {
                var items = setIdNumerico.Split(new char[] {','}, StringSplitOptions.RemoveEmptyEntries);
                for (int j = 0; j < items.Length; j++)
                {
                    var lista = Repositorio.CargarDTOs<DtoIdNumericoNombre>(dred);
                    listas.Add(lista.Cast<object>().ToList());
                    dred.NextResult();
                }

                items = setIdString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                for (int j = 0; j < items.Length; j++)
                {
                    var lista = Repositorio.CargarDTOs<DtoIdNombre>(dred);
                    listas.Add(lista.Cast<object>().ToList());
                    dred.NextResult();
                }

                items = SetIdNombreIdTipo.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                for (int j = 0; j < items.Length; j++)
                {
                    var lista = Repositorio.CargarDTOs<DtoIdNombreIdTipo>(dred);
                    listas.Add(lista.Cast<object>().ToList());
                    dred.NextResult();
                }

            });
            return listas;
        }


            /// <summary>
            /// usarlo siempre que devuelva id string
            /// </summary>
            /// <returns></returns>
        public virtual List<DtoIdNombre> SetIdNombre()
        {
            return Repositorio.CargarDTOs<DtoIdNombre>("pr_" + Entidad + "_set", null);
        }



        public virtual IList Buscar(Tentidad Filtro)
        {
            var lista = Repositorio.CargarDTOs<Tentidad, Tentidad>("pr_" + Entidad + "_SF", null, Filtro);
            return lista;
        }


        public virtual Tentidad BuscarPorId(int Id)
        {
            return Repositorio.CargarDTOs<Tentidad>("pr_" + Entidad + "_s", new object[] { Id }).FirstOrDefault();
        }

        public virtual void Grabar(Tentidad dto)
        {
            Repositorio.ExecuteNonQuery("pr_" + Entidad + "_g", dto);
        }

        //public virtual void Grabar(Tentidad dto, DtoDomicilioActualizar DtoDomicilio)
        //{
        //    try
        //    {
        //        Repositorio.BeginTrans();
        //        Repositorio.ExecuteNonQuery("pr_" + Entidad + "_g", dto);
        //        DtoDomicilio.Id_Entidad = "RPT" + (dto as DtoAbmBase).Id.ToString();
        //        rnDomicilio.GrabarDomicilioDto(DtoDomicilio);
        //        Repositorio.CommitTrans();
        //    }
        //    catch (Exception)
        //    {
        //        Repositorio.RollBack();
        //        throw;
        //    }
        //}

        public virtual void ActivarDesactivar(DtoAbmBase dto)
        {
            Repositorio.ExecuteNonQuery("pr_" + Entidad + "_dl", new object[] { dto.Id, dto.Activo });
        }

    }
}