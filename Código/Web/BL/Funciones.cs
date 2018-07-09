using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using DAL;
using DTO;
using UTIL;
using System.Globalization;
using System.Data;
using System.Web;
using System.Collections.Specialized;


namespace BL
{
    public static class Funciones
    {

        public static object[] AgregarAlArray(object[] array, object objeto)
        {
            List<object> listaArray = null;
            if (array != null && array.Length == 0)
                listaArray = new List<object>();
            else
                listaArray = new List<object>(array);

            listaArray.Add(objeto);
            return listaArray.ToArray();
        }

        /// <summary>
        /// Valida si el nro. de CUIT es correcto.
        /// </summary>
        /// <param name="sNroCUIT">Nro. de CUIT</param>
        /// <returns>TRUE si es un nro valido, FALSE en caso contrario</returns>
        public static bool ValidarCuit(string sNroCUIT)
        {
            string sOut;

            return ValidarCuit(sNroCUIT, out sOut);
        }

        /// <summary>
        /// Valida si el nro. de CUIT es correcto.
        /// </summary>
        /// <param name="sNroCUIT">Nro. de CUIT</param>
        /// <param name="sNroFormateado">Nro de CUIT con el formato aplicado</param>
        /// <returns>TRUE si el nro de CUIL es correcto, FALSE en caso contrario</returns>
        public static bool ValidarCuit(string sNroCUIT, out string sNroFormateado)
        {
            string sCuit;
            long lSuma = 0;
            long lResto = 0;
            long aux;

            sCuit = "";

            for (int i = 0; i < sNroCUIT.Length; i++)
            {
                if (long.TryParse(sNroCUIT.Substring(i, 1), out aux))
                    sCuit = sCuit + sNroCUIT.Substring(i, 1);
            }
            sCuit = sCuit.Trim();
            sNroFormateado = "";

            //"Número de C.U.I.T incorrecto", "Cantidad de dígitos no válida"
            if (sCuit.Length != 11) return false;

            long.TryParse(sCuit.Substring(0, 1), out aux);
            lSuma = lSuma + aux * 5;

            long.TryParse(sCuit.Substring(1, 1), out aux);
            lSuma = lSuma + aux * 4;

            long.TryParse(sCuit.Substring(2, 1), out aux);
            lSuma = lSuma + aux * 3;

            long.TryParse(sCuit.Substring(3, 1), out aux);
            lSuma = lSuma + aux * 2;

            long.TryParse(sCuit.Substring(4, 1), out aux);
            lSuma = lSuma + aux * 7;

            long.TryParse(sCuit.Substring(5, 1), out aux);
            lSuma = lSuma + aux * 6;

            long.TryParse(sCuit.Substring(6, 1), out aux);
            lSuma = lSuma + aux * 5;

            long.TryParse(sCuit.Substring(7, 1), out aux);
            lSuma = lSuma + aux * 4;

            long.TryParse(sCuit.Substring(8, 1), out aux);
            lSuma = lSuma + aux * 3;

            long.TryParse(sCuit.Substring(9, 1), out aux);
            lSuma = lSuma + aux * 2;

            Math.DivRem(lSuma, 11, out lResto);

            switch (lResto)
            {
                case 0: lSuma = 0; break;
                case 1: lSuma = 0; break;
                default: lSuma = (11 - lResto); break;
            }
            long.TryParse(sCuit.Substring(10, 1), out aux);

            if (lSuma == aux)
            {
                sNroFormateado = sCuit.Substring(0, 2) + sCuit.Substring(2, 8) + sCuit.Substring(10, 1);
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Valida si el nro de CUIT se corresponde con el nro de documento.
        /// </summary>
        /// <param name="sNroCUIT">Nro de CUIT</param>
        /// <param name="sNroDocumento">Nro de documento</param>
        /// <returns>TRUE si ambos nros son iguales, FALSE en caso contrario</returns>
        public static bool ValidarCuitVsDocumento(string sNroCUIT, string sNroDocumento)
        {
            if (!ValidarCuit(sNroCUIT))
                return false;
            string cuit = sNroCUIT.Remove(sNroCUIT.Length - 1, 1);
            cuit = cuit.Remove(0, 2);
            return cuit == sNroDocumento.PadLeft(8, '0');
        }

        #region NumerosToText

        /// <summary>
        /// Transforma un cadena con un número en punto flotante en un número escrito.
        /// </summary>
        /// <param name="pNumero">Cadena con el número a transformar</param>
        /// <returns>Cadena con el número escrito</returns>
        public static string NumberToText(string pNumero)
        {
            string[] aTablaNro = new string[46];
            aTablaNro[0] = " CERO";
            aTablaNro[1] = " UN";
            aTablaNro[2] = " DOS";
            aTablaNro[3] = " TRES";
            aTablaNro[4] = " CUATRO";
            aTablaNro[5] = " CINCO";
            aTablaNro[6] = " SEIS";
            aTablaNro[7] = " SIETE";
            aTablaNro[8] = " OCHO";
            aTablaNro[9] = " NUEVE";
            aTablaNro[10] = " DIEZ";
            aTablaNro[11] = " ONCE";
            aTablaNro[12] = " DOCE";
            aTablaNro[13] = " TRECE";
            aTablaNro[14] = " CATORCE";
            aTablaNro[15] = " QUINCE";
            aTablaNro[16] = " DIECISEIS";
            aTablaNro[17] = " DIECISIETE";
            aTablaNro[18] = " DIECIOCHO";
            aTablaNro[19] = " DIECINUEVE";
            aTablaNro[20] = " VEINTE";
            aTablaNro[21] = " VEINTIUN";
            aTablaNro[22] = " VEINTIDOS";
            aTablaNro[23] = " VEINTITRES";
            aTablaNro[24] = " VEINTICUATRO";
            aTablaNro[25] = " VEINTICINCO";
            aTablaNro[26] = " VEINTISEIS";
            aTablaNro[27] = " VEINTISIETE";
            aTablaNro[28] = " VEINTIOCHO";
            aTablaNro[29] = " VEINTINUEVE";
            aTablaNro[30] = " TREINTA";
            aTablaNro[31] = " CUARENTA";
            aTablaNro[32] = " CINCUENTA";
            aTablaNro[33] = " SESENTA";
            aTablaNro[34] = " SETENTA";
            aTablaNro[35] = " OCHENTA";
            aTablaNro[36] = " NOVENTA";
            aTablaNro[37] = " CIENTO";
            aTablaNro[38] = " DOSCIENTOS";
            aTablaNro[39] = " TRESCIENTOS";
            aTablaNro[40] = " CUATROCIENTOS";
            aTablaNro[41] = " QUINIENTOS";
            aTablaNro[42] = " SEISCIENTOS";
            aTablaNro[43] = " SETECIENTOS";
            aTablaNro[44] = " OCHOCIENTOS";
            aTablaNro[45] = " NOVECIENTOS";

            string xMon = "";
            string xLet = "";
            //double x1 = 0;
            double x2 = 0;
            double x3 = 0;
            //x1=0;

            double pEnt = 0;
            decimal pDec = 0;
            long nEnt = (long)double.Parse(pNumero);
            double nDouble = double.Parse(pNumero);
            double nn = Convert.ToDouble(Convert.ToDecimal(nDouble) - Convert.ToDecimal(nEnt)) * 100; //(double)decimal.Truncate((decimal)((nDouble - (double)nEnt) * 100)) ;

            pDec = Redondeo(nn, 0);
            if (pDec == 100)
            {
                //por si la parte decimal es ,9999999 y debemos redondear a un entero mas
                pDec = 0;
                pEnt = (int)nDouble + 1;
            }
            else
                pEnt = (int)nDouble;
            xLet = CerosAdelante(pEnt, 12);
            if (xLet.Length <= 15)
                xLet = xLet + pDec.ToString();
            else
                return "El valor excedió el maximo";
            x3 = double.Parse(xLet.Substring(0, 3));
            if (x3 > 0)
            {
                Modulo(ref xMon, x3, aTablaNro);
                xMon += " MIL";
            }
            x3 = double.Parse(xLet.Substring(3, 3));
            if (x3 > 0)
            {
                Modulo(ref xMon, x3, aTablaNro);
                xMon += xLet.Substring(0, 3).CompareTo("000001") == 0 ? " MILLON" : " MILLONES";
            }
            else
                xMon += xLet.Substring(0, 3).CompareTo("000") != 0 ? " MILLONES" : "";
            x3 = double.Parse(xLet.Substring(6, 3));
            if (x3 > 0)
            {
                Modulo(ref xMon, x3, aTablaNro);
                xMon += " MIL";
            }
            aTablaNro[1] = " UNO";
            aTablaNro[21] = " VEINTIUNO";
            x3 = double.Parse(xLet.Substring(9, 3));
            Modulo(ref xMon, x3, aTablaNro);
            if (xLet.Length > 13)
            {
                x2 = double.Parse(xLet.Substring(12, 2));
                if (x2 != 0)
                    xMon += " CON " + x2.ToString() + " CTVOS";
            }
            return xMon;
        }

        /// <summary>
        /// Completa de a pedazos la cadena con el número.
        /// </summary>
        /// <param name="xMon">La cadena que se irá completando</param>
        /// <param name="x3">Punto flotante relativo al número a transformar</param>
        /// <param name="aTablaNro">Tabla con los nombres de los numeros</param>
        private static void Modulo(ref string xMon, double x3, string[] aTablaNro)
        {
            string xlt;
            int xs;
            int x1;
            int x2;

            xlt = CerosAdelante(x3, 3);
            if (x3 == 100)
                xMon += " CIEN";
            else
            {
                x1 = int.Parse(xlt.Substring(0, 1));
                if (x1 != 0)
                {
                    xs = x1 + 36;
                    xMon += aTablaNro[xs];
                }
                x2 = int.Parse(xlt.Substring(1, 2));
                if ((x2 > 0) && (x2 < 30))
                    xMon += aTablaNro[x2];
                if (x2 > 29)
                {
                    xs = int.Parse(xlt.Substring(1, 1)) + 27;
                    xMon += aTablaNro[xs];

                    x1 = int.Parse(xlt.Substring(2, 1));
                    if (x1 > 0)
                        xMon += " Y" + aTablaNro[x1];
                }
            }
        }


        /// <summary>
        /// Agrega ceros a la parte entera hasta completar una cantidad fija de dígitos.
        /// </summary>
        /// <param name="pValor">Número en punto flotante a completar</param>
        /// <param name="pTamano">Cantidad de dígitos en total, incluyendo punto</param>
        /// <returns>Cadena con una cantidad fija de caracteres conteniendo el valor en punto flotante</returns>
        private static string CerosAdelante(double pValor, byte pTamano)
        {
            int tamano = pTamano - pValor.ToString().Length;
            string ceros = "";
            for (int i = 0; i < tamano; i++)
                ceros += "0";
            return ceros + pValor.ToString();
        }

        /// <summary>
        /// Redondea de acuerdo a la cantidad de dígitos deseados.
        /// </summary>
        /// <param name="pNumber">El número en punto flotante a redondear</param>
        /// <param name="pDigitos">La cantidad de dígios</param>
        /// <returns>Un decimal con la cantidad de decimales deseados</returns>
        private static decimal Redondeo(double pNumber, int pDigitos)
        {
            long d = 0;
            int d2;
            if (pDigitos >= 0)
            {
                try
                {
                    d = 10 ^ pDigitos;
                    return ((long)(pNumber * d)) / d;
                }
                catch (Exception ex)
                {
                    string a = ex.Message;
                    return Math.Round((decimal)pNumber, pDigitos);
                }
            }
            else
            {
                d2 = 10 ^ pDigitos;
                return (long)(((long)(pNumber * d2)) / d2);
            }
        }
        #endregion


        public static long? ObtenerUltimoDigitoCuil(string sNroCUIT)
        {
            string sCuit;
            long lSuma = 0;
            long lResto = 0;
            long aux;

            sCuit = "";

            for (int i = 0; i < sNroCUIT.Length; i++)
            {
                if (long.TryParse(sNroCUIT.Substring(i, 1), out aux))
                    sCuit = sCuit + sNroCUIT.Substring(i, 1);
            }
            sCuit = sCuit.Trim();

            //"Número de C.U.I.T incorrecto", "Cantidad de dígitos no válida"
            if (sCuit.Length != 11) return null;

            long.TryParse(sCuit.Substring(0, 1), out aux);
            lSuma = lSuma + aux * 5;

            long.TryParse(sCuit.Substring(1, 1), out aux);
            lSuma = lSuma + aux * 4;

            long.TryParse(sCuit.Substring(2, 1), out aux);
            lSuma = lSuma + aux * 3;

            long.TryParse(sCuit.Substring(3, 1), out aux);
            lSuma = lSuma + aux * 2;

            long.TryParse(sCuit.Substring(4, 1), out aux);
            lSuma = lSuma + aux * 7;

            long.TryParse(sCuit.Substring(5, 1), out aux);
            lSuma = lSuma + aux * 6;

            long.TryParse(sCuit.Substring(6, 1), out aux);
            lSuma = lSuma + aux * 5;

            long.TryParse(sCuit.Substring(7, 1), out aux);
            lSuma = lSuma + aux * 4;

            long.TryParse(sCuit.Substring(8, 1), out aux);
            lSuma = lSuma + aux * 3;

            long.TryParse(sCuit.Substring(9, 1), out aux);
            lSuma = lSuma + aux * 2;

            Math.DivRem(lSuma, 11, out lResto);

            switch (lResto)
            {
                case 0: lSuma = 0; break;
                case 1: lSuma = 0; break;
                default: lSuma = (11 - lResto); break;
            }

            return lSuma;

        }



        /// <summary>
        /// Indica si la excepción lanzada corresponde a un tipo de excepción de base de datos personalizada.
        /// </summary>
        /// <param name="ex">Excepcion capturada</param>
        public static string LoguearFormatearExcepcion(Exception ex, bool esGloabalAsax, params object[] mensajeAdicional)
        {

            if (ex.Message == "Redirect" || ex.Message == "El servidor no puede establecer el estado después de enviar los encabezados HTTP.")   // cuando viene de redireccion simplemente lo ignoramos
                return "Redirect";

            if (ex.Message.Contains("La conexión debe estar abierta para esta operación"))
            {
                ex = new ApplicationException("Error en la comunicación, reintente nuevamente...");
            }

            //excepcion base u exepcionbase envuelta o peticion local
            if (ex is ApplicationException || ex is ExcepcionBase || ex.Message.Contains("ExcepcionBase"))  
            {
                if (esGloabalAsax)
                {
                    mensajeAdicional = Funciones.AgregarAlArray(mensajeAdicional, "Error conocido no controlado ");
                    Logueo.LogueaError(ex, mensajeAdicional);
                }

                return ex.Message;
            }

            if (HttpContext.Current != null)
            {
                string navegador = string.Empty;
                string version = string.Empty;
                string ipProxi = "";
                string ipCliente = "";

                try //IIS7
                {
                    if (HttpContext.Current.Request.Browser != null)
                    {
                        navegador = HttpContext.Current.Request.Browser.Browser;
                        string browserType = HttpContext.Current.Request.Browser.Type;
                        if (browserType == "IE7")//Obtengo la version y vista de compatibilidad usada para Internet Explorer 7 si corresponde
                        {
                            string userAgent = HttpContext.Current.Request.UserAgent;

                            if (userAgent.Contains("Trident/5.0")) //Se está usando IE9
                                if (browserType == "IE7")
                                    version = "9, con vista de compatibilidad";
                                else
                                    version = HttpContext.Current.Request.Browser.Version;
                            else if (userAgent.Contains("Trident/4.0")) //Se está usando IE8
                                if (browserType == "IE7")
                                    version = "8, con vista de compatibilidad";
                                else
                                    version = HttpContext.Current.Request.Browser.Version;
                        }
                        else
                        {
                            version = HttpContext.Current.Request.Browser.Version;
                        }
                    }

                    ipProxi = HttpContext.Current.Request.UserHostAddress;
                    ipCliente = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                }
                catch (Exception)
                {
                }


                NameValueCollection controles = null;
                int contador = 0;
                string valores = "";

                try //iis7
                {
                    controles = HttpContext.Current.Request.Form;
                    foreach (var item in controles.AllKeys)
                    {
                        if (!string.IsNullOrEmpty(item) && item.Contains("ctl00$") && !item.Contains("MaskedEditExtender"))
                            valores += item + ": " + controles[contador] + ", ";
                        contador++;
                    }
                }
                catch (Exception)
                {
                }

                if (HttpContext.Current.Session != null)
                {
                    var usuarioLogueado = (DtoUsuario)HttpContext.Current.Cache["_DtoUsuarioLogueado" + HttpContext.Current.Items["_tk"]];
                    if (usuarioLogueado != null)
                        valores += " | UsuarioLogueado (Para controlar): " + usuarioLogueado.PersonaNombre + " - IdUsuario: " + usuarioLogueado.Id;
                }

                mensajeAdicional = Funciones.AgregarAlArray(mensajeAdicional, "\n | Navegador: " + navegador + " - Versión: " + version + " | IP proxy: " + ipProxi + " | IP Cliente: " + ipCliente + " | Controles FORM: " + valores);
            }

            StringBuilder sb = new StringBuilder();
            if (ex.InnerException != null && ex.Message.StartsWith("\nParametros"))
            {
                mensajeAdicional = Funciones.AgregarAlArray(mensajeAdicional, ex.Message);
            }

            ex = GetInnerException(ex);
            if (ex.Message.StartsWith("ORA-")) //ex.GetType() == typeof(OracleException) && 
            {
                int codError = 0;

                int.TryParse(ex.Message.Substring(4, 5), out codError);

                // Si el error es mayor o igual 20999 es una excepción personalizada.
                if (codError >= 20999)
                {
                    if (esGloabalAsax)
                    {
                        mensajeAdicional = Funciones.AgregarAlArray(mensajeAdicional, "Error conocido no controlado ");
                        Logueo.LogueaError(ex, mensajeAdicional);
                    }

                    return GetMensajeFormateado(ex.Message);
                }
                else
                {
                    //Loguea el error no controlado de BD, si es distinto de globalAsax para no loguearlo 2 veces
                    Logueo.LogueaError(ex, mensajeAdicional);

                    //Validar si el mensaje es por falta de espacio en disco
                    if (ex.Message.Contains("unable to extend table"))
                    {
                        var fileName = HttpContext.Current.Server.MapPath("~/App_Data/Variables.txt");

                        StreamWriter sw = null;
                        StreamReader sr = null;
                        if (!File.Exists(fileName))
                            sw = File.CreateText(fileName);
                        else
                            sr = File.OpenText(fileName);

                        if (sw != null)
                        {
                            sw.WriteLine(DateTime.Now.ToString());
                            sw.Close();

                            EnviarMailsSinEspacioEnDisco();
                        }
                        else
                        {
                            var linea = sr != null ? sr.ReadLine() : string.Empty;
                            sr.Close();
                            DateTime fechaUltAviso;

                            if (DateTime.TryParse(linea, out fechaUltAviso))
                            {
                                TimeSpan ts = new TimeSpan();
                                ts = DateTime.Now.Subtract(fechaUltAviso);

                                if (ts.TotalHours > 1)
                                {
                                    EnviarMailsSinEspacioEnDisco();

                                    sw = File.CreateText(fileName);
                                    sw.WriteLine(DateTime.Now.ToString());
                                    sw.Close();
                                }
                            }
                        }
                    }

                    if (System.Web.HttpContext.Current != null)
                    {
                        try
                        {
                            sb.Append("RqId:" + System.Web.HttpContext.Current.Request.GetHashCode() + " - ");
                        }
                        catch (Exception)
                        {
                        }
                    }
                    sb.Append("Error de lectura/escritura al acceder a la Base de Datos");
                    return (HttpContext.Current != null && HttpContext.Current.Request.IsLocal) ? ex.ToString() : sb.ToString();
                }
            }
            else
            {
                Logueo.LogueaError(ex, mensajeAdicional);
                if (ex.ToString().Contains("HttpRequestValidationException"))
                {
                    sb.Append("Está ingresando caracteres incorrectos en el formulario. Ejemplo <>.");
                    return sb.ToString();
                }
                if (System.Web.HttpContext.Current != null)
                {
                    try //iis7
                    {
                        sb.Append("RqId:" + System.Web.HttpContext.Current.Request.GetHashCode() + " - ");
                    }
                    catch (Exception)
                    {
                    }
                }
                sb.Append("Ha ocurrido un error en la aplicación");
                return (HttpContext.Current != null && HttpContext.Current.Request.IsLocal) ? ex.ToString() : sb.ToString();
                
            }
        }



        /// <summary>
        /// Devuelve el mensaje de la excepcion concatenado con el inner
        /// </summary>
        /// <param name="ex">Excepcion</param>
        /// <returns>Mensaje de la excepcion</returns>
        public static string GetMensajeInnerYExcepcion(Exception ex)
        {
            if (ex.InnerException != null && ex.Message.StartsWith("\nParametros"))
            {
                return ex.InnerException.Message + ex.Message;
            }
            return ex.Message;
        }

        /// <summary>
        /// Metodo recursivo para devolver el ultimo InnerException
        /// </summary>
        /// <param name="ex">Excepcion capturada</param>
        /// <returns></returns>
        public static Exception GetInnerException(Exception ex)
        {
            if (ex.InnerException == null)
                return ex;
            else
                return GetInnerException(ex.InnerException);
        }

        /// <summary>
        /// Obtiene los mensajes que provienen de excepciones de la base de datos eliminando la detalles del error irrelevantes para el usuario.
        /// </summary>
        /// <param name="mensajeOriginal"></param>
        public static string GetMensajeFormateado(string mensajeOriginal)
        {
            try
            {
                if (mensajeOriginal.Contains("ORA-"))
                {
                    int hasta = mensajeOriginal.Length - 10;
                    if (mensajeOriginal.Contains("\n"))
                        hasta = mensajeOriginal.IndexOf("\n") - 10;
                    return mensajeOriginal.Substring(10, hasta);
                }
                return mensajeOriginal;
            }
            catch (Exception)
            {
                return mensajeOriginal;
            }
        }

        public static void EnviarMail(string dirRemitente, string nombreRemitente, string dirDestinatario, string nombreDestinatario,
                                      string titulo, string contenido, out string resultado)
        {
            resultado = string.Empty;
            var parametros = new object[] { dirRemitente
                                            ,nombreRemitente
                                            ,dirDestinatario
                                            ,nombreDestinatario
                                            ,titulo
                                            ,contenido
                                            ,resultado };

            Repositorio.ExecuteNonQuery("seg_ciu.send_mail", parametros);
        }

        private static void EnviarMailsSinEspacioEnDisco()
        {
            String mails = "ministerio.seguridad.sitemas@gmail.com";
            string resultado;

            var mailsSeparados = mails.Split(',');
            foreach (var mail in mailsSeparados)
            {
                EnviarMail("sistemas.gobierno@cba.gov.ar"
                           , "Correo Automatico"
                           , mail
                           , "Sistemas"
                           , "Sin espacio en disco."
                           , "Se quedo sin espacio en disco la base de datos " + DateTime.Now.ToString()
                           + "\n" + "Base de datos: 5243090. De lunes a viernes."
                           + "\n" + "Monitoreo: 4476054. Sabados y Domingos."
                           , out resultado);
            }
        }
    }

}
