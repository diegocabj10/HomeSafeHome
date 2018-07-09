using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UTIL
{
    public class ErrorInfo 
    {
        /// <summary>
        /// 
        /// </summary>
        protected string _mensaje;

        /// <summary>
        /// 
        /// </summary>
        protected string _origen;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Mensaje"></param>
        /// <param name="Origen"></param>
        public ErrorInfo(string Mensaje, string Origen)
        {
            _mensaje = Mensaje;
            _origen = Origen;
        }

        /// <summary>
        /// 
        /// </summary>
        public string Mensaje { get { return _mensaje; } }

        /// <summary>
        /// 
        /// </summary>
        public string Origen { get { return _origen; } }
    }

    public class ExcepcionBase : ApplicationException
    {
        /// <summary>
        /// 
        /// </summary>
        protected List<ErrorInfo> _listaErrores;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExcepcionBase"/> class.
        /// </summary>
        /// <param name="mensaje">The mensaje.</param>
        public ExcepcionBase(string mensaje) : this(mensaje, (Exception)null) { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ExcepcionBase"/> class.
        /// </summary>
        /// <param name="mensaje">The mensaje.</param>
        /// <param name="errores">The errores.</param>
        public ExcepcionBase(string mensaje, ErrorInfo[] errores) : this(mensaje, null, errores) { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ExcepcionBase"/> class.
        /// </summary>
        /// <param name="mensaje">The mensaje.</param>
        /// <param name="innerExcepcion">The inner excepcion.</param>
        public ExcepcionBase(string mensaje, Exception innerExcepcion) : this(mensaje, innerExcepcion, null) { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ExcepcionBase"/> class.
        /// </summary>
        /// <param name="mensaje">The mensaje.</param>
        /// <param name="innerExcepcion">The inner excepcion.</param>
        /// <param name="errores">The errores.</param>
        public ExcepcionBase(string mensaje, Exception innerExcepcion, ErrorInfo[] errores)
            : base(mensaje, innerExcepcion)
        {
            _listaErrores = new List<ErrorInfo>();
            if (errores != null && errores.Length > 0) _listaErrores.AddRange(errores);
        }
        public int CantidadExcepciones
        {
            get { return _listaErrores.Count; }
        }

        /// <summary>
        /// Gets the errores.
        /// </summary>
        /// <value>The errores.</value>
        public ErrorInfo[] Errores
        {
            get {
                return _listaErrores.ToArray();
            }
        }

        /// <summary>
        /// Agregars the error.
        /// </summary>
        /// <param name="error">The error.</param>
        public void AgregarError(ErrorInfo error) {
            _listaErrores.Add(error);
        }

        /// <summary>
        /// Agregars the error.
        /// </summary>
        /// <param name="mensaje">The mensaje.</param>
        /// <param name="origen">The origen.</param>
        public void AgregarError(string mensaje, string origen)
        {
            AgregarError(new ErrorInfo(mensaje, origen));
        }

        /// <summary>
        /// Gets a message that describes the current exception.
        /// </summary>
        /// <value></value>
        /// <returns>
        /// The error message that explains the reason for the exception, or an empty string("").
        /// </returns>
        public override string Message
        {
            get
            {
                string errores = String.Empty;
                int cantErrores = 0;
                foreach (ErrorInfo  obj in this.Errores )
                {
                    if (obj != null)
                    {
                        //errores += obj.Mensaje + "\t " + obj.Origen + "\n";                 
                        errores += obj.Mensaje + "\n";
                        cantErrores++;
                    }
                }
                if (errores != string.Empty)
                {
                    if (cantErrores>1)
                        errores = "\n" + errores;
                    else
                        errores = "\n" + errores;
                }

                return base.Message + errores;
            }
        }

        /// <summary>
        /// Gets the message usuario.
        /// </summary>
        /// <value>The message usuario.</value>
        public  string MessageUsuario
        {
            get
            {
                string errores = String.Empty;
                foreach (ErrorInfo obj in this.Errores)
                {
                    errores += obj.Mensaje + "\n";
                }
                if (errores != string.Empty)
                    errores = "\n" + errores;

                return base.Message + errores;
            }
        }
    }
}
