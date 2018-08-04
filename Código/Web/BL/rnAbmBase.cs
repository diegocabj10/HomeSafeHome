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

     

        public List<List<object>> GetCombos(string setIdNumerico, string setIdString, string SetIdNombreIdTipo, List<int> IdRoles = null)
        {
            List<List<object>> listas = new List<List<object>>();
            object[] parametros = null;
            if (IdRoles != null)
                parametros = new object[] { IdRoles.ToArray() };
            Repositorio.ExecuteReader("PKG_" + Entidad + ".PR_GETCOMBOS", parametros, delegate (IDataReader dred)
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


        public virtual IList GetAll(Tentidad Filtro)
        {
            var lista = Repositorio.CargarDTOs<Tentidad, Tentidad>("PKG_" + Entidad + ".PR_GETALL", null, Filtro);
            return lista;
        }


        public virtual Tentidad GetById(int Id)
        {
            return Repositorio.CargarDTOs<Tentidad>("PKG_" + Entidad + ".PR_GETBYID", new object[] { Id }).FirstOrDefault();
        }

        public virtual void PostPut(Tentidad dto)
        {
            Repositorio.ExecuteNonQuery("PKG_" + Entidad + ".PR_POSTPUT", dto);
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

        public virtual void Delete(DtoAbmBase dto)
        {
            Repositorio.ExecuteNonQuery("PKG_" + Entidad + ".PR_DELETE", new object[] { dto.Id, dto.Activo });
        }

    }
}