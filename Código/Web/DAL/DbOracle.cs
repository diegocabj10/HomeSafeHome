using System;
using System.Collections;
using System.Data;
using Oracle.DataAccess.Client;
using System.Collections.Generic;
using System.Threading;
using System.Web;
using System.Linq;
using System.Text;
using Oracle.DataAccess.Types;
using UTIL;
using DTO;
namespace DAL
{
    /// <summary>
    /// Calse de acceso a datos basada en el proveedor de Oracle Oracle Data Access
    /// </summary>
    public class DbOracle : IDisposable
    {

        public string Esquema = "sigesas";
        public delegate void dMetodoLectura(IDataReader dr);
        private static object syncRootDbOracle = new Object();
        protected static string PilaUltimaLlamada;
        public static int ConexionesAbiertas;
        public static Dictionary<string, string> ConAbiertas = new Dictionary<string, string>();
        public static int TotalInstancias = 0;
        public static int NumeradorInstancias = 0;
        public string comandoAbreviado;
        public int Numeroinstancia;
        public string RequestId = "";
        public String RequestIdFin = "";
        public string DbSessionId
        {
            get
            {
                if (System.Web.HttpContext.Current != null && System.Web.HttpContext.Current.Items != null)
                {
                    if (System.Web.HttpContext.Current.Cache != null
                        && System.Web.HttpContext.Current.Cache["_DtoUsuarioLogueado_" + System.Web.HttpContext.Current.Items["_tk"]] != null)
                        return System.Web.HttpContext.Current.Items["_tk"].ToString();  // web
                    else if (System.Web.HttpContext.Current.Items["DBSessionId"] != null)
                        return System.Web.HttpContext.Current.Items["DBSessionId"].ToString();  //WService
                }
                return "";
            }
        }
        public static bool LoguearComandosSQL = true;
        public static bool LoguearComandosParametrosSQL = false;
        public static bool LoguearParametrosSQLPorProcedimiento = false;
        public static string ParametroSQL = "";
        public static bool WebServiceSessionAutoClose = true;
        DateTime horaOpen;
        DateTime horaOpenParcial;
        string EjecucionesEnConexion;

        /// <summary>
        /// Guarda la cadena de conexión.
        /// </summary>
        protected string prConnectionString;
        /// <summary>
        /// Referencia a la conexión a la base.
        /// </summary>
        protected OracleConnection prConnection;
        protected OracleCommand prCommand;
        /// <summary>
        /// Referencia a la transacción activa. Si no hay transacción activa es null.
        /// </summary>
        protected OracleTransaction prTx;
        /// <summary>
        /// Variable de propiedad que indica si se cierra automaticamente la conexión luego de ejecutar un comando.
        /// </summary>
        protected bool prAutoClose = true;
        /// <summary>
        /// Variable para llevar el registro de anidamiento de transacciones. 
        /// </summary>
        protected int _contadorTransacciones;

        /// <summary>
        /// Variable que indica cuando es true que la transacción activa no puede finalizar con Commit. 
        /// Si en algun nivel de anidamiento de transacción se hace un rollback se marca la transacción 
        /// como no commiteable ya que la implementación de anidamiento de transacciones no permite 
        /// Rollbacks parciales debido a que en la base se mantiene una sola transacción y las anidadas
        /// las administra la aplicación. 
        /// </summary>
        protected bool _notCommiteable;




        /// <summary>
        /// destructor
        /// </summary>
        ~DbOracle()
        {
            Interlocked.Increment(ref TotalInstancias);
        }


        /// <summary>
        /// Cadena de conexión actual. No se puede setear esta propiedad si la conexión esta abierta.
        /// </summary>
        public string ConnectionString
        {
            get { return prConnectionString; }
            set
            {
                if (prConnectionString != value.Trim())
                {
                    if (prConnection != null)
                    {
                        if (prConnection.State != ConnectionState.Closed)
                        {
                            throw new ApplicationException("La Conexión Esta Abierta.");
                        }
                    }
                    prConnectionString = value.Trim();
                }
            }
        }
        /// <summary>
        /// Retorna True si la conexión es nula o su estado es cerrado
        /// </summary>
        public bool IsConnectionClosed
        {
            get
            {
                return prConnection == null || prConnection.State == ConnectionState.Closed;
            }
        }

        /// <summary>
        /// Conexión actual a la base. No se puede cambiar si la actual esta abierta.
        /// </summary>
        public OracleConnection Connection
        {
            get
            {
                return prConnection;
            }
            set
            {
                if (prConnection != null)
                {
                    if (prConnection.State != ConnectionState.Closed)
                    {
                        throw new ApplicationException("La Conexión Esta Abierta.");
                    }
                    if (prTx != null)
                    {
                        throw new ApplicationException("No se puede cambiar la conexion porque hay una transaccion iniciada.");
                    }
                }
                prConnection = value;
            }
        }

        /// <summary>
        /// Transacción actual. Si no hay transacción abierta retorna null.
        /// Para setearla la cadena de conexión debe ser igual a la de la conexión actual.
        /// </summary>
        public OracleTransaction Transaction
        {
            get { return prTx; }
            set
            {
                if (prConnection != null)
                {
                    if (prConnection.State != ConnectionState.Closed)
                    {
                        if (prConnection.ConnectionString != value.Connection.ConnectionString)
                        {
                            throw new ApplicationException("La transacción corresponde a otra conexión.");
                        }
                    }
                }
                if (prTx != null)
                {
                    prTx = value;
                    prConnection = value.Connection;
                }
            }
        }

        /// <summary>
        /// Inicializa la conexión y la Abre. Si se asigno algún esquema hace el cambio de esquema.
        /// </summary>
        public void Open()
        {

            if (prConnection == null)
            {
                prConnection = NewConnection();
            }
            if (prConnection.State != ConnectionState.Open)
            {
                if (prConnection.State != ConnectionState.Closed)
                {
                    Logueo.LogueaInfo("Conexion defectuosa " + prConnection.State.ToString(), null);
                    prConnection = NewConnection();
                }

                horaOpen = DateTime.Now;
                EjecucionesEnConexion = "";
                prConnection.ConnectionString = prConnectionString;
                try
                {
                    prConnection.Open();
                }
                catch (Exception)
                {
                    throw;
                }
                Interlocked.Increment(ref ConexionesAbiertas);
                try
                {
                    lock (syncRootDbOracle)
                    {
                        string key = "";
                        try  //if (HttpContext.Current != null && HttpContext.Current.ApplicationInstance.ToString() == "ASP.global_asax")  // IIS7
                        {
                            key = ((HttpContext.Current != null) ? HttpContext.Current.Request.FilePath + " - RqId:" + HttpContext.Current.Request.GetHashCode().ToString() : "SinContext" + this.GetHashCode());
                        }
                        catch (Exception)
                        {
                            key = "SinContext" + this.GetHashCode();
                        }
                        ConAbiertas.Add(key, DateTime.Now.ToString());

                    }
                }
                catch
                {
                    Logueo.LogueaInfo("ControlConexion: open, registro duplicado " + ((HttpContext.Current != null) ? HttpContext.Current.Request.FilePath + " || RqId:" + HttpContext.Current.Request.GetHashCode().ToString() : "SinContext" + GetHashCode()) + " PilaAnterior: " + PilaUltimaLlamada + " PilaActual: " + Environment.StackTrace);
                }
                if (ConexionesAbiertas > 1)
                    System.Diagnostics.Debug.WriteLine("Conexiones.Open: " + ConexionesAbiertas.ToString() + " " + Environment.StackTrace);
                if (System.Web.HttpContext.Current != null
                    &&
                    (System.Web.HttpContext.Current.Items["DbOracle"] != null ? System.Web.HttpContext.Current.Items["DbOracle"] != this : true)
                    )
                {
                    Logueo.LogueaInfo("Conexion fuera de Items " + ((HttpContext.Current != null) ? HttpContext.Current.Request.FilePath + " || RqId:" + HttpContext.Current.Request.GetHashCode().ToString() : "SinContext" + GetHashCode()) + " PilaAnterior: " + PilaUltimaLlamada + " PilaActual: " + Environment.StackTrace);
                }

                // cuando el open tenia exito pero traia un conexion erronea,daba error en la siguiente linea y nunca cerraba la conexion defectuosa.
                try
                {
                    //if (!String.IsNullOrEmpty(prEsquema))
                    //{
                    //    SetearIdSession(prEsquema);
                    //}
                    SetearIdSession();

                }
                catch (Exception ex)
                {
                    if (prConnection.State == ConnectionState.Open)
                    {
                        try
                        {
                            prConnection.Close();                          // cerrar conexion que tiene error
                        }
                        catch (Exception)
                        {
                            Logueo.LogueaInfo("Fallo el close de conexion previo intentar resetear del pool de conexiones" + ((prTx != null) ? ", con transacciones" : "") + "\n   Error original: " + ex.ToString());
                        }


                        try
                        {
                            // resetear el pool de conexiones
                            OracleConnection.ClearPool(prConnection);
                            Logueo.LogueaInfo("Se reseteo el pool de conexiones" + ((prTx != null) ? ", con transacciones" : "") + "\n   Error original: " + ex.ToString());
                        }
                        catch (Exception)
                        {

                            Logueo.LogueaInfo("Fallo el reseteo del pool de conexiones por estar cerrada en el servidor" + ((prTx != null) ? ", con transacciones" : "") + "\n   Error original: " + ex.ToString());
                        }
                    }
                }
            }



            lock (syncRootDbOracle)
            {
                PilaUltimaLlamada = Environment.StackTrace;
            }

        }

        /// <summary>
        /// Cierra la conexión actual. Si hay una transacción abierta genera una excepción.
        /// </summary>
        public void Close()
        {
            lock (syncRootDbOracle)
            {
                PilaUltimaLlamada = "";
            }
            if (prTx != null)
            {
                throw new ApplicationException("No se puede Cerrar la Conexión hasta que no finalice la Transacción Pendiente.");
            }

            if (prConnection != null)
            {
                if (prConnection.State != ConnectionState.Closed)
                {
                    prConnection.Close();
                    Interlocked.Decrement(ref ConexionesAbiertas);
                    lock (syncRootDbOracle)
                    {
                        string key = "";
                        try //if (HttpContext.Current != null && HttpContext.Current.ApplicationInstance.ToString() == "ASP.global_asax") //IIS7
                        {
                            key = ((HttpContext.Current != null) ? HttpContext.Current.Request.FilePath + " - RqId:" + HttpContext.Current.Request.GetHashCode().ToString() : "SinContext" + this.GetHashCode());
                        }
                        catch (Exception)
                        {
                            key = "SinContext" + this.GetHashCode();
                        }


                        if (ConAbiertas.ContainsKey(key))
                            ConAbiertas.Remove(key);
                        else
                        {
                            string url = "";
                            string RqId = "";
                            try // if (HttpContext.Current != null && HttpContext.Current.ApplicationInstance.ToString() == "ASP.global_asax") //IIS7
                            {
                                url = HttpContext.Current.Request.FilePath;
                                RqId = HttpContext.Current.Request.GetHashCode().ToString();
                            }
                            catch (Exception)
                            {
                                url = "";
                                RqId = "";
                            }

                            Logueo.LogueaInfo("ControlConexion: close, no pudo eliminar registro: " + ((HttpContext.Current != null) ? url + " - RqId:" + RqId : "SinContext" + this.GetHashCode()));
                        }
                    }
                    if (ConexionesAbiertas > 0)
                        System.Diagnostics.Debug.WriteLine("Conexiones.Close: " + ConexionesAbiertas.ToString() + " " + Environment.StackTrace);

                    // hacer dispose de parametros y comandos.
                    try
                    {
                        if (prCommand != null)
                        {
                            if (prCommand.Parameters != null)
                            {
                                foreach (OracleParameter param in prCommand.Parameters)
                                {
                                    param.Dispose();
                                }
                            }
                            prCommand.Connection = null;
                            prCommand.Dispose();
                        }
                    }
                    catch (Exception)
                    {
                    }
                    prConnection.Dispose();  // es igual que el close(), pero se habla de un bug en el driver de oracle
                    prConnection = null;

                    if (LoguearComandosSQL)
                    {
                        System.Text.StringBuilder comando = new System.Text.StringBuilder();
                        comando.Append("Acc:SqlFin || Proc:");
                        comando.Append((EjecucionesEnConexion.EndsWith(", ")) ? EjecucionesEnConexion.Substring(0, EjecucionesEnConexion.Length - 2) : EjecucionesEnConexion);
                        comando.Append(this.RequestIdFin);
                        comando.Append(" || TpMs:");
                        comando.Append(DateTime.Now.Subtract(horaOpen).TotalMilliseconds.ToString("0"));
                        Logueo.LogueaInfo(comando.ToString());
                    }
                }
            }
        }

        #region "Command"





        /// <summary>
        /// Crea y configura un comando para ejecutar el procedimiento almacenado con los parametros suministrados.
        /// </summary>
        /// <param name="SpName">Nombre del procedimiento almacenado</param>
        /// <param name="Parameters">Listado de parametros para ejecutar el procedimiento almacenado</param>
        /// <returns>Retorna el comando listo para ejecutarse</returns>
        public OracleCommand BuildCommand(string SpName, object[] Parameters)
        {
            return BuildCommand<DtoIdNombre>(SpName, CommandType.StoredProcedure, Parameters, null);
        }

        /// <summary>
        /// Crea y configura un comando para ejecutar el comando con los parametros suministrados.
        /// </summary>
        /// <param name="CommandText">Comando a ejecutar</param>
        /// <param name="CommandType">indica si es Texto o un procedimiento almacenado</param>
        /// <param name="Parameters">Listado de parametros para ejecutar el procedimiento almacenado</param>
        /// <returns>Retorna el comando listo para ejecutarse</returns> 
        public virtual OracleCommand BuildCommand<T>(string CommandText, CommandType CommandType, object[] Parameters, T DtoParametros) where T : new()
        {

            if ((CommandText.StartsWith("/*") || CommandText.StartsWith("\r\n/*")) && CommandText.Contains("*/"))  // es un comnado dinamico con un seudo nombre
            {
                if (CommandText.StartsWith("/*"))
                    comandoAbreviado = CommandText.Substring(CommandText.IndexOf("/*") + 2, CommandText.LastIndexOf("*/") - 2);
                else
                    comandoAbreviado = CommandText.Substring(CommandText.IndexOf("\r\n/*") + 4, CommandText.LastIndexOf("*/") - 4);
            }
            else
            {
                comandoAbreviado = CommandText;
            }
            comandoAbreviado = comandoAbreviado.ToUpper().Trim()
                                              .Replace("||", "§§");  // cambio, porque se utiliza luego para parcear el log en ImportarLogs;

            if (LoguearComandosSQL)
            {
                if (EjecucionesEnConexion != "")
                {
                    System.Text.StringBuilder comandoAnterior = new System.Text.StringBuilder();
                    comandoAnterior.Append("Acc:SqlFin || Proc:");
                    string proc = EjecucionesEnConexion.Substring(0, EjecucionesEnConexion.Length - 2);
                    if (proc.IndexOf(",") != -1)
                        proc = proc.Substring(proc.LastIndexOf(",") + 1);
                    comandoAnterior.Append(proc);
                    comandoAnterior.Append(this.RequestIdFin);
                    comandoAnterior.Append(" || TpMs:");
                    comandoAnterior.Append(DateTime.Now.Subtract(horaOpenParcial).TotalMilliseconds.ToString("0"));
                    Logueo.LogueaInfo(comandoAnterior.ToString());
                }
                horaOpenParcial = DateTime.Now;

                System.Text.StringBuilder comando = new System.Text.StringBuilder();
                comando.Append("Acc:SqlIni || Proc:");
                comando.Append(comandoAbreviado);
                EjecucionesEnConexion += comandoAbreviado + ", ";
                comando.Append(this.RequestId);

                if ((LoguearComandosParametrosSQL || (LoguearParametrosSQLPorProcedimiento && ParametroSQL.Contains(CommandText))) && Parameters != null)
                {
                    comando.Append(" || SqlParam:");
                    for (int i = 0; i < Parameters.Length; i++)
                    {
                        comando.Append("P" + i.ToString() + ": " + (Parameters[i] ?? "").ToString());
                        if (i == Parameters.Length - 1)
                        {
                        }
                        else
                        {
                            comando.Append(", ");
                        }
                    }
                }
                Logueo.LogueaInfo(comando.ToString(), new object[] { });
            }

            /**
             * 08/11 - Agregado para que se pueda acceder a procedimientos de otras bases
             * como por ej: T_COMUNES.PAQUETE.ETC
             */
            if (CommandType == CommandType.StoredProcedure && !CommandText.Contains("."))
                CommandText = Esquema + "." + CommandText;

            OracleCommand cmd = null;
            bool EnCacheParametros = false;

            if (CommandType == CommandType.StoredProcedure)
            {
                cmd = GetCachedCommand2(CommandText, Parameters, prConnection, CommandType);
            }
            else
            {
                // sacar los saltos de linea de c# que afectan a oracle
                CommandText = CommandText.Replace("\r\n", "\n");
            }

            if (cmd != null)  // esta en cache los parametros
            {
                EnCacheParametros = true;
                cmd.Connection = prConnection;
                //cmd.Transaction = prTx; //no hace falta en oracle
            }

            if (cmd == null)  // no esta en cache los parametros
            {
                cmd = NewCommand(CommandText);
                cmd.CommandText = CommandText;
                cmd.CommandType = CommandType;
                cmd.Connection = prConnection;
                //cmd.Transaction = prTx; //no hace falta en oracle
                if (CommandType == CommandType.StoredProcedure)
                {
                    DeriveParameters(cmd);
                }
                if (CommandType == CommandType.Text && Parameters != null && Parameters.Length > 0)
                {
                    cmd.BindByName = true;

                    for (int i = 0; i < Parameters.Length; i++)
                    {
                        cmd.Parameters.Add(new OracleParameter("p" + (i + 1).ToString(), Parameters[i]));
                        // para recuperar el id del insert
                        if (i == 0)
                            ((OracleParameter)(cmd.Parameters[0])).Direction = ParameterDirection.InputOutput;
                    }
                }

            }

            if (CommandType == CommandType.StoredProcedure)
            {
                int F = 0;
                if (Parameters != null)
                {
                    for (F = 0; F < Parameters.GetLength(0); F++)
                    {
                        if (cmd.Parameters.Count == F) break;
                        var item = ((OracleParameter)cmd.Parameters[F]);
                        if (item.Direction == ParameterDirection.Output)
                        { //recomendado manual oracle, no asignar valor a parametro de salida

                            if (item.CollectionType == OracleCollectionType.PLSQLAssociativeArray)
                            {
                                item.Size = 1000; //para permitir mas de 16 elementos en el output del array
                                //Diego lo agregue
                                if (item.OracleDbType == OracleDbType.Varchar2)
                                {
                                    item.Size = 100;
                                    item.ArrayBindSize = Enumerable.Repeat(1000, 100).ToArray();
                                }
                            }
                        }
                        else
                        {

                            if (Parameters[F] == null ||
                                item.OracleDbType == OracleDbType.Int64
                                && item.ParameterName.StartsWith("P_ID_")
                                && (Parameters[F].ToString() == "0" || Parameters[F].ToString() == "-1"))
                            {

                                if (item.CollectionType != OracleCollectionType.PLSQLAssociativeArray)
                                    item.Value = DBNull.Value;
                                else if (item.OracleDbType == OracleDbType.Decimal || item.OracleDbType == OracleDbType.Int64 || item.OracleDbType == OracleDbType.Int32 || item.OracleDbType == OracleDbType.Int16)
                                {
                                    // for array of Int32s, decimals and so on
                                    item.Value = new OracleDecimal[1] { OracleDecimal.Null };
                                    item.Size = 1;
                                }
                                else
                                {   // for array of strings
                                    item.Value = new OracleString[1] { OracleString.Null };
                                    item.Size = 1;
                                }
                            }
                            else if (item.CollectionType == OracleCollectionType.PLSQLAssociativeArray)
                            {
                                if (item.OracleDbType == OracleDbType.Decimal || item.OracleDbType == OracleDbType.Int64 || item.OracleDbType == OracleDbType.Int32 || item.OracleDbType == OracleDbType.Int16)
                                {
                                    item.Value = Parameters[F];
                                    if (Parameters[F].GetType().Name.Contains("Int"))
                                        item.Size = ((int[])Parameters[F]).Length;  //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                    else
                                        item.Size = ((object[])Parameters[F]).Length;  //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                }
                                else
                                {
                                    item.Value = Parameters[F];
                                    item.Size = ((object[])Parameters[F]).Length;  //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                }
                            }
                            else if (item.OracleDbType == OracleDbType.Blob)
                            {
                                if (item.ParameterName.Equals("P_IMG_DESCARGO") || item.ParameterName.Equals("P_IMG_RECURSO") || item.ParameterName.Equals("P_IMG_PERENCION") || item.ParameterName.Equals("P_IMAGEN"))
                                    ((IDataParameter)cmd.Parameters[F]).Value = Parameters[F];
                                else
                                    ((IDataParameter)cmd.Parameters[F]).Value = System.Text.Encoding.UTF8.GetBytes(Parameters[F].ToString());
                            }
                            else
                            {
                                // OJO que esta duplicado
                                //TODO JavierI pasar a mayuscular al grabar, salvo clob, blob, procesos/menu,
                                if (Parameters[F].GetType().Name == "String"
                                    && !((CommandText.ToUpper().EndsWith(".PR_PROCESO_G") || CommandText.ToUpper().EndsWith(".PR_PROCESO_SF"))
                                           && (item.ParameterName == "P_NOMBRE" || item.ParameterName == "P_URL"))
                                    && item.OracleDbType != OracleDbType.NClob
                                    && (item.OracleDbType != OracleDbType.Clob))
                                    Parameters[F] = Parameters[F].ToString().ToUpper();

                                ((IDataParameter)cmd.Parameters[F]).Value = Parameters[F];
                            }
                        }
                    }
                }
                else if (DtoParametros != null)
                {
                    var propiedades = typeof(T).GetProperties();
                    var cmd1 = (Oracle.DataAccess.Client.OracleCommand)cmd;
                    foreach (Oracle.DataAccess.Client.OracleParameter item in cmd1.Parameters)
                    {
                        F++;
                        //recomendado manual oracle, no asignar valor a parametro de salida
                        if (item.Direction == ParameterDirection.Output)
                        {

                            if (item.CollectionType == OracleCollectionType.PLSQLAssociativeArray)
                            {
                                item.Size = 1000; //para permitir mas de 16 elementos en el output del array
                                                  //Diego lo agregue
                                if (item.OracleDbType == OracleDbType.Varchar2)
                                {
                                    item.Size = 100;
                                    item.ArrayBindSize = Enumerable.Repeat(1000, 100).ToArray();
                                }
                            }
                            continue;
                        }

                        // cargamos solo los campos que coincidan con las propiedades
                        var prop = propiedades.Where(s => "P" + s.Name.ToUpper().Replace("_", "") == item.ParameterName.ToUpper().Replace("_", "")).SingleOrDefault();
                        if (prop == null && F == 1 && item.ParameterName.ToUpper().StartsWith("P_ID_"))   // si es el primer parametro y no se encuentra
                            prop = propiedades.Where(s => s.Name.ToUpper() == "ID").SingleOrDefault();             // busco propiedad ID
                        if (prop == null)
                        {
                            continue;  // si esta propiedad no es parametro continuar con la siguiente
                        }
                        var valor = prop.GetValue(DtoParametros, null);

                        if (valor == null ||
                            item.OracleDbType == OracleDbType.Int64
                            && item.ParameterName.StartsWith("P_ID_")
                            && (valor.ToString() == "0" || valor.ToString() == "-1"))
                        {
                            if (item.CollectionType != OracleCollectionType.PLSQLAssociativeArray)
                                item.Value = DBNull.Value;
                            else if (item.OracleDbType == OracleDbType.Decimal || item.OracleDbType == OracleDbType.Int64 || item.OracleDbType == OracleDbType.Int32 || item.OracleDbType == OracleDbType.Int16)
                            {
                                // for array of Int32s, decimals and so on
                                item.Value = new OracleDecimal[1] { OracleDecimal.Null };
                                item.Size = 1;
                            }
                            else
                            {   // for array of strings
                                item.Value = new OracleString[1] { OracleString.Null };
                                item.Size = 1;
                            }

                        }
                        else if (item.CollectionType == OracleCollectionType.PLSQLAssociativeArray)
                        {
                            if (item.OracleDbType == OracleDbType.Decimal || item.OracleDbType == OracleDbType.Int64 || item.OracleDbType == OracleDbType.Int32 || item.OracleDbType == OracleDbType.Int16)
                            {

                                if (valor.GetType().FullName.Contains("Nullable"))
                                {
                                    if (((List<int?>)valor).Count==0)
                                    {
                                        item.Value = new OracleDecimal[1] { OracleDecimal.Null };
                                        item.Size = 1;
                                    }
                                    else
                                    { 
                                    item.Value = ((List<int?>)valor).ToArray();
                                    item.Size = ((List<int?>)valor).Count; //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                    }
                                }
                                else
                                {
                                    if (((List<int>)valor).Count == 0)
                                    {
                                        item.Value = new OracleDecimal[1] { OracleDecimal.Null };
                                        item.Size = 1;
                                    }
                                    else
                                    {
                                        item.Value = ((List<int>)valor).ToArray();
                                        item.Size = ((List<int>)valor).Count; //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                    }
                                }
                            }
                            else
                            {                                 // for array of strings
                                if (((List<string>)valor).Count == 0)
                                {
                                    item.Value = new OracleString[1] { OracleString.Null };
                                    item.Size = 1;
                                }
                                else
                                {
                                    item.Value = ((List<string>)valor).ToArray();
                                    item.Size = ((List<string>)valor).Count; //porque cambia en cada llamada y no puedo recuperarlo del cache de parametros
                                }
                            }
                        }
                        else if (item.OracleDbType == OracleDbType.Blob)
                        {
                            if (item.ParameterName == "P_IMG_DESCARGO" || item.ParameterName.Equals("P_IMG_RECURSO") || item.ParameterName.Equals("P_IMG_PERENCION") || item.ParameterName.Equals("P_IMAGEN"))
                                item.Value = valor;
                            else
                                item.Value = System.Text.Encoding.UTF8.GetBytes(valor.ToString());
                        }
                        else
                        {
                            // OJO que esta duplicado
                            //TODO JavierI pasar a mayuscular al grabar, salvo clob, blob, procesos/menu,
                            if (prop.PropertyType.Name == "String"
                                                            && !((CommandText.ToUpper().EndsWith(".PR_PROCESO_G") || CommandText.ToUpper().EndsWith(".PR_PROCESO_SF"))
                                                                   && (item.ParameterName == "P_NOMBRE" || item.ParameterName == "P_URL"))
                                                            && item.OracleDbType != OracleDbType.NClob
                                                            && (item.OracleDbType != OracleDbType.Clob))
                                valor = valor.ToString().ToUpper();


                            item.Value = valor;
                        }

                    }
                }
                if (!EnCacheParametros)
                    CacheCommand(cmd, Parameters);  // pongo en chache luego de cargar los datos porque cambia propiedad isnuleable
            }

            return cmd;
        }


        #endregion



        #region "ExecuteNonQuery"

        /// <summary>
        /// Metodo para ejecutar un procedimiento almacenado que no tiene parametros y no retorna registros.
        /// </summary>
        /// <param name="SpName">nmbre del procedimiento almacenado</param>
        /// <returns>retorna el numero de filas afectadas por el comando.</returns>

        public Int32 ExecuteNonQuery(string SpName)
        {
            return this.ExecuteNonQuery<DtoIdNombre>(SpName, CommandType.StoredProcedure, null, null);
        }

        /// <summary>
        /// Metodo para ejecutar un procedimiento almacenado que no retorna registros.
        /// </summary>
        /// <param name="SpName">nmbre del procedimiento almacenado</param>
        /// <param name="Parameters">parametros del procedimiento almacenado</param>
        /// <returns>retorna el numero de filas afectadas por el comando.</returns>

        public Int32 ExecuteNonQuery(string SpName, object[] Parameters)
        {
            return this.ExecuteNonQuery<DtoIdNombre>(SpName, CommandType.StoredProcedure, Parameters, null);
        }

        /// <summary>
        /// Metodo para ejecutar un comando que no retorna registros.
        /// </summary>
        /// <param name="CommandText">sentencia a ejecutar</param>
        /// <param name="CommandType">Tipo de sentencia a ejecutar. Indica si es una sentencia SQL o un Procedimiento Almacenado</param>
        /// <param name="Parameters">parametros para ejecutar el comando</param>
        /// <returns>retorna el numero de filas afectadas por el comando.</returns>

        public Int32 ExecuteNonQuery<T>(string CommandText, CommandType CommandType, object[] Parameters, T DtoParametros) where T : new()
        {

            OracleCommand cmd = NewCommand(CommandText);
            Int32 retval;
            try
            {
                if (CommandText.IndexOf(" ") == -1)
                    CommandType = System.Data.CommandType.StoredProcedure;
                else
                {
                    CommandType = System.Data.CommandType.Text;
                }

                //abro la conexion, si ya esta abierta no hace nada
                this.Open();

                //esta rutina configura el command y le carga los parametros
                cmd = BuildCommand<T>(CommandText, CommandType, Parameters, DtoParametros);
                retval = cmd.ExecuteNonQuery();
                RetornarParametrosDeSalida(cmd, Parameters, DtoParametros);

            }
            catch (Exception error)
            {
                if (cmd != null && !error.Message.Contains("ORA-20999"))
                {
                    Logueo.LoguearParametrosComando(cmd);
                }
                throw;
            }
            finally
            {
                //si la clase tiene autoclose = true cierro la conexión
                if (prAutoClose && prTx == null)
                {
                    this.Close();
                }
            }

            return retval;
        }
        #endregion

        #region "ExecuteScalar"

        /// <summary>
        /// Metodo para ejecutar procedimiento almacenado sin parametros que retorna un solo valor.
        /// </summary>
        /// <param name="SpName">nombre del procedimiento almacenado</param>
        /// <returns></returns>

        public object ExecuteScalar(string SpName)
        {
            return this.ExecuteScalar(SpName, CommandType.StoredProcedure, null);
        }

        /// <summary>
        /// Metodo para ejecutar un procedimiento almacenado que retorna un solo valor.
        /// </summary>
        /// <param name="SpName">nombre del procedimiento almacenado</param>
        /// <param name="Parameters">parametros del procedimiento almacenado</param>
        /// <returns>Valor retornado</returns>

        public object ExecuteScalar(string SpName, object[] Parameters)
        {
            return this.ExecuteScalar(SpName, CommandType.StoredProcedure, Parameters);
        }

        /// <summary>
        /// Metodo para ejecutar un comando que retorna un solo valor.
        /// </summary>
        /// <param name="CommandText">sentencia a ejecutar</param>
        /// <param name="CommandType">Tipo de sentencia a ejecutar. Indica si es una sentencia SQL o un Procedimiento Almacenado</param>
        /// <param name="Parameters">parametros para ejecutar el comando</param>
        /// <returns>Valor retornado</returns>

        public object ExecuteScalar(string CommandText, CommandType CommandType, object[] Parameters)
        {

            OracleCommand cmd = NewCommand(CommandText);
            object retval;


            try
            {
                if (CommandText.IndexOf(" ") == -1)
                    CommandType = System.Data.CommandType.StoredProcedure;
                else
                {
                    CommandType = System.Data.CommandType.Text;
                }

                //abro la conexion, si ya esta abierta no hace nada
                this.Open();

                //esta rutina configura el command y le carga los parametros
                cmd = BuildCommand<DtoIdNombre>(CommandText, CommandType, Parameters, null);

                //#if DEBUG
                //                long startTick = DateTime.Now.Ticks;
                //#endif
                //executo el command.
                retval = cmd.ExecuteScalar();
                //#if DEBUG
                //                long endTick = DateTime.Now.Ticks;
                //                long tick = endTick - startTick;
                //                System.Diagnostics.Debug.WriteLine("Tiempo Ejecucion " + tick.ToString("000000"));
                //#endif

                RetornarParametrosDeSalida(cmd, Parameters);
            }
            catch (Exception error)
            {
                if (cmd != null && !error.Message.Contains("ORA-20999"))
                {
                    Logueo.LoguearParametrosComando(cmd);
                }
                throw;

            }
            finally
            {
                //si la clase tiene autoclose = true cierro la conexión
                if (prAutoClose && prTx == null)
                {
                    this.Close();
                }
            }

            return retval;

        }

        public System.Data.DataTable ExecuteTabla(string sql, object[] parametros)
        {
            System.Data.DataTable tabla = new System.Data.DataTable();
            ExecuteReader(sql, parametros, delegate (System.Data.IDataReader dr)
            {
                tabla.Load(dr);
            }
            );
            return tabla;
        }

        public System.Data.DataTable ExecuteTabla<T>(string sql, object[] parametros, T DtoParametros) where T : new()
        {
            System.Data.DataTable tabla = new System.Data.DataTable();
            ExecuteReader(sql, parametros, delegate (System.Data.IDataReader dr)
            {
                tabla.Load(dr);
            }, DtoParametros
            );
            return tabla;
        }

        public IEnumerable<dynamic> ExecuteDynamic(string sql, object[] parametros)
        {

            CommandType CommandType;
            OracleCommand cmd = NewCommand(sql);
            System.Data.IDataReader dr;
            try
            {
                if (sql.IndexOf(" ") == -1)
                    CommandType = System.Data.CommandType.StoredProcedure;
                else
                {
                    CommandType = System.Data.CommandType.Text;
                }

                Open();
                cmd = BuildCommand<DtoIdNombre>(sql, CommandType, parametros, null);
            }
            catch (Exception ex)
            {
                if (prAutoClose && prTx == null)
                    Close();
                throw ex;
            }

            //try 
            //{
            dr = cmd.ExecuteReader();
            if (dr.Read())
            {
                var cols = dr.GetSchemaTable()
                       .Rows
                       .OfType<DataRow>()
                       .Select(r => r["ColumnName"]);

                do
                {
                    dynamic t = new System.Dynamic.ExpandoObject();

                    foreach (string col in cols)
                    {
                        ((IDictionary<System.String, System.Object>)t)[col] = dr[col];
                    }

                    yield return t;
                } while (dr.Read());
            }
            //}
            //catch (Exception error)
            //{
            //    if (prAutoClose && prTx == null)
            //        Close();
            //    if (cmd != null && !error.Message.Contains("ORA-20999"))
            //    {
            //        throw new Exception("\nParametros: " + Logueo.LoguearParametrosComando(cmd), error);
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
        }

        public string ExcecuteCSV(string sql, object[] parametros)
        {
            var result = new StringBuilder();
            System.Data.DataTable table = new System.Data.DataTable();
            ExecuteReader(sql, parametros, delegate (System.Data.IDataReader dr)
            {
                table.Load(dr);
            }
            );
            if (table.Rows.Count > 0)
            {

                for (int i = 0; i < table.Columns.Count; i++)
                {
                    result.Append(table.Columns[i].ColumnName);
                    result.Append(i == table.Columns.Count - 1 ? "\n" : ";");
                }

                foreach (DataRow row in table.Rows)
                {
                    for (int i = 0; i < table.Columns.Count; i++)
                    {
                        result.Append(row[i].ToString());
                        result.Append(i == table.Columns.Count - 1 ? "\n" : ";");
                    }
                }


            }
            return result.ToString();
        }
        #endregion

        #region "ExecuteReader"


        public void ExecuteReader(string CommandText, object[] Parameters, Action<IDataReader> MetodoLectura)
        {
            ExecuteReader<DtoIdNombre>(CommandText, Parameters, MetodoLectura, null);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="CommandText"></param>
        /// <param name="Parameters"></param>
        /// <param name="MetodoLectura"></param>
        public void ExecuteReader<T>(string CommandText, object[] Parameters, Action<IDataReader> MetodoLectura, T DtoParametros) where T : new()
        {

            OracleCommand cmd = NewCommand(CommandText);
            System.Data.IDataReader dr = null;
            CommandType CommandType = System.Data.CommandType.StoredProcedure;
            try
            {
                if (CommandText.IndexOf(" ") == -1)
                    CommandType = System.Data.CommandType.StoredProcedure;
                else
                {
                    CommandType = System.Data.CommandType.Text;
                }

                Open();
                cmd = BuildCommand<T>(CommandText, CommandType, Parameters, DtoParametros);
                dr = cmd.ExecuteReader();

                MetodoLectura(dr);

                dr.Close();
                dr.Dispose();
                RetornarParametrosDeSalida<T>(cmd, Parameters, DtoParametros);
            }
            catch (Exception error)
            {
                if (dr != null)
                {
                    dr.Close();
                    dr.Dispose();
                }
                if (cmd != null && !error.Message.Contains("ORA-20999"))
                {
                    Logueo.LoguearParametrosComando(cmd);
                }
                throw;

            }
            finally
            {
                if (prAutoClose && prTx == null)
                    Close();
            }

        }


        public IEnumerable<Dictionary<string, object>> ExecuteSerialize(string sql, object[] parametros)
        {
            IEnumerable<Dictionary<string, object>> DatosSerializados = null;
            ExecuteReader(sql, parametros, delegate (System.Data.IDataReader dr)
            {
                DatosSerializados = Serialize(dr);
            });
            return DatosSerializados;
        }

        public IEnumerable<Dictionary<string, object>> Serialize(IDataReader reader)
        {
            var results = new List<Dictionary<string, object>>();
            var cols = new List<string>();
            for (var i = 0; i < reader.FieldCount; i++)
                cols.Add(reader.GetName(i));

            while (reader.Read())
                results.Add(SerializeRow(cols, reader));

            return results;
        }
        private Dictionary<string, object> SerializeRow(IEnumerable<string> cols,
                                                        IDataReader reader)
        {
            var result = new Dictionary<string, object>();
            foreach (var col in cols)
                result.Add(col, reader[col]);
            return result;
        }




        /// <summary>
        /// Metodo para ejecutar un comando que retorna registros en un datareader.
        /// </summary>
        /// <param name="CommandText">sentencia a ejecutar</param>
        /// <param name="CommandType">Tipo de sentencia a ejecutar. Indica si es una sentencia SQL o un Procedimiento Almacenado</param>
        /// <param name="Parameters">parametros para ejecutar el comando</param>
        /// <returns>datareader con los resultados del comando.</returns>

        public System.Data.IDataReader ExecuteReader(string CommandText, object[] Parameters)
        {
            CommandType CommandType;
            OracleCommand cmd = NewCommand(CommandText);
            System.Data.IDataReader dr;
            try
            {
                if (CommandText.IndexOf(" ") == -1)
                    CommandType = System.Data.CommandType.StoredProcedure;
                else
                {
                    CommandType = System.Data.CommandType.Text;
                }

                Open();
                cmd = BuildCommand<DtoIdNombre>(CommandText, CommandType, Parameters, null);
            }
            catch (Exception ex)
            {
                if (prAutoClose && prTx == null)
                    Close();
                throw ex;
            }

            try
            {
                dr = cmd.ExecuteReader();
            }
            catch (Exception error)
            {
                if (prAutoClose && prTx == null)
                    Close();
                if (cmd != null && !error.Message.Contains("ORA-20999"))
                {
                    Logueo.LoguearParametrosComando(cmd);
                }
                throw;

            }
            return dr;
        }

        #endregion

        #region "BeginsTrans"

        /// <summary>
        /// Metodo para confirmar iniciar una transacción. La clase mantiene un contador de anidamiento de transacciones para evitar enviar el anidamiento a la base. Se debe llamar tantas veces CommitTrans como a BeginTrans.
        /// </summary>

        public void BeginTrans()
        {
            if (System.Web.HttpContext.Current == null)
            {
                if (System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("w3wp.exe") ||
                    System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("iisexpress.exe"))
                {
                    // web sin contexto (prohibir transacciones)
                    Logueo.LogueaInfo("NEWDbOracle_ERROR_NO_INICIAR_TRANS" + Environment.StackTrace, null);
                    throw new Exception("NEWDbOracle_ERROR_NO_INICIAR_TRANS: No puede abrirse una Transaccion en esta conexion");
                }
            }

            if (prConnection == null || prConnection.State != ConnectionState.Open)
            {
                this.Open();
            }

            if (prTx == null)
            {
                _notCommiteable = false;
                EjecucionesEnConexion += " (INICIA_TR) ";
                prTx = prConnection.BeginTransaction();
                System.Diagnostics.Debug.WriteLine("Inicia Transaccion");
                _contadorTransacciones = 1;
            }
            else
            {
                _contadorTransacciones += 1;
            }
        }
        #endregion

        #region "CommitTrans"


        /// <summary>
        /// Metodo para confirmar la transacción activa. La clase mantiene un contador de anidamiento de transacciones para evitar enviar el anidamiento a la base. Se debe llamar tantas veces CommitTrans como a BeginTrans.
        /// </summary>
        public void CommitTrans()
        {
            if (prTx == null)
            {
                throw new ArgumentException("Debe abrir iniciar una transaccion antes de llamar a CommitTrans.");
            }
            _contadorTransacciones -= 1;

            if (_contadorTransacciones < 0)
                Logueo.LogueaInfo("Commit repetido (de más) pila:" + Environment.StackTrace, null);

            if (_contadorTransacciones == 0)
            {
                if (_notCommiteable == true)
                {
                    _contadorTransacciones += 1;
                    throw new ApplicationException("No se puede hacer commit porque se llamo a rollback en una transaccion anidada.");
                }
                try
                {
                    prTx.Commit();
                    EjecucionesEnConexion += " (COMMIT_TR) ";
                }
                finally
                {
                    prTx = null;
                    //if (prAutoClose)
                    //{
                    //prConnection.Close();
                    // siempre cerrar  
                    this.Close();
                    //}
                }
            }
        }
        #endregion

        #region "RollBack"
        /// <summary>
        /// Metodo para abortar la transacción activa. La clase mantiene un contador de anidamiento de transacciones para evitar enviar el anidamiento a la base. Se debe llamar tantas veces rollback como a BeginTrans.
        /// </summary>
        public void RollBack()
        {
            if (prTx == null)
            {
                throw new ArgumentException("Debe abrir iniciar una transaccion antes de llamar a CommitTrans.");
            }
            _notCommiteable = true;
            _contadorTransacciones -= 1;
            if (_contadorTransacciones == 0)
            {
                try
                {
                    prTx.Rollback();
                    EjecucionesEnConexion += " (ABORTA_TR) ";
                }
                finally
                {
                    prTx = null;
                    //if (prAutoClose)
                    //{
                    //prConnection.Close();
                    this.Close();
                    //}
                }
            }
        }
        #endregion

        #region "Privadas"


        public void RetornarParametrosDeSalida(OracleCommand Cmd, object[] Parameters)
        {
            RetornarParametrosDeSalida<DtoIdNombre>(Cmd, Parameters, null);
        }

        /// <summary>
        /// Metodo para extraer de un comando los valores de los parametros de salida retornados por el motor. Se llama a este metodo luego de ejecutar cada comando.
        /// </summary>
        /// <param name="Cmd">Comando ejecutado</param>
        /// <param name="Parameters">parametros del comando pasados por la aplicacion</param>

        public void RetornarParametrosDeSalida<T>(OracleCommand Cmd, object[] Parameters, T DtoParametros) where T : new()
        {
            int J = 0;
            if (Parameters != null)
            {
                for (int f = 0 + J; f < Cmd.Parameters.Count; f++)
                {
                    if (f > Parameters.GetLength(0) - 1)
                    {
                        break;
                    }
                    var item = ((OracleParameter)Cmd.Parameters[f]);
                    if (((IDataParameter)(Cmd.Parameters[f])).Direction != ParameterDirection.Input && ((OracleParameter)(Cmd.Parameters[f])).OracleDbType != OracleDbType.RefCursor)
                    {
                        if (((OracleParameter)(Cmd.Parameters[f])).OracleDbType == OracleDbType.NClob)
                            Parameters[f - J] = ((OracleClob)(((OracleParameter)(Cmd.Parameters[f])).Value)).Value;
                        else if (Cmd.Parameters[f].OracleDbType == OracleDbType.Blob)
                        {
                            try
                            {
                                //if (!string.IsNullOrEmpty(Cmd.Parameters[f].GetPropertyValue("Value").ToString()))
                                if (!string.IsNullOrEmpty(((OracleParameter)Cmd.Parameters[0]).Value.ToString()))

                                    Parameters[f - J] = ((OracleBlob)(((OracleParameter)(Cmd.Parameters[f])).Value)).Value;
                            }
                            catch (Exception)
                            {

                            }

                        }

                        else
                        {
                            if (item.CollectionType == OracleCollectionType.PLSQLAssociativeArray && item.Size == 0)
                            {
                                //no lo leo porque oracle manda un array con un elemento por defecto
                            }
                            else
                                Parameters[f - J] = ((OracleParameter)Cmd.Parameters[f]).Value;
                        }
                    }
                }
            }
            else if (DtoParametros != null)
            {
                var propiedades = typeof(T).GetProperties();
                var cmd1 = (Oracle.DataAccess.Client.OracleCommand)Cmd;
                int F = 0;
                foreach (Oracle.DataAccess.Client.OracleParameter item in cmd1.Parameters)
                {
                    F++;
                    // parametros de salida
                    if (item.Direction == ParameterDirection.InputOutput || item.Direction == ParameterDirection.Output)
                    {
                        // cargamos solo los campos que coincidan con las propiedades
                        var prop = propiedades.Where(s => ("P" + s.Name).ToUpper() == item.ParameterName.ToUpper().Replace("_", "")).SingleOrDefault();
                        if (prop == null && F == 1 && item.ParameterName.ToUpper().StartsWith("P_ID_"))   // si es el primer parametro y no se encuentra
                            prop = propiedades.Where(s => s.Name.ToUpper() == "ID").SingleOrDefault();             // busco propiedad ID
                        if (prop == null)
                        {
                            continue;  // si esta propiedad no es parametro continuar con la siguiente
                        }
                        if (item.Value == DBNull.Value)
                        {
                            prop.SetValue(DtoParametros,null , null);
                            continue;
                        }

                        // asignar valor al dto como en cargar dto
                        string propiedad = prop.Name;
                        if (prop.PropertyType.Name == "Boolean") // Mapeo de S/N a booleano
                        {
                            prop.SetValue(DtoParametros, item.Value.ToString() == "S" ? true : false, null);
                        }
                        else if (prop.PropertyType.Name == "String")
                            prop.SetValue(DtoParametros, item.Value.ToString(), null);

                        else if (prop.PropertyType.FullName.Contains("Int32"))  // para que acepte nuleables
                            prop.SetValue(DtoParametros, Convert.ToInt32(item.Value), null);

                        else if (prop.PropertyType.FullName.Contains("Double"))  // para que acepte nuleables
                            prop.SetValue(DtoParametros, Convert.ToDouble(item.Value), null);
                        else
                            prop.SetValue(DtoParametros, item.Value, null);

                    }
                }

            }
        }
        #endregion



        ////////////////////////
        ////////////////////////
        ////////////////////////
        ////////////////////////
        ////////////////////////
        ////////////////////////////
        ////////////////////////////
        /////////////////////////////
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //




        /// <summary>
        /// implementacion de cacheo para Oracle
        /// </summary>
        public static volatile DbOracle _DbOracleVersionEscritorio;


        private static object syncRoot = new Object();


        public static bool cacheActivo = false;



        public static bool CacheActivarDesactivar()
        {
            cacheActivo = !cacheActivo;
            return cacheActivo;
        }



        /// <summary>
        /// Instancia el objeto con la cadena de coneccion y esquema por defecto para el proyecto
        /// </summary>
        public DbOracle()
        {
            prAutoClose = true;
            lock (syncRootDbOracle)
            {
                TotalInstancias++;
                NumeradorInstancias++;
                Numeroinstancia = NumeradorInstancias;
            }


            if (System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("w3wp.exe") ||
                       System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("iisexpress.exe"))
            {
                if (HttpContext.Current != null)
                {
                    this.RequestId = (HttpContext.Current.Items["_PaginaId"] != null ? " || " + HttpContext.Current.Items["_PaginaId"] : "")
                                        + (this.DbSessionId != "" ? " || DbId:" + this.DbSessionId : "");
                    if (RequestId != "")  // para evitar error del app_start
                        this.RequestIdFin = " || RqId:" + HttpContext.Current.Request.GetHashCode();
                }
                if (this.RequestId == "")
                {
                    if (Environment.StackTrace.Contains("FunSeg.itemSeguridadCierreSessionWeb"))
                    {
                        this.RequestId = " || Pag:funseg.itemseguridadcierresessionweb || RqId:" + this.GetHashCode();
                        this.RequestIdFin = " || RqId:" + this.GetHashCode();
                    }
                    else if (Environment.StackTrace.Contains("Global.asax"))
                    {
                        this.RequestId = " || Pag:global.asax || RqId:" + this.GetHashCode();
                        this.RequestIdFin = " || RqId:" + this.GetHashCode();
                    }


                }
            }


            //
            //
            //

            this.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Base"].ConnectionString;
        }


        public static DbOracle getDbOracle()
        {
            lock (syncRoot)
            {
                if (System.Web.HttpContext.Current == null)
                {
                    if (System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("w3wp.exe") ||
                        System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName.EndsWith("iisexpress.exe"))
                    {
                        // web sin contexto (app start, global_asax.Session_End, FunSeg.itemSeguridadCierreSession) (prohibir transacciones)
                        //Logueo.LogueaInfo("NEWDbOracle_SIN_CONTEXTO_NOSEG" + Environment.StackTrace, null);
                        string pagina = "";
                        if (Environment.StackTrace.Contains("FunSeg.itemSeguridadCierreSessionWeb"))
                            pagina = " || Pag:funseg.itemseguridadcierresessionweb";
                        else if (Environment.StackTrace.Contains("Global.asax"))
                            pagina = " || Pag:global.asax";
                        Logueo.LogueaInfo("NEWDbOracle_SIN_CONTEXTO_NOSEG" + pagina, null);
                        return new DbOracle();
                    }
                    else
                    {   // escritorio
                        return _DbOracleVersionEscritorio ?? (_DbOracleVersionEscritorio = new DbOracle());
                    }
                }
                else
                {
                    // web con contexto
                    return (System.Web.HttpContext.Current.Items["DbOracle"] ?? (System.Web.HttpContext.Current.Items["DbOracle"] = new DbOracle())) as DbOracle;
                }
            }
        }




        /// <summary>
        /// Instancia el objeto con la cadena de coneccion y esquema suministrado
        /// </summary>
        /// <param name="ConnectioString">Cadena de conexion Oracle</param>
        /// <param name="Esquema">nombre de esquema (usuario) de trabajo</param>
        public DbOracle(string ConnectioString, string Esquema)
        {
            this.ConnectionString = ConnectionString; ;
        }

        /// <summary>
        /// Diccionario que guarda un cache de parametros de procedimientos
        /// </summary>
        private static Dictionary<string, List<ParametroOracle>> colCommands2 = new Dictionary<string, List<ParametroOracle>>();


        public OracleCommand NewCommand(string commandText)
        {
            prCommand = new OracleCommand();
            if (!string.IsNullOrEmpty(commandText) && (commandText.StartsWith("/*prt_DameTiempo*/") || commandText.StartsWith("/*prt_ActasConstatacionError_s*/") || commandText.StartsWith("/*prt_get_All_Procedures */") || commandText.StartsWith("PR_SP_SIN_USAR")))
            {
                prCommand.CommandTimeout = 900;
            }
            else
            {
                prCommand.CommandTimeout = 150;   // maximo 150 segundos , genera el error => ORA-01013: user requested cancel of current operation
            }
            return prCommand;

        }
        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <param name="cmd"></param>
        public void DeriveParameters(OracleCommand cmd)
        {
            OracleCommandBuilder.DeriveParameters((OracleCommand)cmd);
        }

        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <returns></returns>
        public OracleConnection NewConnection()
        {
            return new OracleConnection();
        }

        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <returns></returns>
        public OracleParameter NewParameter()
        {
            return new OracleParameter();
        }




        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <param name="CommandText"></param>
        /// <param name="parameters"></param>
        /// <param name="cn"></param>
        /// <param name="cmdTy"></param>
        /// <returns></returns>
        protected OracleCommand GetCachedCommand2(string CommandText, object[] parameters, OracleConnection cn, CommandType cmdTy)
        {
            //return null;  // anulo cache de comandos 11/04/2013

            lock (colCommands2)
            {
                OracleCommand ret = null;

                if (colCommands2.ContainsKey(CommandText))
                {
                    ret = NewCommand(CommandText);
                    ret.CommandText = CommandText;
                    ret.CommandType = cmdTy;
                    ret.Connection = prConnection;

                    foreach (ParametroOracle item in colCommands2[ CommandText])
                    {
                        OracleParameter p = new OracleParameter();
                        p.ParameterName = item.Nombre;
                        if (item.TipoOra == OracleDbType.RefCursor
                              || item.TipoOra == OracleDbType.Blob
                              || item.TipoOra == OracleDbType.Clob
                              || item.TipoOra == OracleDbType.NClob)
                            p.OracleDbType = item.TipoOra;
                        else
                            p.DbType = item.TipoDb;

                        p.CollectionType = item.ColeccionTipo;

                        p.Direction = item.Direccion;
                        //if(item.TipoOra == OracleDbType.Varchar2 && item.Direccion == ParameterDirection.Output)
                        if (p.Size != item.Size)
                            p.Size = item.Size;

                        ret.Parameters.Add(p);
                    }
                    return ret;
                }
                else
                {
                    return null;
                }
            }


        }

        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <param name="cmd"></param>
        /// <param name="parameters"></param>
        protected void CacheCommand(OracleCommand cmd, object[] parameters)
        {
            //return;   // anulo cache de comandos 11/04/2013

            lock (colCommands2)
            {
                if (colCommands2.ContainsKey(cmd.CommandText) == false)
                {
                    OracleCommand cmdOra = cmd;
                    List<ParametroOracle> listParam = new List<ParametroOracle>();
                    foreach (OracleParameter item in cmdOra.Parameters)
                    {
                        ParametroOracle p = new ParametroOracle();
                        p.Nombre = item.ParameterName;
                        p.TipoOra = item.OracleDbType;
                        p.ColeccionTipo = item.CollectionType;
                        p.TipoDb = item.DbType;
                        p.Direccion = item.Direction;
                        p.Size = item.Size;
                        listParam.Add(p);
                    }
                    colCommands2.Add( cmd.CommandText, listParam);
                }
            }


        }


        public static void ClearCacheCommand_Publico()
        {
            lock (colCommands2)
            {
                colCommands2.Clear();
            }

        }

        /// <summary>
        /// Implementación del metodo abstracto definido en la clase base. Ver documentación en clase base
        /// </summary>
        /// <param name="Esquema"></param>
        protected void SetearIdSession()
        {
            string sql = "begin " + Esquema + ".pkg_seguridad.id_session :=  ''; end;";

            try
            {
                if (!string.IsNullOrWhiteSpace(this.DbSessionId))
                    sql = "begin " + Esquema + ".pkg_seguridad.id_session :=  '" + this.DbSessionId + "'; end;";
            }
            catch (Exception) { }

            OracleCommand cmd = new OracleCommand(sql, (prConnection));
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();

        }

        ///// <summary>
        ///// Clase que guarda los parametros de un comando de Oracle.
        ///// </summary>
        //class ParameterCache
        //{
        //    /// <summary>
        //    /// Propiedad que identifica a que comando corresponden los parametros.
        //    /// </summary>
        //    public string CommandText { get; set; }

        //    /// <summary>
        //    /// Listado de parametros del comando
        //    /// </summary>
        //    public List<OracleParameterData> Parameters { get; set; }
        //}

        ///// <summary>
        ///// Clase que guarda los datos de un parametro de Oracle.
        ///// </summary>
        //class OracleParameterData
        //{
        //    /// <summary>
        //    /// Nombre del parametro
        //    /// </summary>
        //    public string ParameterName { get; set; }

        //    /// <summary>
        //    /// Tipo de datos del parametro
        //    /// </summary>
        //    public DbType DbType { get; set; }
        //    /// <summary>
        //    /// Tipo de datos Oracle del parametro
        //    /// </summary>
        //    public OracleDbType OracleDbType { get; set; }
        //    /// <summary>
        //    /// Tamaño del parametro
        //    /// </summary>
        //    public int Size { get; set; }

        //    public int[] ArrayBindSize { get; set; }
        //    public OracleParameterStatus[] ArrayBindStatus { get; set; }
        //    public OracleCollectionType CollectionType { get; set; }
        //    public ParameterDirection Direction { get; set; }
        //    public bool IsNullable { get; set; }
        //    public int Offset { get; set; }
        //    public byte Precision { get; set; }
        //    public byte Scale { get; set; }
        //    public string SourceColumn { get; set; }
        //    public DataRowVersion SourceVersion { get; set; }
        //    public OracleParameterStatus Status { get; set; }
        //    public object Value { get; set; }
        //}






        #region Miembros de IDisposable

        public void Dispose()
        {
            if (Connection != null && Connection.State == System.Data.ConnectionState.Open)
            {
                this.Close();
            }

        }

        #endregion

        public static void VerificarCerrarConexiones()
        {
            if (System.Web.HttpContext.Current == null)
            {


            }
            else // web
            {
                DbOracle dal = null;
                try
                {
                    dal = System.Web.HttpContext.Current.Items["DbOracle"] as DbOracle;

                    if (dal != null && dal.Connection != null && dal.Connection.State == System.Data.ConnectionState.Open)
                    {
                        dal.Close();
                        Logueo.LogueaInfo("Conexion Comun Cerrada en Global.asax " + (System.Web.HttpContext.Current.Session != null ? System.Web.HttpContext.Current.Session.SessionID : "") + " " + System.Web.HttpContext.Current.Request.RawUrl);
                    }
                }
                catch { }
            }
        }



    }
}