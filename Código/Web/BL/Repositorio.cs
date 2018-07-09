using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Collections.Specialized;
using System.Collections;
using System.Data;
using DTO;
using System.Linq.Expressions;
using System.ComponentModel;
using System.Reflection;
using DAL;

namespace BL
{
    public class Repositorio
    {

        public static void ExecuteReader(string CommandText, object[] Parameters, Action<IDataReader> dMetodoLectura)
        {
            DbOracle.getDbOracle().ExecuteReader(CommandText, Parameters, dMetodoLectura);
        }

        public static DataTable ExecuteTabla(string sql, object[] parametros)
        {
            return DbOracle.getDbOracle().ExecuteTabla(sql, parametros);
        }
        public static DataTable ExecuteTabla<T>(string sql, object[] parametros, T DtoParametros) where T : new()
        {
            return DbOracle.getDbOracle().ExecuteTabla(sql, parametros, DtoParametros);
        }


        public static IEnumerable<Dictionary<string, object>> ExecuteSerialize(string sql, object[] parametros)
        {
            return DbOracle.getDbOracle().ExecuteSerialize(sql, parametros);
        }

        public static int ExecuteNonQuery(string sql, object[] parametros)
        {
            return DbOracle.getDbOracle().ExecuteNonQuery(sql, parametros);
        }
        public static int ExecuteNonQuery<T>(string sql, T DtoParametros) where T : new()
        {
            return DbOracle.getDbOracle().ExecuteNonQuery<T>(sql, CommandType.StoredProcedure, null, DtoParametros);
        }

        public static object ExecuteScalar(string sql, object[] parametros)
        {
            return DbOracle.getDbOracle().ExecuteScalar(sql, parametros);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <param name="Lista1"></param>
        /// <param name="Lista2"></param>
        public static void CargarDTOs<T1,T2>(string sql, object[] parametros, out List<T1> Lista1, out List<T2> Lista2) where T1 : new() where T2 : new()
        {
            List<T1> Lista11 = new List<T1>();
            List<T2> Lista22 = new List<T2>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                Lista11 = CargarDTOs<T1>(dred);
                dred.NextResult();
                Lista22 = CargarDTOs<T2>(dred);
            });
            Lista1 = Lista11;
            Lista2 = Lista22;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <typeparam name="T3"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <param name="Lista1"></param>
        /// <param name="Lista2"></param>
        /// <param name="Lista3"></param>
        public static void CargarDTOs<T1, T2, T3>(string sql, object[] parametros, out List<T1> Lista1, out List<T2> Lista2, out List<T3> Lista3) 
            where T1 : new() where T2 : new() where T3 : new()
        {
            List<T1> Lista11 = new List<T1>();
            List<T2> Lista22 = new List<T2>();
            List<T3> Lista33 = new List<T3>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                Lista11 = CargarDTOs<T1>(dred);
                dred.NextResult();
                Lista22 = CargarDTOs<T2>(dred);
                dred.NextResult();
                Lista33 = CargarDTOs<T3>(dred);
            });
            Lista1 = Lista11;
            Lista2 = Lista22;
            Lista3 = Lista33;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <typeparam name="T3"></typeparam>
        /// <typeparam name="T4"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <param name="Lista1"></param>
        /// <param name="Lista2"></param>
        /// <param name="Lista3"></param>
        /// <param name="Lista4"></param>
        public static void CargarDTOs<T1, T2, T3, T4>(string sql, object[] parametros, out List<T1> Lista1, out List<T2> Lista2, out List<T3> Lista3, out List<T4> Lista4)
            where T1 : new() where T2 : new() where T3 : new() where T4 : new()
        {
            List<T1> Lista11 = new List<T1>();
            List<T2> Lista22 = new List<T2>();
            List<T3> Lista33 = new List<T3>();
            List<T4> Lista44 = new List<T4>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                Lista11 = CargarDTOs<T1>(dred);
                dred.NextResult();
                Lista22 = CargarDTOs<T2>(dred);
                dred.NextResult();
                Lista33 = CargarDTOs<T3>(dred);
                dred.NextResult();
                Lista44 = CargarDTOs<T4>(dred);
            });
            Lista1 = Lista11;
            Lista2 = Lista22;
            Lista3 = Lista33;
            Lista4 = Lista44;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <returns></returns>
        public static List<List<T>> CargarDTOsLista<T>(string sql, object[] parametros)
            where T : new()
        {
            List<List<T>> ListaDeLista = new List<List<T>>();
            List<T> Lista = new List<T>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                do
                {
                    Lista = CargarDTOs<T>(dred);
                    ListaDeLista.Add(Lista);
                } while (dred.NextResult());
            });
            return ListaDeLista;
        }



        /// <summary>
        /// Carga las propiedades del objeto que coincidan con los campos de la consulta
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="U"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <returns></returns>
        public static List<T> CargarDTOs<T>(string sql, object[] parametros) //where T : new() 
        {
            List<T> lista = new List<T>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                lista = CargarDTOs<T>(dred);
            });
            return lista;
        }

        public static List<T> CargarDTOs<T>(string sql, object[] parametros, T type) //where T 
        {
            List<T> lista = new List<T>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                lista = CargarDTOs<T>(dred);
            });
            return lista;
        }

        public static List<T> CargarDTOs<T, U>(string sql, object[] parametros, U DtoParametros) where T : new() where U : new()
        {
            List<T> lista = new List<T>();
            DbOracle.getDbOracle().ExecuteReader(sql, parametros, delegate (IDataReader dred)
            {
                lista = CargarDTOs<T>(dred);
            }, DtoParametros);
            return lista;
        }


        /// <summary>
        /// Carga los propiedades del objeto que coincidan con los campos de la consulta
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dr"></param>
        /// <returns></returns>
        public static List<T> CargarDTOs<T>(IDataReader dr) //where T 
        {
            List<T> lista = new List<T>();
            int opcion = 2;
            //System.Diagnostics.Stopwatch RELOJ = System.Diagnostics.Stopwatch.StartNew();
            if (opcion == 1)
            {
                var propiedades = typeof(T).GetProperties();
                while (dr.Read())
                {
                    //T objEntity = new T();
                    T objEntity = Activator.CreateInstance<T>();


                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        // cargamos solo los campos que coincidan con las propiedades
                        var prop = propiedades.Where(s => s.Name.ToUpper() == dr.GetName(i).ToUpper().Replace("_","")).SingleOrDefault();
                        //verificar que no sea valor nulo y que exista la propiedad
                        if (dr[i] != DBNull.Value && prop != null)
                        {
                            string propiedad = prop.Name;
                            if (prop.PropertyType.Name == "Boolean") // Mapeo de S/N a booleano
                            {
                                prop.SetValue(objEntity, dr[i].ToString() == "S" ? true : false, null);
                            }
                            else if (prop.PropertyType.Name == "String")
                                prop.SetValue(objEntity, dr[i].ToString(), null);

                            else if (prop.PropertyType.FullName.Contains("Int32"))  // para que acepte nuleables
                                prop.SetValue(objEntity, Convert.ToInt32(dr[i]), null);

                            else if (prop.PropertyType.FullName.Contains("Double"))  // para que acepte nuleables
                                prop.SetValue(objEntity, Convert.ToDouble(dr[i]), null);
                            else
                                prop.SetValue(objEntity, dr[i], null);
                        }
                    }
                    lista.Add(objEntity);
                }
            }
            else
            {
                bool ini = false;
                List<Action<object, object>> acc = new List<Action<object, object>>();
                List<string> tipo = new List<string>();
                int cantCampos = 0;
                while (dr.Read())
                {
                    if (!ini)
                    {
                        var propiedades = typeof(T).GetProperties();
                        cantCampos = dr.FieldCount;
                        for (int i = 0; i < cantCampos; i++)
                        {
                            // cargamos solo los campos que coincidan con las propiedades
                            var prop = propiedades.Where(s => s.Name.ToUpper().Replace("_", "") == dr.GetName(i).ToUpper().Replace("_", "")).SingleOrDefault();
                            if (prop != null) //verificar que exista la propiedad
                            {
                                acc.Add(BuildSetAccessor(prop.GetSetMethod()));
                                if (prop.PropertyType.Name == "Boolean") // Mapeo de S/N a booleano
                                    tipo.Add("B");
                                else if (prop.PropertyType.Name == "String" && dr.GetFieldType(i).Name == "String")
                                    tipo.Add("SS");
                                else if (prop.PropertyType.Name == "String")  // existen campos fecha o numericos que luego se guardan en un string
                                    tipo.Add("S");
                                else if (prop.PropertyType.FullName.Contains("Int32") && (dr.GetFieldType(i).Name == "Int16" || dr.GetFieldType(i).Name == "Int32"))
                                    tipo.Add("II");
                                else if (prop.PropertyType.FullName.Contains("Int32"))
                                    tipo.Add("I");
                                else if (prop.PropertyType.FullName.Contains("Double") && dr.GetFieldType(i).Name == "Double")
                                    tipo.Add("DD");
                                else if (prop.PropertyType.FullName.Contains("Double"))
                                    tipo.Add("D");
                                else if (prop.PropertyType.FullName.Contains("Date"))
                                    tipo.Add("DA");
                                else
                                    tipo.Add("O");
                            }
                            else
                            {
                                acc.Add(null);  // no existe propiedad para este campo
                                tipo.Add(null);
                            }
                        }
                        ini = true;
                    }
                    T objEntity = Activator.CreateInstance<T>(); // new T();
                    for (int i = 0; i < cantCampos; i++)
                    {
                        //verificar que no sea valor nulo y que exista la propiedad
                        if (acc[i] != null && dr[i] != DBNull.Value)
                        {
                            if (tipo[i] == "B") // Mapeo de S/N a booleano
                                acc[i](objEntity, dr.GetString(i) == "S" ? true : false);
                            else if (tipo[i] == "SS")
                                acc[i](objEntity, dr.GetString(i));
                            else if (tipo[i] == "S")
                                acc[i](objEntity, dr[i].ToString());
                            else if (tipo[i] == "II")
                                acc[i](objEntity, dr.GetInt32(i));
                            //acc[i](objEntity, Convert.ToInt32(dr[i]));
                            else if (tipo[i] == "I")
                                acc[i](objEntity, Convert.ToInt32(dr[i]));
                            else if (tipo[i] == "DD")
                                acc[i](objEntity, dr.GetDouble(i));
                            else if (tipo[i] == "D")
                                acc[i](objEntity, Convert.ToDouble(dr[i]));
                            else if (tipo[i] == "DA")
                                acc[i](objEntity, dr.GetDateTime(i));
                            else
                                acc[i](objEntity, dr[i]);
                        }
                    }
                    lista.Add(objEntity);
                }
            }
            //RELOJ.Stop();
            return lista;
        }


        static Action<object, object> BuildSetAccessor(MethodInfo method)
        {
            var obj = Expression.Parameter(typeof(object), "o");
            var value = Expression.Parameter(typeof(object));
            Expression<Action<object, object>> expr =
                Expression.Lambda<Action<object, object>>(
                    Expression.Call(
                        Expression.Convert(obj, method.DeclaringType),
                        method,
                        Expression.Convert(value, method.GetParameters()[0].ParameterType)),
                    obj,
                    value);
            return expr.Compile();
        }


        public static void ExecuteJqGrid(string procedimiento, object[] Parametros, List<object> modelo, List<Dictionary<string, object>> datos, string anchoCero = "", string anchoLargo = "", string anchoCorto = "", DataTable dt = null, string ColumnasEliminar= "")
        {
            DataTable tablep = dt;
            if (dt == null)
                tablep = Repositorio.ExecuteTabla(procedimiento, Parametros);
            DataTable table = new DataTable();
            ColumnasEliminar = "," + ColumnasEliminar.ToUpper() + ",";
            if (tablep.Rows.Count == 1)
            {
                table.Columns.Add("Campo", typeof(string));
                table.Columns.Add("Valor", typeof(string));
                for (int i = 0; i < tablep.Columns.Count; i++)
                {
                    var DataRow = table.NewRow();
                    DataRow["Campo"] = tablep.Columns[i].ColumnName;
                    if (ColumnasEliminar.Contains("," + tablep.Columns[i].ColumnName + ","))
                        continue;
                    if (tablep.Rows[0][i].GetType() == typeof(System.DateTime) && tablep.Rows[0][i] != null)
                        DataRow["Valor"] = ((DateTime)tablep.Rows[0][i]).ToString("dd-MM-yyyy HH:mm:ss");  // idem que jqgrid
                    else
                        DataRow["Valor"] = tablep.Rows[0][i].ToString();
                    table.Rows.Add(DataRow);
                }
                modelo.Add(new { name = "Campo", index = "Campo", width = 200 });
                modelo.Add(new { name = "Valor", index = "Valor", width = 550 });
            }
            else
            {
                table = tablep;
            }
            if (table.Rows.Count > 0)
            {
                if (modelo.Count == 0)
                {
                    anchoLargo = "," + anchoLargo.ToUpper() + ",";
                    anchoCero = "," + anchoCero.ToUpper() + ",";
                    anchoCorto = "," + anchoCorto.ToUpper() + ",";
                    for (int i = 0; i < table.Columns.Count; i++)
                    {
                        if (ColumnasEliminar.Contains("," + table.Columns[i].ColumnName + ","))
                            continue;
                        int ancho = 200;  // texto corto por defecto
                        if (table.Columns[i].ColumnName.Contains(" ") || anchoLargo.IndexOf("," + table.Columns[i].ColumnName.ToUpper() + ",") >= 0 || table.Rows[0][i].ToString().Length > 60)
                            ancho = 300;
                        if (table.Columns[i].ColumnName.Contains(" ") || anchoCorto.IndexOf("," + table.Columns[i].ColumnName.ToUpper() + ",") >= 0 )
                            ancho = 70;
                        if (table.Columns[i].DataType == typeof(System.Int32) || table.Columns[i].DataType == typeof(System.Int64) ||
                            table.Columns[i].DataType == typeof(System.Decimal) )
                            ancho = 90;  //numero

                        if (anchoCero.IndexOf("," + table.Columns[i].ColumnName.ToUpper() + ",") >= 0)
                            ancho = 0;

                        if (table.Columns[i].DataType == typeof(System.DateTime))
                            modelo.Add(new { name = table.Columns[i].ColumnName, index = table.Columns[i].ColumnName, formatter = "date", width = 120 });
                        else if (ancho == 0)
                            modelo.Add(new { name = table.Columns[i].ColumnName, index = table.Columns[i].ColumnName, hidden = true });
                        else
                            modelo.Add(new { name = table.Columns[i].ColumnName, index = table.Columns[i].ColumnName, width = ancho });
                    }
                }
                Dictionary<string, object> row;
                foreach (System.Data.DataRow dr in table.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (System.Data.DataColumn col in table.Columns)
                    {
                        if (ColumnasEliminar.Contains("," + col.ColumnName + ","))
                            continue;
                        row.Add(col.ColumnName, dr[col]);
                    }
                    datos.Add(row);
                }
            }
        }

        public static void BeginTrans()
        {
            DbOracle.getDbOracle().BeginTrans();
        }
        public static void CommitTrans()
        {
            DbOracle.getDbOracle().CommitTrans();
        }
        public static void RollBack()
        {
            DbOracle.getDbOracle().RollBack();
        }

        public static void VerificarCerrarConexiones()
        {
            DbOracle.VerificarCerrarConexiones();
        }


        /// <summary>
        /// devuelve una lista de objetos dinamicos con todos los campos de la consulta sql
        /// los nombres de los campos estan en mayusculas
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parametros"></param>
        /// <returns></returns>
        public static IEnumerable<dynamic> ExecuteDynamic(string sql, object[] parametros)
        {
            return DbOracle.getDbOracle().ExecuteDynamic(sql, parametros);
        }
        
    }
}
