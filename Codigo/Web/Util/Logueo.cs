using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using log4net;
using System.Data;

namespace UTIL
{
    /// <summary>
    /// Clase para manejar logueos de errores e informaciones.
    /// </summary>
    static public class Logueo
    {
        /// <summary>
        /// Objeto que realiza la tarea de loqueo de mensajes.
        /// </summary>
        private static ILog _logger;

        /// <summary>
        /// Objeto que realiza la tarea de loqueo de mensajes de depuracion
        /// </summary>
        private static ILog _loggerDebug;

        public static bool LoguearErrorViewStateYFamiliares = false;

        public static bool LoguearErrorCaracterInvalido = false;
        /// <summary>
        /// Inicializa la clase <see cref="Logueo"/>.
        /// </summary>
        static Logueo()
        {
            log4net.Config.XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo(AppDomain.CurrentDomain.BaseDirectory + "log4net.config"));
            _logger = LogManager.GetLogger("LogGeneral");
            _loggerDebug = LogManager.GetLogger("LogDepurar");
        }

        /// <summary>
        /// {CC2D43FA-BBC4-448A-9D0B-7B57ADF2655C}
        /// </summary>
        public enum Nivel { normal, critico }

        /// <summary>
        /// Loguea una informacion del sistema.
        /// </summary>
        /// <param name="Mensaje">El mensaje.</param>
        /// <param name="objetos">Los parametros de la informacion.</param>
        public static void LogueaInfo(string Mensaje, params object[] objetos)
        {
            StringBuilder sb = new StringBuilder(Mensaje);
            sb.Append(". ");
            if (objetos != null && objetos.Length > 0)
            {
                sb.Append("Valores: ");
                string strSeparador = "";
                foreach (object obj in objetos)
                {
                    sb.Append(strSeparador);
                    strSeparador = " ; ";
                    if (obj is System.Collections.IList)
                    {
                        System.Collections.IList Lista = (System.Collections.IList)obj;
                        sb.AppendFormat("Tipo = {0} - CantidadElementos = {1}", obj.GetType().Name, Lista.Count);
                    }
                    else
                    {
                        if (obj == null)
                        {
                            sb.AppendFormat("Null");
                        }
                        else
                        {
                            sb.AppendFormat("Tipo = {0} - ToString() = {1}", obj.GetType().Name, obj.ToString());
                        }
                    }
                }
            }
            _loggerDebug.Info(sb.ToString());
        }

        /// <summary>
        /// Loguea un error.
        /// </summary>
        /// <param name="Error">El error.</param>
        /// <param name="objetos">Parametros del error.</param>
        public static void LogueaError(Exception Error, params object[] objetos)
        {
            //if (Error is System.Threading.ThreadAbortException || Error is Excepciones.ExcepcionBase)
            //if (Error is System.Threading.ThreadAbortException)
            //return;   // no loguea por response.redirect, ni por excepciones controladas.

            if ((Error.Message.Contains("This is an invalid script resource request") || Error.Message.Contains("Invalid viewstate") || Error.Message.Contains("Invalid length for a Base-64 char array.")) && !LoguearErrorViewStateYFamiliares
                || (Error.Message.Contains("Request.Form peligroso") && !LoguearErrorCaracterInvalido))
            {
                return;
            }
            var sb = new StringBuilder();

            try
            {
            if (System.Web.HttpContext.Current != null && System.Web.HttpContext.Current.Request != null)
            {
                if (System.Web.HttpContext.Current.Items["_PaginaId"] != null)
                    sb.Append(System.Web.HttpContext.Current.Items["_PaginaId"]);
                else
                {
                    var pagina = string.Empty;
                    if (System.Web.HttpContext.Current.Request.FilePath.ToLower().Contains("aspx") ||
                        System.Web.HttpContext.Current.Request.FilePath.ToLower().Contains("asmx"))
                    {
                        pagina = System.Web.HttpContext.Current.Request.FilePath.Substring(
                                 System.Web.HttpContext.Current.Request.FilePath.LastIndexOf("/") + 1).ToLower();
                    }
                    else
                    {
                        pagina = System.Web.HttpContext.Current.Request.RawUrl.ToLower();
                    }

                    sb.Append(" | Pag:" + pagina + " | RqId:" + System.Web.HttpContext.Current.Request.GetHashCode() +
                              " | SsId:" +
                              (System.Web.HttpContext.Current.Session != null
                                   ? System.Web.HttpContext.Current.Session.SessionID
                                   : ""));
                }
            }
            }
            catch (Exception)
            {
                sb.Append("Global.Asax App_Start | ");
                
            }

            if (objetos.Length > 0)
            {
                sb.Append(" | Valores: ");
                var strSeparador = "";
                foreach (var obj in objetos)
                {
                    var nombreCompleto = obj.GetType().FullName;
                    sb.Append(strSeparador);
                    strSeparador = " ; ";
                    if (obj is System.Collections.IList)
                    {
                        var Lista = (System.Collections.IList)obj;
                        sb.AppendFormat("Tipo = {0} - CantidadElementos = {1}", obj.GetType().Name, Lista.Count);
                    }
                    else if (nombreCompleto.Contains("Dto"))
                    {
                        var propiedades = obj.GetType().GetProperties();
                        if (propiedades != null && propiedades.Length > 0)
                        {
                            foreach (var propertyInfo in propiedades)
                            {
                                sb.AppendFormat(propertyInfo.Name + ": " + propertyInfo.GetValue(obj, null) + " ");
                            }
                        }
                    }
                    else
                    {
                        sb.AppendFormat("Tipo = {0} - ToString() = {1}", obj.GetType().Name, obj.ToString());
                    }
                }
            }
            _logger.Error(sb.ToString(), Error);
        }

        public static string LoguearParametrosComando(IDbCommand cmd)
        {
            string parametros = "";
            if (cmd.CommandText != "")
            {
                //if (cmd.CommandType == CommandType.StoredProcedure)
                parametros = "declare" + Environment.NewLine + "p_salida1 varchar(2000);" + Environment.NewLine + "begin" + Environment.NewLine + cmd.CommandText + "(" + Environment.NewLine;
                foreach (IDataParameter item in cmd.Parameters)
                {
                    if (item.Value == DBNull.Value || item.Value == null)
                        parametros += item.ParameterName + " => null, " + Environment.NewLine;
                    else if (item.Value.GetType().Name == "String")
                        parametros += item.ParameterName + " => '" + item.Value + "', " + Environment.NewLine;
                    else if (item.Value.GetType().Name == "DateTime")
                        parametros += item.ParameterName + " => to_date('" + ((DateTime)item.Value).ToString("dd/MM/yyyy HH:mm:ss") + "','dd/mm/yyyy HH24:MI:SS'), " + Environment.NewLine;
                    else if (item.Value.GetType().Name == "Single")
                        parametros += item.ParameterName + " => " + item.Value.ToString().Replace(",", ".") + ", " + Environment.NewLine;
                    else
                        parametros += item.ParameterName + " => " + item.Value + ", " + Environment.NewLine;
                }
                if (parametros!="")
                    parametros = parametros.Substring(0, parametros.Length - 4) + "); " + Environment.NewLine + "end;";

                Logueo.LogueaError(new Exception("Comando SQL con error:\n"), new[] { parametros });
            }
            
            //return parametros;
            return "";
        }
    }
}
