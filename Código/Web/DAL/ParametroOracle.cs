using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Client;
//using Oracle.ManagedDataAccess.Client;


namespace DAL
{
    public class ParametroOracle
    {
        public string Nombre { get; set; }
        public System.Data.DbType TipoDb { get; set; }
        public OracleDbType TipoOra { get; set; }
        public System.Data.ParameterDirection Direccion { get; set; }
        //public bool IsNullable { get; set; }
        public int Size { get; set; }
        public OracleCollectionType ColeccionTipo { get; set; }
    }
}
