using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using DTO;
using System.Configuration;
using System.Web.Security;
using UTIL;
namespace BL
{
    /// <summary>
    /// Funcion con metodo de seguridad
    /// </summary>
    public class FuncionesSeguridad
    {
        public static string jsVersion = "09092018";
        public static int CacheSlidingTimeout = 20;
        public static bool LoguearPaginas = true;




        public static void itemSeguridadCierreSession(string key, System.Web.Caching.CacheItemUpdateReason reason, out object value, out System.Web.Caching.CacheDependency dependency, out DateTime absoluteExpiration, out TimeSpan slidingExpiration)
        {
            // este metodo cierra session de los usuarios de webservice

            dependency = null; // new System.Web.Caching.CacheDependency(filepath);
            absoluteExpiration = System.Web.Caching.Cache.NoAbsoluteExpiration;
            slidingExpiration = System.Web.Caching.Cache.NoSlidingExpiration;
            value = null; // doc;

            if (HttpRuntime.Cache[key] != null && HttpRuntime.Cache[key] is DtoUsuario)
                CerrarSesionApp((HttpRuntime.Cache[key] as DtoUsuario).DbSessionId);

        }

        //public static void itemSeguridadCierreSessionWeb(string key, System.Web.Caching.CacheItemUpdateReason reason, out object value, out System.Web.Caching.CacheDependency dependency, out DateTime absoluteExpiration, out TimeSpan slidingExpiration)
        public static void itemSeguridadCierreSessionWeb(string key, object value, System.Web.Caching.CacheItemRemovedReason reason)

        {
            if (value != null && value is DtoUsuario)
            {
                DtoUsuario us = value as DtoUsuario;
                // cerrar session de base de datos
                CerrarSesionApp(us.DbSessionId);
                // el cache cae solo.
                try
                {
                    if (LoguearPaginas)
                    {
                        //DateTime fecha = (DateTime)HttpRuntime.Cache["AplicacionFechaHoraInicio"];
                        var razon = "";
                        if (reason == System.Web.Caching.CacheItemRemovedReason.Expired)
                            razon = "Inactividad";
                        else if (reason == System.Web.Caching.CacheItemRemovedReason.Expired)
                            razon = "Cierre Session";
                        else
                            razon = reason.ToString();

                        Logueo.LogueaInfo("Acc:CacheSessionFin || Us:" + us.Nombre + " (" + us.Nombre + ")" + " || SsId:" + us.SessionId + " || DbId:" + us.DbSessionId + " || TpMnCSs " + DateTime.Now.Subtract((DateTime)us.FechaInicio).TotalMinutes.ToString("0") + " || RazonBaja:" + razon, new object[] { });
                    }
                }
                catch (Exception)
                {
                    if (LoguearPaginas)
                    {
                        Logueo.LogueaInfo("Acc:CacheSessionFinError || SsId:" + us.SessionId + " || DbId:" + us.DbSessionId, new object[] { });
                    }
                }
            }

        }

        /// <summary>
        /// Valida si la persona que esta logueada tiene permisos sobre una pagina en particular, de acuerdo a sus roles
        /// </summary>
        /// <param name="pagina">La Pagina o permiso que se quiere comprobar</param>
        /// <param name="Silencioso"></param>
        /// <returns>True si el usuario logueado tiene permisos. False en caso contrario</returns>
        public static bool ValidarPermisosWeb(string pagina, bool Silencioso)
        {
            return ValidarPermisosWeb(pagina, ManejoEstado.IdPerfiles, Silencioso);
        }
        public static List<int> RolesSegunPagina(string pagina)
        {
            var itemsSeguridad = FuncionesSeguridad.DevolverElementosDeSeguridad();
            List<DtoPerfilesProcesos> PerfilesProcesos = itemsSeguridad.PerfilesProcesos;
            List<DtoProcesos> Procesos = itemsSeguridad.Procesos;
            var perfiles = ManejoEstado.IdPerfiles;

            var resultado = (from PP in PerfilesProcesos
                             join Pr in Procesos on PP.IdProceso equals Pr.IdProceso
                             where perfiles.Contains(PP.IdPerfil) && pagina.ToLower() == (Pr.Url ?? Pr.Nombre).ToLower()
                             select PP.IdPerfil).ToList<int>();

            return resultado;
        }
        /// <summary>
        /// Devuelve true si existe en la base de datos el usuario logueado de CiDi
        /// </summary>
        /// <param name="usuarioNombre"></param>
        /// <returns></returns>
        public static DtoUsuario LoginInterno(string email, string password)
        {
            // CidiKit.Usuario UsuarioCidi = CidiKit.Funciones.ObtenerUsuario();
            //if (UsuarioCidi == null)
            //{
            //    return false;
            //    //Response.Redirect(ConfigurationManager.AppSettings["CiDiUrl"].ToString() + "?app=" + ConfigurationManager.AppSettings["CiDiIdAplicacion"].ToString() , true);
            //    //throw new ApplicationException("Redirect");  // para que corte la ejecucion del codigo
            //}

            

            var _tk = Guid.NewGuid().ToString().ToUpper();
            var ip = HttpContext.Current.Request.UserHostAddress;
            var parametros = new object[] { email, password, _tk, ip, null, null, null };

            List<DtoId> PerfilesDelUsuario = null;
            // normalmente: No existe el usuario en el sistema."))
            PerfilesDelUsuario = Repositorio.CargarDTOs<DtoId>("pkg_seguridad.pr_usuarios_login", parametros);
            
            HttpContext.Current.Items["_tk"] = _tk;
         
            var usuario = new DtoUsuario();           
            usuario.Id = parametros[4].ToString();
            usuario.PersonaNombre = parametros[5].ToString();
            usuario.Email = email;
            usuario.DbSessionId = _tk;
            if (PerfilesDelUsuario.Count > 0)
                usuario.IdPerfiles = PerfilesDelUsuario.Select(x => int.Parse(x.Id)).ToList<int>();  

            HttpContext.Current.Response.Headers.Add("_tk", _tk);
            return usuario;

        }

        public static bool ValidarPermisosWeb(string pagina, List<int> perfiles, bool Silencioso)
        {
            //if (perfiles == null)
            //{
            //    if (FuncionesSeguridad.LoginInterno("",""))
            //    {
            //        perfiles = ManejoEstado.IdPerfiles;
            //    }
                
            //}

            var itemsSeguridad = FuncionesSeguridad.DevolverElementosDeSeguridad();
            List<DtoPerfilesProcesos> PerfilesProcesos = itemsSeguridad.PerfilesProcesos;
            List<DtoProcesos> Procesos = itemsSeguridad.Procesos;
            var resultado = (from PP in PerfilesProcesos
                             join Pr in Procesos on PP.IdProceso equals Pr.IdProceso
                             where perfiles.Contains(PP.IdPerfil) && pagina.ToLower() == (Pr.Url).ToLower()
                             select 1).Any();
            if (Silencioso)
                return resultado;

            if (!resultado)
                throw new ExcepcionBase("Acceso Denegado!");

            return true;
        }


        internal static bool ValidarPermisos(string controlador, string accion)

        {
            if (controlador.ToLower() == "utiles")
                return true;

            var IdRoles = ManejoEstado.IdPerfiles;
            // primero validar controlador
            if (!ValidarPermisosWeb(controlador, IdRoles, true))
                return false;
            // segundo verificar si hay permisos (procesos) establecidos para esta acción del controlador (ConstroladorAccion)
            var controladorAccion = controlador + "/" + accion;
            var itemsSeguridad = FuncionesSeguridad.DevolverElementosDeSeguridad();
            List<DtoProcesos> Procesos = itemsSeguridad.Procesos;
            var resultado = (from p in Procesos
                             where (p.Url).ToLower() == controladorAccion.ToLower()
                             select 1).Any();

            // Si resultado = true, valida si el perfil tiene permisos para el proceso. Y validarPermisoWeb se encarga de hacerlo.
            if (resultado)
            {
                return ValidarPermisosWeb(controladorAccion, IdRoles, true);
            }

            //no hay permisos (procesos) establecidos para esta acción del controlador (ConstroladorAccion)
            return true; // es de libre acceso, para todos los que tienen permiso al controlador
        }




        public static void EliminarCacheElementosSeguridad()
        {
            HttpContext.Current.Cache.Remove("ElementosSeguridad");
        }



        /// <summary>
        /// Cierra la Sesion.
        /// </summary>
        static public void CerrarSesionApp(string idSesion = null)
        {
            if (string.IsNullOrEmpty(idSesion) && HttpContext.Current != null && HttpContext.Current.Items["_tk"] != null)
                idSesion = HttpContext.Current.Items["_tk"].ToString();

            object[] parametros = { idSesion, FuncionesSeguridad.CacheSlidingTimeout };
            Repositorio.ExecuteNonQuery("pkg_seguridad.pr_usuarios_logout", parametros);
        }


        public static void ActualizarJsVersion()
        {
            jsVersion = DateTime.Now.ToString("MMddHHmm");
        }
        /// <summary>
        /// Recibe una cadena la encripta y la codifica (html) para la web
        /// </summary>
        /// <returns></returns>
        public static string EncriptarWeb(string cadena)
        {
            return HttpUtility.UrlEncode(Encriptador.Encriptar(cadena, "ApLiCaCiOnRePAT"));
        }

        /// <summary>
        /// Recibe una cadena desde la web, la decodifica (html) y la desencripta
        /// </summary>
        /// <returns></returns>
        public static string DesEncriptarWeb(string cadenaCodificadaHtmlYEncriptada)
        {
            return Encriptador.Desencriptar(HttpUtility.UrlDecode(cadenaCodificadaHtmlYEncriptada), "ApLiCaCiOnRePAT");
        }


        public static DtoItemsSeguridad DevolverElementosDeSeguridad()
        {
            var elementosSeguridad = HttpContext.Current.Cache["ElementosSeguridad"] as DtoItemsSeguridad;

            if (elementosSeguridad == null)
            {
                elementosSeguridad = new DtoItemsSeguridad();
                Repositorio.ExecuteReader("pkg_seguridad.pr_items_seguridad_dto_s", null,
                    delegate (IDataReader dr)
                    {
                        elementosSeguridad.MenuesHijos = Repositorio.CargarDTOs<DtoMenuHijo>(dr);
                        dr.NextResult();
                        elementosSeguridad.MenuesPadres = Repositorio.CargarDTOs<DtoMenuPadre>(dr);
                        dr.NextResult();
                        elementosSeguridad.PerfilesProcesos = Repositorio.CargarDTOs<DtoPerfilesProcesos>(dr);
                        dr.NextResult();
                        elementosSeguridad.Procesos = Repositorio.CargarDTOs<DtoProcesos>(dr);
                    });
                HttpContext.Current.Cache.Insert("ElementosSeguridad", elementosSeguridad, null, DateTime.Now.AddMinutes(30), System.Web.Caching.Cache.NoSlidingExpiration);
            }

            return elementosSeguridad;
        }


        #region Menu          

        public static void CrearMenuDinamico2(out List<DtoMenuHijo> menuesHijos, out List<DtoMenuPadre> menuesPadres, DtoUsuario usuario)
        {
           

            var itemsSeguridad = DevolverElementosDeSeguridad();

            //Filtro los menúes hijos en base a los perfiles del usuario
            menuesHijos = (from PP in itemsSeguridad.PerfilesProcesos
                           join Pr in itemsSeguridad.Procesos on PP.IdProceso equals Pr.IdProceso
                           join MH in itemsSeguridad.MenuesHijos on Pr.IdProceso equals MH.IdProceso
                           where usuario.IdPerfiles.Contains(PP.IdPerfil)
                           select MH).Distinct().OrderBy(x => x.OrdenMenu).ThenBy(x => x.Nombre).ToList();

            //Filtro los menúes padres a partir de los hijos
            var idsMenuesPadres = menuesHijos.Select(j => j.IdProcesoPadre).ToList().Distinct();

            //Filtro menues padres de primer nivel (excluyen a menues consultas, que son menues padres de segundo nivel)
            menuesPadres = itemsSeguridad.MenuesPadres.Where(x => idsMenuesPadres.Contains(x.IdProceso)).ToList();

        }
        public static List<DtoMenuHijo> ObtenerMenuesHijos(string nombreMenuPadre)
        {
            var menuesHijos = new List<DtoMenuHijo>();
            DtoMenuHijo menuPadre = null; //El menu padre es de segundo nivel, por lo que es un menu hijo

            var itemsSeguridad = DevolverElementosDeSeguridad();

            menuPadre = itemsSeguridad.MenuesHijos.Where(x => x.Nombre.ToLower() == nombreMenuPadre.ToLower()).SingleOrDefault();

            //Filtro los menúes hijos en base a los perfiles del usuario
            if (menuPadre != null)
                menuesHijos = (from PP in itemsSeguridad.PerfilesProcesos
                               join Pr in itemsSeguridad.Procesos on PP.IdProceso equals Pr.IdProceso
                               join MH in itemsSeguridad.MenuesHijos on Pr.Nombre equals MH.URL
                               where ManejoEstado.IdPerfiles.Contains(PP.IdPerfil) && MH.IdProcesoPadre == menuPadre.IdProceso
                               select MH).ToList().Distinct().OrderBy(x => x.Nombre).OrderBy(x => x.OrdenMenu).ToList();

            return menuesHijos;
        }
        #endregion Menu

    }
}