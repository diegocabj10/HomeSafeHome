using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.SessionState;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using DTO;
namespace BL
{


    /// <summary>
    /// Esta clase contiene las entidades que se guardan en la sesion mientras el usuario se encuentra trabajando
    /// </summary>
    public static class ManejoEstado
    {

        /// <summary>
        /// Token de la aplicacion, viaja en las headers del request y 
        /// </summary>
        public static string Tk_request
        {
            get
            {
                return HttpContext.Current.Items["_tk"] as string;

            }
            set
            {
                HttpContext.Current.Items["_tk"] = value;
            }
        }


        /// <summary>
        /// Perfiles del usuario logueado
        /// </summary>
        public static List<int> IdPerfiles
        {
            get
            {
                DtoUsuario us = HttpContext.Current.Cache["_DtoUsuarioLogueado_" + HttpContext.Current.Items["_tk"]] as DtoUsuario;
                if (us != null)
                {
                    return us.IdPerfiles;
                }
                else
                {
                    return null;
                }
            }
        }
        public static string DBSessionId
        {
            get
            {
                // si hay usuario logueado, devuelvo el _tk que es mismo que DbSessionId
                if (HttpContext.Current.Cache["_DtoUsuarioLogueado_" + HttpContext.Current.Items["_tk"]] != null)
                {
                    return HttpContext.Current.Items["_tk"].ToString();
                }
                else
                {
                    return "";
                }
            }
        }

        public static string CiDi
        {
            get
            {
                return HttpContext.Current.Cache["_CiDi" + HttpContext.Current.Items["_tk"]] as string ?? "";
            }
            set
            {
                HttpContext.Current.Cache.Insert("_CiDi" + HttpContext.Current.Items["_tk"], value, null, System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(0, FuncionesSeguridad.CacheSlidingTimeout, 0));
            }
        }





        public static bool? Redirect
        {
            get
            {
                if (HttpContext.Current != null && HttpContext.Current.Cache != null && HttpContext.Current.Cache["_Redirect" + HttpContext.Current.Items["_tk"]] != null)
                {
                    return HttpContext.Current.Cache["_Redirect" + HttpContext.Current.Items["_tk"]] as bool?;
                }
                else
                    return null;
            }
            set
            {
                if (HttpContext.Current != null && HttpContext.Current.Cache != null)
                {
                    if (value != null)
                        HttpContext.Current.Cache.Insert("_Redirect" + HttpContext.Current.Items["_tk"], value, null, System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(0, 3, 0));
                    else
                        HttpContext.Current.Cache.Remove("_Redirect" + HttpContext.Current.Items["_tk"]);
                }
            }
        }

        public static string ContenidoExcel
        {
            get
            {
                return HttpContext.Current.Cache["ContenidoExcel" + HttpContext.Current.Items["_tk"]] as string;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                    HttpContext.Current.Cache.Remove("ContenidoExcel" + HttpContext.Current.Items["_tk"]);
                else
                    HttpContext.Current.Cache.Insert("ContenidoExcel" + HttpContext.Current.Items["_tk"], value, null, DateTime.Now.AddMinutes(3), System.Web.Caching.Cache.NoSlidingExpiration);
            }
        }

        public static DtoUsuario DtoUsuarioLogueado
        {
            get
            {

                if (HttpContext.Current.Cache["_DtoUsuarioLogueado_" + HttpContext.Current.Items["_tk"]] != null)
                    return (DtoUsuario)HttpContext.Current.Cache["_DtoUsuarioLogueado_" + HttpContext.Current.Items["_tk"]];
                else
                    return null;
            }
            set
            {



                // si ya hay un usuario anterior, debemos darle de baja
                if (ManejoEstado.DtoUsuarioLogueado != null)
                {
                    // eliminar del cache (en funseg.itemSeguridadCierreSessionWeb se encarga de  cerrar sesion y loguearlo
                    HttpContext.Current.Cache.Remove("_DtoUsuarioLogueado_" + HttpContext.Current.Items["_tk"]);
                }

            
            }
        }


        /// <summary>
        /// solo se lee una vez y se elimina
        /// </summary>
        public static string ErrorMensaje
        {
            get
            {
                string _tk = "";
                if (HttpContext.Current != null && HttpContext.Current.Items["_tk"] != null)
                    _tk = HttpContext.Current.Items["_tk"].ToString();
                string aux = System.Web.HttpRuntime.Cache["_ErrorMensaje" + _tk] as string;
                return aux;
            }
            set
            {
                string _tk = "";
                if (HttpContext.Current != null && HttpContext.Current.Items["_tk"] != null)
                    _tk = HttpContext.Current.Items["_tk"].ToString();
                HttpContext.Current.Cache.Insert("_ErrorMensaje" + _tk, value, null, DateTime.Now.AddMinutes(1), System.Web.Caching.Cache.NoSlidingExpiration);
            }
        }

        public static string IpEstacion
        {
            get
            {
                if (HttpContext.Current != null && HttpContext.Current.Session != null)
                    return (string)HttpContext.Current.Session["_IpEstacion"];
                else
                    return "";
            }

            set
            {
                if (HttpContext.Current != null && HttpContext.Current.Session != null)
                    HttpContext.Current.Session["_IpEstacion"] = value;
            }
        }
        public static string IpEstacionAux
        {
            get
            {
                if (HttpContext.Current != null && HttpContext.Current.Session != null)
                    return (string)HttpContext.Current.Session["_IpEstacionAux"];
                else
                    return "";
            }

            set
            {
                if (HttpContext.Current != null && HttpContext.Current.Session != null)
                    HttpContext.Current.Session["_IpEstacionAux"] = value;
            }
        }
    }
}