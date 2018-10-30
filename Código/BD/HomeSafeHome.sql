----------------------------------------------
-- Export file for user HOMESAFEHOME        --
-- Created by diego on 27/10/2018, 19:09:15 --
----------------------------------------------

spool HomeSafeHome.log

prompt
prompt Creating table T_AUDITORIAS_PROCESO
prompt ===================================
prompt
create table T_AUDITORIAS_PROCESO
(
  ID_AUDITORIA_PROCESO NUMBER(10) not null,
  N_AUDITORIA_PROCESO  VARCHAR2(100),
  DESCRIPCION          VARCHAR2(200),
  FECHA_BAJA           DATE
)
;
alter table T_AUDITORIAS_PROCESO
  add constraint PK_AUDITORIAS_PROCESO primary key (ID_AUDITORIA_PROCESO);

prompt
prompt Creating table T_USUARIOS
prompt =========================
prompt
create table T_USUARIOS
(
  ID_USUARIO   NUMBER(10) not null,
  LOGIN        VARCHAR2(30),
  FECHA_INICIO DATE,
  EMAIL        VARCHAR2(40),
  ULTIMO_LOGIN DATE,
  FECHA_BAJA   DATE,
  PASSWORD     VARCHAR2(40),
  NOMBRE       VARCHAR2(100),
  APELLIDO     VARCHAR2(100)
)
;
alter table T_USUARIOS
  add constraint PK_USUARIOS primary key (ID_USUARIO);
alter table T_USUARIOS
  add constraint UK_USU_EMAIL unique (EMAIL);

prompt
prompt Creating table T_SESIONES
prompt =========================
prompt
create table T_SESIONES
(
  ID_SESION    VARCHAR2(40) not null,
  IP           VARCHAR2(15),
  FECHA_INICIO DATE,
  FECHA_FIN    DATE,
  ID_USUARIO   NUMBER(10)
)
;
alter table T_SESIONES
  add constraint PK_SESIONES primary key (ID_SESION);
alter table T_SESIONES
  add constraint FK_SES_USU foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_AUDITORIAS
prompt ===========================
prompt
create table T_AUDITORIAS
(
  ID_AUDITORIA         NUMBER(10) not null,
  ID_SESION            VARCHAR2(40),
  FECHA_AUDITORIA      DATE,
  OBSERVACIONES        VARCHAR2(4000),
  ID_CLAVE             VARCHAR2(40),
  ID_AUDITORIA_PROCESO NUMBER(10)
)
;
alter table T_AUDITORIAS
  add constraint PK_AUDITORIAS primary key (ID_AUDITORIA);
alter table T_AUDITORIAS
  add constraint FK_AUD_PROC foreign key (ID_AUDITORIA_PROCESO)
  references T_AUDITORIAS_PROCESO (ID_AUDITORIA_PROCESO);
alter table T_AUDITORIAS
  add constraint FK_AUD_SES foreign key (ID_SESION)
  references T_SESIONES (ID_SESION);

prompt
prompt Creating table T_AVISOS
prompt =======================
prompt
create table T_AVISOS
(
  ID_AVISO    NUMBER(10) not null,
  FECHA_AVISO DATE,
  TITULO      VARCHAR2(100),
  MENSAJE     VARCHAR2(400),
  ID_USUARIO  NUMBER(10),
  FECHA_BAJA  DATE
)
;
alter table T_AVISOS
  add constraint PK_AVISO primary key (ID_AVISO);
alter table T_AVISOS
  add constraint FK_AVISO_USUARIO foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_SENIALES
prompt =========================
prompt
create table T_SENIALES
(
  ID_SENIAL  NUMBER(10) not null,
  N_SENIAL   VARCHAR2(200),
  FECHA_BAJA DATE
)
;
alter table T_SENIALES
  add constraint PK_SENIAL primary key (ID_SENIAL);

prompt
prompt Creating table T_CONFIGURACIONES_NOTIFICACION
prompt =============================================
prompt
create table T_CONFIGURACIONES_NOTIFICACION
(
  ID_CONFIGURACION_NOTIFICACION NUMBER(10) not null,
  ID_SENIAL                     NUMBER(10),
  VALOR_DESDE                   NUMBER(5),
  VALOR_HASTA                   NUMBER(5),
  TITULO                        VARCHAR2(100),
  MENSAJE                       VARCHAR2(400)
)
;
alter table T_CONFIGURACIONES_NOTIFICACION
  add constraint PK_CONFIGURACION_NOTIFICACION primary key (ID_CONFIGURACION_NOTIFICACION);
alter table T_CONFIGURACIONES_NOTIFICACION
  add constraint FK_SENIAL foreign key (ID_SENIAL)
  references T_SENIALES (ID_SENIAL);

prompt
prompt Creating table T_CONTACTOS
prompt ==========================
prompt
create table T_CONTACTOS
(
  ID_CONTACTO         NUMBER(10) not null,
  FECHA_INICIO        DATE,
  ID_USUARIO_DUENIO   NUMBER(10),
  ID_USUARIO_CONTACTO NUMBER(10),
  FECHA_BAJA          DATE
)
;
alter table T_CONTACTOS
  add constraint PK_CONTACTOS primary key (ID_CONTACTO);
alter table T_CONTACTOS
  add constraint FK_CONTACTO_USUARIO foreign key (ID_USUARIO_CONTACTO)
  references T_USUARIOS (ID_USUARIO);
alter table T_CONTACTOS
  add constraint FK_DUENIO_USUARIO foreign key (ID_USUARIO_DUENIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_DISPOSITIVOS
prompt =============================
prompt
create table T_DISPOSITIVOS
(
  ID_DISPOSITIVO NUMBER(10) not null,
  N_DISPOSITIVO  VARCHAR2(200),
  FECHA_BAJA     DATE
)
;
alter table T_DISPOSITIVOS
  add constraint PK_DISPOSITIVO primary key (ID_DISPOSITIVO);
alter table T_DISPOSITIVOS
  add constraint UK_DISPOSITIVO unique (N_DISPOSITIVO);

prompt
prompt Creating table T_EVENTOS
prompt ========================
prompt
create table T_EVENTOS
(
  ID_EVENTO      NUMBER(10) not null,
  FECHA_EVENTO   DATE,
  ID_SENIAL      NUMBER(10) not null,
  ID_DISPOSITIVO NUMBER(10) not null,
  VALOR          NUMBER(10),
  FECHA_BAJA     DATE
)
;
alter table T_EVENTOS
  add constraint PK_EVENTOS primary key (ID_EVENTO);
alter table T_EVENTOS
  add constraint FK_EVENTOS_DISPOSITIVOS foreign key (ID_DISPOSITIVO)
  references T_DISPOSITIVOS (ID_DISPOSITIVO);
alter table T_EVENTOS
  add constraint FK_EVENTOS_SENIAL foreign key (ID_SENIAL)
  references T_SENIALES (ID_SENIAL);

prompt
prompt Creating table T_NOTIFICACIONES
prompt ===============================
prompt
create table T_NOTIFICACIONES
(
  ID_NOTIFICACION    NUMBER(10) not null,
  FECHA_NOTIFICACION DATE,
  ID_EVENTO          NUMBER(10),
  FECHA_LECTURA      DATE,
  FECHA_BAJA         DATE,
  ID_USUARIO         NUMBER(10),
  TITULO             VARCHAR2(100),
  MENSAJE            VARCHAR2(400)
)
;
alter table T_NOTIFICACIONES
  add constraint PK_NOTIFICACION primary key (ID_NOTIFICACION);
alter table T_NOTIFICACIONES
  add constraint FK_NOT_EVENTOS foreign key (ID_EVENTO)
  references T_EVENTOS (ID_EVENTO);
alter table T_NOTIFICACIONES
  add constraint FK_NOT_USU foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_PERFILES
prompt =========================
prompt
create table T_PERFILES
(
  ID_PERFIL  NUMBER(10) not null,
  N_PERFIL   VARCHAR2(200),
  FECHA_BAJA DATE
)
;
alter table T_PERFILES
  add constraint PK_PERFIL primary key (ID_PERFIL);
alter table T_PERFILES
  add constraint UK_PERFIL unique (N_PERFIL);

prompt
prompt Creating table T_PROCESOS
prompt =========================
prompt
create table T_PROCESOS
(
  ID_PROCESO       NUMBER(10) not null,
  TIPO             VARCHAR2(2),
  N_PROCESO        VARCHAR2(200),
  FECHA_BAJA       DATE,
  NOMBRE           VARCHAR2(200),
  ORDEN_MENU       NUMBER(3),
  URL              VARCHAR2(100),
  ID_PROCESO_PADRE NUMBER(10)
)
;
alter table T_PROCESOS
  add constraint PK_PROCESOS primary key (ID_PROCESO);

prompt
prompt Creating table T_PERFILES_PROCESO
prompt =================================
prompt
create table T_PERFILES_PROCESO
(
  ID_PERFIL_PROCESO NUMBER(10) not null,
  ID_PROCESO        NUMBER(10),
  ID_PERFIL         NUMBER(10)
)
;
alter table T_PERFILES_PROCESO
  add constraint PK_PERFILES_PROCESO primary key (ID_PERFIL_PROCESO);
alter table T_PERFILES_PROCESO
  add constraint FK_PERFIL_PROCESO foreign key (ID_PROCESO)
  references T_PROCESOS (ID_PROCESO);
alter table T_PERFILES_PROCESO
  add constraint FK_PROCESO_PERFIL foreign key (ID_PERFIL)
  references T_PERFILES (ID_PERFIL);

prompt
prompt Creating table T_RECLAMOS
prompt =========================
prompt
create table T_RECLAMOS
(
  ID_RECLAMO    NUMBER(10) not null,
  FECHA_RECLAMO DATE,
  TITULO        VARCHAR2(100),
  MENSAJE       VARCHAR2(400),
  RESPUESTA     VARCHAR2(400),
  ID_USUARIO    NUMBER(10),
  FECHA_BAJA    DATE
)
;
alter table T_RECLAMOS
  add constraint PK_RECLAMO primary key (ID_RECLAMO);
alter table T_RECLAMOS
  add constraint FK_RECLAMO_USUARIO foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_USUARIOS_DISPOSITIVO
prompt =====================================
prompt
create table T_USUARIOS_DISPOSITIVO
(
  ID_USUARIO_DISPOSITIVO NUMBER(10) not null,
  FECHA_INICIO           DATE,
  ID_USUARIO             NUMBER(10),
  ID_DISPOSITIVO         NUMBER(10),
  FECHA_BAJA             DATE,
  FECHA_AFUERA_CASA      DATE
)
;
alter table T_USUARIOS_DISPOSITIVO
  add constraint PK_USU_DISP primary key (ID_USUARIO_DISPOSITIVO);
alter table T_USUARIOS_DISPOSITIVO
  add constraint FK_DISP_USU foreign key (ID_DISPOSITIVO)
  references T_DISPOSITIVOS (ID_DISPOSITIVO);
alter table T_USUARIOS_DISPOSITIVO
  add constraint FK_USU_DISP foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_USUARIOS_PERFIL
prompt ================================
prompt
create table T_USUARIOS_PERFIL
(
  ID_USUARIO_PERFIL NUMBER(10) not null,
  ID_USUARIO        NUMBER(10),
  ID_PERFIL         NUMBER(10)
)
;
alter table T_USUARIOS_PERFIL
  add constraint PK_USUARIO_PERFIL primary key (ID_USUARIO_PERFIL);
alter table T_USUARIOS_PERFIL
  add constraint FK_PERFIL_USUARIO foreign key (ID_USUARIO)
  references T_USUARIOS (ID_USUARIO);
alter table T_USUARIOS_PERFIL
  add constraint FK_USUARIO_PERFIL foreign key (ID_PERFIL)
  references T_PERFILES (ID_PERFIL);

prompt
prompt Creating sequence SEQ_AUDITORIA
prompt ===============================
prompt
create sequence SEQ_AUDITORIA
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_AUDITORIA_PROCESO
prompt =======================================
prompt
create sequence SEQ_AUDITORIA_PROCESO
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_AVISO
prompt ===========================
prompt
create sequence SEQ_AVISO
minvalue 1
maxvalue 9999999999
start with 141
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_CONTACTO
prompt ==============================
prompt
create sequence SEQ_CONTACTO
minvalue 1
maxvalue 9999999999
start with 21
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_DISPOSITIVO
prompt =================================
prompt
create sequence SEQ_DISPOSITIVO
minvalue 1
maxvalue 9999999999
start with 21
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_EVENTO
prompt ============================
prompt
create sequence SEQ_EVENTO
minvalue 1
maxvalue 9999999999
start with 321
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_NOTIFICACION
prompt ==================================
prompt
create sequence SEQ_NOTIFICACION
minvalue 1
maxvalue 9999999999
start with 41
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_PERFIL
prompt ============================
prompt
create sequence SEQ_PERFIL
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_PERFIL_PROCESO
prompt ====================================
prompt
create sequence SEQ_PERFIL_PROCESO
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_PROCESO
prompt =============================
prompt
create sequence SEQ_PROCESO
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_RECLAMO
prompt =============================
prompt
create sequence SEQ_RECLAMO
minvalue 1
maxvalue 9999999999
start with 141
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_SENIAL
prompt ============================
prompt
create sequence SEQ_SENIAL
minvalue 1
maxvalue 9999999999
start with 21
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_SESION
prompt ============================
prompt
create sequence SEQ_SESION
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_USUARIO
prompt =============================
prompt
create sequence SEQ_USUARIO
minvalue 1
maxvalue 9999999999
start with 121
increment by 1
cache 20;

prompt
prompt Creating sequence SEQ_USUARIO_PERFIL
prompt ====================================
prompt
create sequence SEQ_USUARIO_PERFIL
minvalue 1
maxvalue 9999999999
start with 81
increment by 1
cache 20;

prompt
prompt Creating type TABLE_NUMBER
prompt ==========================
prompt
CREATE OR REPLACE TYPE table_number is table of number
/

prompt
prompt Creating package PKG_ARRAY
prompt ==========================
prompt
CREATE OR REPLACE PACKAGE pkg_array AS

  TYPE stringtabletype IS TABLE OF VARCHAR2(50) INDEX BY BINARY_INTEGER;

  TYPE inttabletype IS TABLE OF NUMBER(10) INDEX BY BINARY_INTEGER;

  FUNCTION fn_get_table_number(asociativearray IN pkg_array.inttabletype)
    RETURN table_number;

END;
/

prompt
prompt Creating package PKG_AUDITORIA
prompt ==============================
prompt
CREATE OR REPLACE PACKAGE PKG_AUDITORIA AS
  -- Author  : DIEGO
  -- Created : 3/7/2018 20:33:36
  -- Purpose : Auditorias
  FUNCTION check_val(l_new       IN VARCHAR2
                    ,l_old       IN VARCHAR2
                    ,column_name IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION check_val(l_new IN DATE, l_old IN DATE, column_name IN VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION check_val(l_new       IN NUMBER
                    ,l_old       IN NUMBER
                    ,column_name IN VARCHAR2) RETURN VARCHAR2;
END;
/

prompt
prompt Creating package PKG_AVISOS
prompt ===========================
prompt
CREATE OR REPLACE PACKAGE pkg_avisos IS

  -- Author  : DIEGO
  -- Created : 6/10/2018 19:27:23
  -- Purpose : Gestion de los avisos
  PROCEDURE pr_getbyid(p_id     IN t_avisos.id_aviso%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_id_usuario            IN t_avisos.id_usuario%TYPE
                     ,p_titulo                IN t_avisos.titulo%TYPE
                     ,p_mensaje               IN t_avisos.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id          IN OUT t_avisos.id_aviso%TYPE
                      ,p_titulo      IN t_avisos.titulo%TYPE
                      ,p_mensaje     IN t_avisos.mensaje%TYPE
                      ,p_fecha_aviso IN t_avisos.fecha_aviso%TYPE
                      ,p_id_usuario  IN t_avisos.id_usuario%TYPE);

  PROCEDURE pr_delete(p_id           IN t_avisos.id_aviso%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_avisos;
/

prompt
prompt Creating package PKG_CONTACTOS
prompt ==============================
prompt
CREATE OR REPLACE PACKAGE pkg_contactos IS

  -- Author  : DIEGO
  -- Created : 27/10/2018 14:17:47
  -- Purpose : Gestion de los contactos
  PROCEDURE pr_getbyid(p_id     IN t_contactos.id_contacto%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_idDuenio              IN t_contactos.id_usuario_duenio%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id          IN OUT t_contactos.id_contacto%TYPE
                      ,p_IdDuenio      IN t_contactos.id_usuario_duenio%TYPE
                      ,p_IdContacto     IN t_contactos.id_usuario_contacto%TYPE
                      ,p_FechaInicio IN t_contactos.fecha_inicio%TYPE);

  PROCEDURE pr_delete(p_id           IN t_contactos.id_contacto%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_contactos;
/

prompt
prompt Creating package PKG_DISPOSITIVOS
prompt =================================
prompt
CREATE OR REPLACE PACKAGE pkg_dispositivos IS

  -- Author  : MARCOS
  -- Created : 04/08/2018 20:22:01
  -- Purpose : Gestionar dispositivos
  PROCEDURE pr_getbyid(p_id     IN t_dispositivos.id_dispositivo%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_nombre                IN t_dispositivos.n_dispositivo%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_getbyusuario(p_id_usuario            IN t_usuarios_dispositivo.id_usuario%TYPE
                           ,p_activo                IN OUT VARCHAR2
                           ,p_numeropaginalistado   IN NUMBER
                           ,p_totalregistroslistado OUT NUMBER
                           ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id            IN OUT t_dispositivos.id_dispositivo%TYPE
                      ,p_idusuario     IN t_usuarios_dispositivo.id_usuario%TYPE
                      ,p_iddispositivo IN t_usuarios_dispositivo.id_dispositivo%TYPE
                      ,p_fechainicio   IN t_contactos.fecha_inicio%TYPE);

  PROCEDURE pr_delete(p_id           IN t_dispositivos.id_dispositivo%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_dispositivos;
/

prompt
prompt Creating package PKG_EVENTOS
prompt ============================
prompt
CREATE OR REPLACE PACKAGE pkg_eventos IS

  -- Author  : DIEGO y MARCOS
  -- Created : 20/07/2018 21:18:55
  -- Purpose : Gestionar usuarios
  PROCEDURE pr_getcombos(p_seniales     OUT SYS_REFCURSOR
                        ,p_dispositivos OUT SYS_REFCURSOR);

  PROCEDURE pr_getbyid(p_id     IN t_eventos.id_evento%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_id_dispositivo        IN t_eventos.id_dispositivo%TYPE
                     ,p_id_senial             IN t_eventos.id_senial%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id             IN OUT t_eventos.id_evento%TYPE
                      ,p_valor          IN t_eventos.valor%TYPE
                      ,p_fecha_evento   IN t_eventos.fecha_evento%TYPE
                      ,p_id_dispositivo IN t_eventos.id_dispositivo%TYPE
                      ,p_id_senial      IN t_eventos.id_senial%TYPE);

  PROCEDURE pr_delete(p_id           IN t_eventos.id_evento%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_eventos;
/

prompt
prompt Creating package PKG_NOTIFICACIONES
prompt ===================================
prompt
CREATE OR REPLACE PACKAGE pkg_notificaciones IS

  -- Author  : DIEGO
  -- Created : 24/08/2018 16:07:51
  -- Purpose : Gestionar Notificaciones
  PROCEDURE pr_getbyid(p_id     IN t_notificaciones.id_notificacion%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_id_usuario            IN t_notificaciones.id_usuario%TYPE
                     ,p_titulo                IN t_notificaciones.titulo%TYPE
                     ,p_mensaje               IN t_notificaciones.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

END pkg_notificaciones;
/

prompt
prompt Creating package PKG_PERFILES
prompt =============================
prompt
CREATE OR REPLACE PACKAGE pkg_perfiles IS

  -- Author  : DIEGO
  -- Created : 3/7/2018 20:33:36
  -- Purpose : Gestionar Perfiles
  PROCEDURE pr_getcombos(p_procesos OUT SYS_REFCURSOR);

  PROCEDURE pr_getbyid(p_id          IN t_perfiles.id_perfil%TYPE
                      ,p_id_procesos OUT pkg_array.inttabletype
                      ,p_cursor      OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_nombre                IN t_perfiles.n_perfil%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id          IN OUT t_perfiles.id_perfil%TYPE
                      ,p_nombre      IN t_perfiles.n_perfil%TYPE
                      ,p_id_procesos IN pkg_array.inttabletype);

  PROCEDURE pr_delete(p_id           IN t_perfiles.id_perfil%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_perfiles;
/

prompt
prompt Creating package PKG_RECLAMOS
prompt =============================
prompt
CREATE OR REPLACE PACKAGE pkg_reclamos IS

  -- Author  : DIEGO
  -- Created : 6/10/2018 19:26:56
  -- Purpose : Gestion de reclamos
  PROCEDURE pr_getbyid(p_id     IN t_reclamos.id_reclamo%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_id_usuario            IN t_reclamos.id_usuario%TYPE
                     ,p_titulo                IN t_reclamos.titulo%TYPE
                     ,p_mensaje               IN t_reclamos.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id            IN OUT t_reclamos.id_reclamo%TYPE
                      ,p_titulo        IN t_reclamos.titulo%TYPE
                      ,p_mensaje       IN t_reclamos.mensaje%TYPE
                      ,p_respuesta     IN t_reclamos.respuesta%TYPE
                      ,p_fecha_reclamo IN t_reclamos.fecha_reclamo%TYPE
                      ,p_id_usuario    IN t_reclamos.id_usuario%TYPE);

  PROCEDURE pr_delete(p_id           IN t_reclamos.id_reclamo%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_reclamos;
/

prompt
prompt Creating package PKG_REPORTES
prompt =============================
prompt
CREATE OR REPLACE PACKAGE pkg_reportes IS

  PROCEDURE pr_get_cuenta_eventos(p_id_dispositivo NUMBER,
                                  p_conteos  OUT SYS_REFCURSOR,
                                  p_msj_error OUT VARCHAR2);
  
  PROCEDURE pr_get_ultimos_eventos(p_id_dispositivo NUMBER,
                                  p_conteos  OUT SYS_REFCURSOR,
                                  p_msj_error OUT VARCHAR2);

END pkg_reportes;
/

prompt
prompt Creating package PKG_SEGURIDAD
prompt ==============================
prompt
CREATE OR REPLACE PACKAGE pkg_seguridad IS

  -- Author  : DIEGO
  -- Created : 3/7/2018 20:33:36
  -- Purpose : Gestionar Modulo seguridad
  --Valor de la session o token que utiliza el usuario conectado en ese momento
  id_session VARCHAR2(40);

  --Funcion que devuelve el valor de la session
  FUNCTION fn_id_session RETURN VARCHAR2;

  --Devuelve cursores necesarios para crear el menu dinamicamente
  PROCEDURE pr_items_seguridad_dto_s(p_cursor1 OUT SYS_REFCURSOR
                                    ,p_cursor2 OUT SYS_REFCURSOR
                                    ,p_cursor3 OUT SYS_REFCURSOR
                                    ,p_cursor4 OUT SYS_REFCURSOR);

  --Registra en la tabla t_sesiones el login del usuario
  PROCEDURE pr_usuarios_login(p_email          IN t_usuarios.email%TYPE
                             ,p_password       IN t_usuarios.password%TYPE
                             ,p_id_sesion      IN t_sesiones.id_sesion%TYPE
                             ,p_ip             IN t_sesiones.ip%TYPE
                             ,p_id_usuario     OUT t_usuarios.id_usuario%TYPE
                             ,p_nombrecompleto OUT VARCHAR2
                             ,p_cursor         OUT SYS_REFCURSOR);

  --Registra en la tabla t_sesiones el logout del usuario
  PROCEDURE pr_usuarios_logout(p_id_sesion       IN t_sesiones.id_sesion%TYPE
                              ,p_timeout_minutos IN NUMBER);

  PROCEDURE pr_error_msg(p_msg VARCHAR2);

END pkg_seguridad;
/

prompt
prompt Creating package PKG_SENIALES
prompt =============================
prompt
CREATE OR REPLACE PACKAGE pkg_seniales IS

  -- Author  : MARCOS
  -- Created : 04/08/2018 19:42:47
  -- Purpose : Gestionar señales
  PROCEDURE pr_getbyid(p_id     IN t_seniales.id_senial%TYPE
                      ,p_cursor OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_activo                IN OUT VARCHAR2
                     ,p_nombre                IN VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id     IN OUT t_seniales.id_senial%TYPE
                      ,p_nombre IN t_seniales.n_senial%TYPE);

  PROCEDURE pr_delete(p_id           IN t_seniales.id_senial%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_seniales;
/

prompt
prompt Creating package PKG_USUARIOS
prompt =============================
prompt
CREATE OR REPLACE PACKAGE pkg_usuarios IS

  -- Author  : DIEGO
  -- Created : 3/7/2018 21:18:55
  -- Purpose : Gestionar usuarios
  PROCEDURE pr_getcombos(p_perfiles OUT SYS_REFCURSOR);

  PROCEDURE pr_getbyid(p_id          IN t_usuarios.id_usuario%TYPE
                      ,p_id_perfiles OUT pkg_array.inttabletype
                      ,p_cursor      OUT SYS_REFCURSOR);

  PROCEDURE pr_getall(p_email                 IN t_usuarios.email%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR);

  PROCEDURE pr_postput(p_id          IN OUT t_usuarios.id_usuario%TYPE
                      ,p_email       IN t_usuarios.email%TYPE
                      ,p_password    IN t_usuarios.password%TYPE
                      ,p_nombre    IN t_usuarios.nombre%TYPE
                      ,p_apellido IN t_usuarios.apellido%TYPE
                      );

  PROCEDURE pr_delete(p_id           IN t_perfiles.id_perfil%TYPE
                     ,p_activo_nuevo IN VARCHAR2);

END pkg_usuarios;
/

prompt
prompt Creating package body PKG_ARRAY
prompt ===============================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_array IS

  FUNCTION fn_get_table_number(asociativearray IN pkg_array.inttabletype)
    RETURN table_number IS
    databasearray table_number := table_number();
  BEGIN
    databasearray.extend(asociativearray.count);
    FOR i IN 1 .. asociativearray.count
    LOOP
      databasearray(i) := asociativearray(i);
    END LOOP;
    RETURN databasearray;
  END;

END pkg_array;
/

prompt
prompt Creating package body PKG_AUDITORIA
prompt ===================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_auditoria AS

  FUNCTION check_val(l_new       IN VARCHAR2
                    ,l_old       IN VARCHAR2
                    ,column_name IN VARCHAR2) RETURN VARCHAR2 IS
  BEGIN
    IF (l_new <> l_old OR (l_new IS NULL AND l_old IS NOT NULL) OR
       (l_new IS NOT NULL AND l_old IS NULL))
    THEN
      RETURN column_name || ': ' || l_old || ' -> ' || l_new || ' ';
    ELSE
      RETURN NULL;
    END IF;
  END;

  FUNCTION check_val(l_new IN DATE, l_old IN DATE, column_name IN VARCHAR2)
    RETURN VARCHAR2 IS
  BEGIN
    IF (l_new <> l_old OR (l_new IS NULL AND l_old IS NOT NULL) OR
       (l_new IS NOT NULL AND l_old IS NULL))
    THEN
      RETURN column_name || ': ' || to_char(l_old, 'dd/mm/yyyy HH24:mi:ss') || ' -> ' || to_char(l_new, 'dd/mm/yyyy HH24:mi:ss') || ' ';
    ELSE
      RETURN NULL;
    END IF;
  END;

  FUNCTION check_val(l_new       IN NUMBER
                    ,l_old       IN NUMBER
                    ,column_name IN VARCHAR2) RETURN VARCHAR2 IS
  BEGIN
    IF (l_new <> l_old OR (l_new IS NULL AND l_old IS NOT NULL) OR
       (l_new IS NOT NULL AND l_old IS NULL))
    THEN
      RETURN column_name || ': ' || l_old || ' -> ' || l_new || ' ';
    ELSE
      RETURN NULL;
    END IF;
  END;
END;
/

prompt
prompt Creating package body PKG_AVISOS
prompt ================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_avisos IS

  PROCEDURE pr_getbyid(p_id     IN t_avisos.id_aviso%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT a.id_aviso id
            ,a.titulo titulo
            ,a.mensaje mensaje
            ,a.fecha_aviso fechaaviso
            ,a.fecha_baja fechabaja
            ,CASE
               WHEN a.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_avisos a
       WHERE a.id_aviso = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_id_usuario            IN t_avisos.id_usuario%TYPE
                     ,p_titulo                IN t_avisos.titulo%TYPE
                     ,p_mensaje               IN t_avisos.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_id_usuario, :p2 p_titulo, :p3 p_mensaje, :p4 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_avisos t';
    IF p_id_usuario IS NOT NULL
    THEN
      v_where := v_where || ' AND t.id_usuario = ' || p_id_usuario;
    END IF;
    IF p_titulo IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND t.titulo LIKE ''%'' || p_titulo || ''%'' ';
    END IF;
    IF p_mensaje IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND t.mensaje LIKE ''%'' || up_mensaje || ''%'' ';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;
    v_sql_datos := v_with || 'SELECT c.id_aviso id
            ,c.titulo titulo
            ,c.mensaje mensaje
            ,c.fecha_aviso fechaaviso
            ,c.fecha_baja fechabaja
          ,CASE
           WHEN c.fecha_baja IS NULL THEN
            ''SI''
           ELSE
            ''NO''
         END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.* FROM t_avisos t' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.fecha_aviso';
    OPEN p_cursor FOR v_sql_datos
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id          IN OUT t_avisos.id_aviso%TYPE
                      ,p_titulo      IN t_avisos.titulo%TYPE
                      ,p_mensaje     IN t_avisos.mensaje%TYPE
                      ,p_fecha_aviso IN t_avisos.fecha_aviso%TYPE
                      ,p_id_usuario  IN t_avisos.id_usuario%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_aviso.nextval;
      INSERT INTO t_avisos
        (id_aviso, titulo, mensaje, fecha_aviso, id_usuario)
      VALUES
        (p_id, p_titulo, p_mensaje, p_fecha_aviso, p_id_usuario);
      INSERT INTO t_avisos
        (id_aviso, titulo, mensaje, fecha_aviso, id_usuario)
        SELECT seq_aviso.nextval
              ,p_titulo
              ,p_mensaje
              ,p_fecha_aviso
              ,c.id_usuario_contacto
          FROM t_usuarios_dispositivo d
          LEFT JOIN t_contactos c
            ON c.id_usuario_duenio = d.id_usuario
         WHERE d.id_usuario = p_id_usuario;
    ELSE
      -- modificacion
      UPDATE t_avisos a
         SET a.titulo      = p_titulo
            ,a.mensaje     = p_mensaje
            ,a.fecha_aviso = p_fecha_aviso
            ,a.id_usuario  = p_id_usuario
       WHERE a.id_aviso = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_avisos.id_aviso%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_avisos a
       SET a.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE a.id_aviso = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_avisos;
/

prompt
prompt Creating package body PKG_CONTACTOS
prompt ===================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_contactos IS

  PROCEDURE pr_getbyid(p_id     IN t_contactos.id_contacto%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT c.id_contacto id
            ,u.email email
            ,u.apellido || ', ' || u.nombre AS personanombre
            ,c.fecha_inicio fechainicio
            ,c.fecha_baja fechabaja
            ,CASE
               WHEN c.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_contactos c
        LEFT JOIN t_usuarios u
          ON c.id_usuario_contacto = u.id_usuario
       WHERE c.id_contacto = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_idDuenio              IN t_contactos.id_usuario_duenio%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_idDuenio, :p2 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_contactos t';
    IF p_idDuenio IS NOT NULL
    THEN
      v_where := v_where || ' AND t.id_usuario_duenio = ' || p_idDuenio;
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_idDuenio, p_activo;
    v_sql_datos := v_with || ' SELECT c.id_contacto id
            ,c.email email
            ,c.apellido || '', '' || c.nombre AS personanombre
            ,c.fecha_inicio fechainicio
            ,c.fecha_baja fechabaja
            ,CASE
               WHEN c.fecha_baja IS NULL THEN
                ''SI''
               ELSE
                ''NO''
             END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.*,u.apellido,u.nombre,u.email FROM t_contactos t LEFT JOIN t_usuarios u
          ON t.id_usuario_contacto = u.id_usuario' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.fecha_inicio';
   
    OPEN p_cursor FOR v_sql_datos
      USING p_idDuenio, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id          IN OUT t_contactos.id_contacto%TYPE
                      ,p_IdDuenio      IN t_contactos.id_usuario_duenio%TYPE
                      ,p_IdContacto     IN t_contactos.id_usuario_contacto%TYPE
                      ,p_FechaInicio IN t_contactos.fecha_inicio%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_contacto.nextval;
      INSERT INTO t_contactos
       (id_contacto,id_usuario_duenio,id_usuario_contacto,fecha_inicio)
      VALUES
        (p_id, p_IdDuenio, p_IdContacto, p_FechaInicio);
      
    ELSE
      -- modificacion
      UPDATE t_contactos c
         SET c.id_usuario_duenio      = p_IdDuenio
            ,c.id_usuario_contacto     = p_IdContacto
            ,c.fecha_inicio = p_FechaInicio
       WHERE c.id_contacto = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_contactos.id_contacto%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_contactos c
       SET c.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE c.id_contacto = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_contactos;
/

prompt
prompt Creating package body PKG_DISPOSITIVOS
prompt ======================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_dispositivos IS

  PROCEDURE pr_getbyid(p_id     IN t_dispositivos.id_dispositivo%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT d.id_dispositivo id
            ,d.n_dispositivo nombre
            ,CASE
               WHEN d.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_dispositivos d
       WHERE d.id_dispositivo = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_nombre                IN t_dispositivos.n_dispositivo%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_nombre, :p2 p_activo  FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_dispositivos t';
    IF p_nombre IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND lower(t.n_dispositivo) = lower(p_nombre) ';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_nombre, p_activo;
    v_sql_datos := v_with ||
                   'SELECT c.id_dispositivo Id,
            c.n_dispositivo nombre,
            c.fecha_baja fechaBaja,
            CASE
               WHEN c.fecha_baja IS NULL THEN
                '' SI ''
               ELSE
                '' NO ''
             END activo
             FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.* FROM t_dispositivos t' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rownum >= ' || v_registro_desde ||
                   ' ORDER BY c.id_dispositivo';
    OPEN p_cursor FOR v_sql_datos
      USING p_nombre, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getbyusuario(p_id_usuario            IN t_usuarios_dispositivo.id_usuario%TYPE
                           ,p_activo                IN OUT VARCHAR2
                           ,p_numeropaginalistado   IN NUMBER
                           ,p_totalregistroslistado OUT NUMBER
                           ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_id_usuario, :p2 p_activo  FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with ||
                   'SELECT COUNT(*) FROM t_usuarios_dispositivo t left join t_dispositivos d on t.id_dispositivo = d.id_dispositivo';
    IF p_id_usuario IS NOT NULL
    THEN
      v_where := v_where || ' AND t.id_usuario = ' || p_id_usuario;
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_id_usuario, p_activo;
    v_sql_datos := v_with ||
                   'SELECT c.id_dispositivo Id,
            c.n_dispositivo nombre,
            c.fecha_baja fechaBaja,
            CASE
               WHEN c.fecha_baja IS NULL THEN
                '' SI ''
               ELSE
                '' NO ''
             END activo
             FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.*, d.n_dispositivo FROM t_usuarios_dispositivo t left join t_dispositivos d on t.id_dispositivo = d.id_dispositivo' ||
                   v_where || ' )a ' || 'WHERE rownum <= ' ||
                   v_registro_hasta || ') c WHERE rownum >= ' ||
                   v_registro_desde || ' ORDER BY c.id_dispositivo';
    OPEN p_cursor FOR v_sql_datos
      USING p_id_usuario, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyusuario;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id            IN OUT t_dispositivos.id_dispositivo%TYPE
                      ,p_idusuario     IN t_usuarios_dispositivo.id_usuario%TYPE
                      ,p_iddispositivo IN t_usuarios_dispositivo.id_dispositivo%TYPE
                      ,p_fechainicio   IN t_contactos.fecha_inicio%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_dispositivo.nextval;
      INSERT INTO t_usuarios_dispositivo
        (id_usuario_dispositivo, id_usuario, id_dispositivo, fecha_inicio)
      VALUES
        (p_id, p_idusuario, p_iddispositivo, p_fechainicio);
    ELSE
      -- modificacion
      UPDATE t_usuarios_dispositivo ud
         SET ud.id_usuario     = p_idusuario
            ,ud.id_dispositivo = p_iddispositivo
       WHERE ud.id_dispositivo = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_dispositivos.id_dispositivo%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_dispositivos d
       SET d.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE d.id_dispositivo = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_dispositivos;
/

prompt
prompt Creating package body PKG_EVENTOS
prompt =================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_eventos IS

  PROCEDURE pr_getcombos(p_seniales     OUT SYS_REFCURSOR
                        ,p_dispositivos OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_seniales FOR
      SELECT s.id_senial id, s.n_senial nombre
        FROM t_seniales s
       WHERE s.fecha_baja IS NULL;
    OPEN p_dispositivos FOR
      SELECT d.id_dispositivo id, d.n_dispositivo nombre
        FROM t_dispositivos d
       WHERE d.fecha_baja IS NULL;
  END pr_getcombos;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getbyid(p_id     IN t_eventos.id_evento%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT e.id_evento id
            ,e.id_senial idsenial
            ,e.id_dispositivo iddispositivo
            ,e.fecha_evento fechaevento
            ,e.fecha_baja fechabaja
            ,s.n_senial nombresenial
            ,d.n_dispositivo nombredispositivo
            ,CASE
               WHEN e.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_eventos e
        JOIN t_seniales s
          ON e.id_senial = s.id_senial
        JOIN t_dispositivos d
          ON d.id_dispositivo = e.id_dispositivo
       WHERE e.id_evento = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_id_dispositivo        IN t_eventos.id_dispositivo%TYPE
                     ,p_id_senial             IN t_eventos.id_senial%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_id_dispositivo, :p2 p_id_senial, :p3 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_eventos e';
    IF p_id_dispositivo IS NOT NULL
    THEN
      v_where := v_where || ' AND e.id_dispositivo = ' || p_id_dispositivo;
    END IF;
    IF p_id_senial IS NOT NULL
    THEN
      v_where := v_where || ' AND e.id_senial = ' || p_id_senial;
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND e.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND e.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_id_dispositivo, p_id_senial, p_activo;
    v_sql_datos := v_with || 'SELECT c.id_evento Id,
        c.fecha_evento fechaEvento,
        c.valor valor,
        c.id_dispositivo idDispositivo,
        c.id_senial idSenial,
        c.fecha_baja fechaBaja,
        c.n_senial nombresenial,
        CASE
           WHEN c.fecha_baja IS NULL THEN
            ''SI''
           ELSE
            ''NO''
         END activo
        FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.*,s.n_senial FROM t_eventos t JOIN t_seniales s
          ON t.id_senial = s.id_senial ' || v_where ||
                   ' )a ' || 'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.id_evento desc';
              
    OPEN p_cursor FOR v_sql_datos
      USING p_id_dispositivo, p_id_senial, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id             IN OUT t_eventos.id_evento%TYPE
                      ,p_valor          IN t_eventos.valor%TYPE
                      ,p_fecha_evento   IN t_eventos.fecha_evento%TYPE
                      ,p_id_dispositivo IN t_eventos.id_dispositivo%TYPE
                      ,p_id_senial      IN t_eventos.id_senial%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_evento.nextval;
      INSERT INTO t_eventos
        (id_evento, fecha_evento, id_dispositivo, id_senial, valor)
      VALUES
        (p_id, p_fecha_evento, p_id_dispositivo, p_id_senial, p_valor);
    ELSE
      -- modificacion
      UPDATE t_eventos e
         SET e.valor          = p_valor
            ,e.id_dispositivo = p_id_dispositivo
            ,e.id_senial      = p_id_senial
       WHERE e.id_evento = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_eventos.id_evento%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_eventos e
       SET e.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE e.id_evento = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_eventos;
/

prompt
prompt Creating package body PKG_NOTIFICACIONES
prompt ========================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_notificaciones IS

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getbyid(p_id     IN t_notificaciones.id_notificacion%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) IS
  BEGIN
    OPEN p_cursor FOR
      SELECT n.id_notificacion id
            ,n.titulo
            ,n.mensaje           
            ,n.fecha_notificacion
            ,d.n_dispositivo nombredispositivo
            ,CASE
               WHEN e.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_notificaciones n
        JOIN t_eventos e
          ON n.id_evento = e.id_evento
        JOIN t_dispositivos d
          ON e.id_dispositivo = d.id_dispositivo
       WHERE n.id_notificacion = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_id_usuario            IN t_notificaciones.id_usuario%TYPE
                     ,p_titulo                IN t_notificaciones.titulo%TYPE
                     ,p_mensaje               IN t_notificaciones.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) IS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_id_usuario,:p2 p_titulo,:p3 p_mensaje, :p4 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_notificaciones t';
    IF p_id_usuario IS NOT NULL
    THEN
      v_where := v_where || ' AND t.id_usuario = ' || p_id_usuario;
    END IF;
    IF p_titulo IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND lower(t.titulo) LIKE ''%'' || lower(p_titulo) || ''%'' ';
    END IF;
    IF p_mensaje IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND lower(t.mensaje) LIKE ''%'' || lower(p_mensaje) || ''%'' ';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;
    dbms_output.put_line(v_sql_count);
    v_sql_datos := v_with || 'SELECT c.id_notificacion id
            ,c.n_dispositivo nombredispositivo
            ,c.fecha_notificacion FechaNotificacion
            ,c.titulo titulo
            ,c.mensaje mensaje
            ,c.fecha_baja fechabaja
          ,CASE
           WHEN c.fecha_baja IS NULL THEN
            ''SI''
           ELSE
            ''NO''
         END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.*,d.n_dispositivo FROM t_notificaciones t LEFT JOIN t_eventos e ON t.id_evento = e.id_evento LEFT JOIN t_dispositivos d
                   ON e.id_dispositivo = d.id_dispositivo' ||
                   v_where || ' )a ' || 'WHERE rownum <= ' ||
                   v_registro_hasta || ') c WHERE rnum >= ' ||
                   v_registro_desde || ' ORDER BY c.id_notificacion';
    dbms_output.put_line(v_sql_datos);
    OPEN p_cursor FOR v_sql_datos
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;

  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

END pkg_notificaciones;
/

prompt
prompt Creating package body PKG_PERFILES
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_perfiles IS

  PROCEDURE pr_getcombos(p_procesos OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_procesos FOR
      SELECT p.id_proceso id, p.nombre nombre, p.id_proceso_padre idtipo
        FROM t_procesos p
       WHERE p.tipo IN ('H', 'T')
         AND p.fecha_baja IS NULL
       ORDER BY p.id_proceso_padre, p.orden_menu, p.nombre;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getcombos;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getbyid(p_id          IN t_perfiles.id_perfil%TYPE
                      ,p_id_procesos OUT pkg_array.inttabletype
                      ,p_cursor      OUT SYS_REFCURSOR) IS
  BEGIN
    SELECT pp.id_proceso BULK COLLECT
      INTO p_id_procesos
      FROM t_perfiles_proceso pp
     WHERE pp.id_perfil = p_id;
    OPEN p_cursor FOR
      SELECT p.id_perfil id
            ,p.n_perfil nombre
            ,p.fecha_baja fechabaja
            ,CASE
               WHEN p.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_perfiles p
       WHERE p.id_perfil = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_nombre                IN t_perfiles.n_perfil%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_nombre, :p2 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_perfiles t';
    IF p_nombre IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND t.n_perfil LIKE ''%'' || p_nombre || ''%'' ';
      -- (p_nombre IS NULL OR p.n_perfil LIKE '%' || p_nombre || '%') AND
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    dbms_output.put_line(v_sql_count);
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_nombre, p_activo;
    v_sql_datos := v_with || 'SELECT c.id_perfil Id
        ,c.n_perfil nombre
        ,c.fecha_baja fechaBaja
        ,CASE
           WHEN c.fecha_baja IS NULL THEN
            '' SI ''
           ELSE
            '' NO ''
         END activo
FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.* FROM t_perfiles t' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.n_perfil';
    OPEN p_cursor FOR v_sql_datos
      USING p_nombre, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id          IN OUT t_perfiles.id_perfil%TYPE
                      ,p_nombre      IN t_perfiles.n_perfil%TYPE
                      ,p_id_procesos IN pkg_array.inttabletype) IS
    ex_empty_array EXCEPTION;
  BEGIN
    IF p_id = 0
    THEN
      -- Alta del perfil
      p_id := seq_perfil.nextval;
      INSERT INTO t_perfiles (id_perfil, n_perfil) VALUES (p_id, p_nombre);
    ELSE
      -- Modificar un perfil existente
      UPDATE t_perfiles p
         SET p.n_perfil = p_nombre
       WHERE p.id_perfil = p_id;
      -- En la modificacion se borrar el conjunto de procesos vinculados a ese perfil
      DELETE FROM t_perfiles_proceso pp WHERE pp.id_perfil = p_id;
    END IF;
    --En alta y modificacion, insertamos los pefiles del usuario
    IF (p_id_procesos.last IS NULL)
    THEN
      RAISE ex_empty_array;
    ELSE
      -- en alta y modificacion agregamos los procesos
      FOR i IN p_id_procesos.first .. p_id_procesos.last
      LOOP
        INSERT INTO t_perfiles_proceso
          (id_perfil_proceso, id_perfil, id_proceso)
        VALUES
          (seq_perfil_proceso.nextval, p_id, p_id_procesos(i));
      END LOOP;
    END IF;
  EXCEPTION
    WHEN ex_empty_array THEN
      raise_application_error(-20999, 'Debe seleccionar procesos.');
    WHEN OTHERS THEN
      pkg_seguridad.pr_error_msg(SQLERRM);
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_perfiles.id_perfil%TYPE
                     ,p_activo_nuevo IN VARCHAR2) IS
  BEGIN
    UPDATE t_perfiles p
       SET p.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE p.id_perfil = p_id;
    -- auditoria?
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_perfiles;
/

prompt
prompt Creating package body PKG_RECLAMOS
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_reclamos IS

  PROCEDURE pr_getbyid(p_id     IN t_reclamos.id_reclamo%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT r.id_reclamo id
            ,r.titulo titulo
            ,r.mensaje mensaje
            ,r.fecha_reclamo fechareclamo
            ,r.fecha_baja fechabaja
            ,r.respuesta respuesta
            ,CASE
               WHEN r.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_reclamos r
       WHERE r.id_reclamo = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_id_usuario            IN t_reclamos.id_usuario%TYPE
                     ,p_titulo                IN t_reclamos.titulo%TYPE
                     ,p_mensaje               IN t_reclamos.mensaje%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_id_usuario, :p2 p_titulo, :p3 p_mensaje, :p3 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_reclamos t';
    IF p_id_usuario IS NOT NULL
    THEN
      v_where := v_where || ' AND t.id_usuario = ' || p_id_usuario;
    END IF;
    IF p_titulo IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND t.titulo LIKE ''%'' || p_titulo || ''%'' ';
    END IF;
    IF p_mensaje IS NOT NULL
    THEN
      v_where := v_where ||
                 ' AND t.mensaje LIKE ''%'' || p_mensaje || ''%'' ';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;
    v_sql_datos := v_with || 'SELECT c.id_reclamo id
            ,c.titulo titulo
            ,c.mensaje mensaje
            ,c.fecha_reclamo fechareclamo
            ,c.fecha_baja fechabaja
            ,c.respuesta respuesta
          ,CASE
           WHEN c.fecha_baja IS NULL THEN
            ''SI''
           ELSE
            ''NO''
         END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.* FROM t_reclamos t' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.fecha_reclamo';
    OPEN p_cursor FOR v_sql_datos
      USING p_id_usuario, p_titulo, p_mensaje, p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id            IN OUT t_reclamos.id_reclamo%TYPE
                      ,p_titulo        IN t_reclamos.titulo%TYPE
                      ,p_mensaje       IN t_reclamos.mensaje%TYPE
                      ,p_respuesta     IN t_reclamos.respuesta%TYPE
                      ,p_fecha_reclamo IN t_reclamos.fecha_reclamo%TYPE
                      ,p_id_usuario    IN t_reclamos.id_usuario%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_reclamo.nextval;
      INSERT INTO t_reclamos
        (id_reclamo, titulo, mensaje, respuesta, fecha_reclamo, id_usuario)
      VALUES
        (p_id
        ,p_titulo
        ,p_mensaje
        ,p_respuesta
        ,p_fecha_reclamo
        ,p_id_usuario);
    ELSE
      -- modificacion
      UPDATE t_reclamos r
         SET r.titulo        = p_titulo
            ,r.mensaje       = p_mensaje
            ,r.respuesta     = p_respuesta
            ,r.fecha_reclamo = p_fecha_reclamo
            ,r.id_usuario    = p_id_usuario
       WHERE r.id_reclamo = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_reclamos.id_reclamo%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_reclamos r
       SET r.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE r.id_reclamo = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

--------------------------------------------------------------------------------------------------------------------------------------------
END pkg_reclamos;
/

prompt
prompt Creating package body PKG_REPORTES
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_reportes IS

  PROCEDURE pr_get_cuenta_eventos(p_id_dispositivo NUMBER,
                                  p_conteos  OUT SYS_REFCURSOR,
                                  p_msj_error OUT VARCHAR2) IS
    v_id_usuario t_usuarios.id_usuario%TYPE := NULL;
    BEGIN      
      BEGIN
        SELECT ud.id_usuario
        INTO v_id_usuario
        FROM t_usuarios_dispositivo ud
        WHERE ud.id_dispositivo = p_id_dispositivo
        AND NVL(ud.fecha_baja, SYSDATE + 1) >= SYSDATE;
      EXCEPTION 
        WHEN OTHERS THEN 
          p_msj_error := 'Se produjo un Error: ' || SQLERRM; 
      END;
    
      IF v_id_usuario IS NOT NULL THEN
        OPEN p_conteos FOR 
          SELECT s.n_senial, count(e.id_evento) as total 
          FROM t_eventos e inner join t_seniales s on e.id_senial = s.id_senial 
          WHERE e.id_dispositivo = id_dispositivo 
          GROUP BY s.n_senial; 
      END IF;

  END pr_get_cuenta_eventos;

  PROCEDURE pr_get_ultimos_eventos(p_id_dispositivo NUMBER,
                                  p_conteos  OUT SYS_REFCURSOR,
                                  p_msj_error OUT VARCHAR2) IS
    v_id_usuario t_usuarios.id_usuario%TYPE := NULL;
    BEGIN
      BEGIN
        SELECT ud.id_usuario
        INTO v_id_usuario
        FROM t_usuarios_dispositivo ud
        WHERE ud.id_dispositivo = p_id_dispositivo
        AND NVL(ud.fecha_baja, SYSDATE + 1) >= SYSDATE;
      EXCEPTION
        WHEN OTHERS THEN
          p_msj_error := 'Se produjo un Error: ' || SQLERRM;
      END;

      IF v_id_usuario IS NOT NULL THEN
        OPEN p_conteos FOR
          SELECT s.n_senial, max(e.fecha_evento) as total
          FROM t_eventos e inner join t_seniales s on e.id_senial = s.id_senial
          WHERE e.id_dispositivo = id_dispositivo
          AND NVL(e.fecha_baja, SYSDATE + 1) >= SYSDATE
          GROUP BY s.n_senial;
      END IF;
  END pr_get_ultimos_eventos;

END pkg_reportes;
/

prompt
prompt Creating package body PKG_SEGURIDAD
prompt ===================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_seguridad IS

  -------------------------------------------------------------------------------------------------------------------------------
  FUNCTION fn_id_session RETURN VARCHAR2 IS
    pp_id_session VARCHAR2(40) := id_session;
  BEGIN
    IF id_session IS NULL
    THEN
      SELECT substr(sys_context('userenv', 'terminal', 50) || ' - ' ||
                    sys_context('userenv', 'os_user', 30) || ' - ' || USER, 1, 40)
        INTO pp_id_session
        FROM dual;
    END IF;
    RETURN pp_id_session;
  END;

  -------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_items_seguridad_dto_s(p_cursor1 OUT SYS_REFCURSOR
                                    ,p_cursor2 OUT SYS_REFCURSOR
                                    ,p_cursor3 OUT SYS_REFCURSOR
                                    ,p_cursor4 OUT SYS_REFCURSOR) AS
  BEGIN
    --MenuesHijos
    OPEN p_cursor1 FOR
      SELECT p.id_proceso
            ,p.nombre
            ,p.url
            ,p.id_proceso_padre
            ,p.orden_menu ordenmenu
        FROM t_procesos p
       WHERE p.tipo = 'H'
         AND p.fecha_baja IS NULL
       ORDER BY p.orden_menu, p.nombre;
    --MenuesPadres
    OPEN p_cursor2 FOR
      SELECT p2.id_proceso, p2.nombre nombre, p2.orden_menu ordenmenu
        FROM t_procesos p2
       WHERE p2.tipo = 'P'
         AND p2.fecha_baja IS NULL
       ORDER BY p2.orden_menu, p2.nombre;
    --PerfilesProcesos
    OPEN p_cursor3 FOR
      SELECT id_perfil, id_proceso FROM t_perfiles_proceso pepr;
    --Procesos
    OPEN p_cursor4 FOR
      SELECT p4.id_proceso id
            ,p4.nombre     nombre
            ,p4.url
            ,p4.orden_menu ordenmenu
        FROM t_procesos p4
       WHERE p4.tipo <> 'P' -- menues hijos (H) y tareas (T)
         AND p4.fecha_baja IS NULL
       ORDER BY p4.orden_menu, p4.nombre;
  END;

  ----------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_usuarios_login(p_email          IN t_usuarios.email%TYPE
                             ,p_password       IN t_usuarios.password%TYPE
                             ,p_id_sesion      IN t_sesiones.id_sesion%TYPE
                             ,p_ip             IN t_sesiones.ip%TYPE
                             ,p_id_usuario     OUT t_usuarios.id_usuario%TYPE
                             ,p_nombrecompleto OUT VARCHAR2
                             ,p_cursor         OUT SYS_REFCURSOR) AS
    ex_empty_array EXCEPTION;
  BEGIN
    --Obtiene el id_usuario a traves del cuil
    SELECT u.id_usuario, u.apellido || ', ' ||  u.nombre 
      INTO p_id_usuario, p_nombrecompleto
      FROM t_usuarios u
     WHERE u.email = lower(p_email)
       AND u.password = lower(p_password)
       AND nvl(u.fecha_baja, SYSDATE + 1) > SYSDATE;
    --Actualiza el ultimo login del usuario
    UPDATE t_usuarios u
       SET u.ultimo_login = SYSDATE
     WHERE u.id_usuario = p_id_usuario;
    --Inserta en t_sesiones
    INSERT INTO t_sesiones
      (id_sesion, ip, fecha_inicio, id_usuario)
    VALUES
      (p_id_sesion, p_ip, SYSDATE, p_id_usuario);
    --Devuelve un cursor con los perfiles del usuario
    OPEN p_cursor FOR
      SELECT p.id_perfil id
        FROM t_perfiles p
       INNER JOIN t_usuarios_perfil up
          ON p.id_perfil = up.id_perfil
       WHERE up.id_usuario = p_id_usuario;
  EXCEPTION
    WHEN no_data_found THEN
      raise_application_error(-20999, 'Credenciales incorrectas');
    WHEN OTHERS THEN
      pkg_seguridad.pr_error_msg(SQLERRM);
      RAISE;
  END pr_usuarios_login;

  --------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_usuarios_logout(p_id_sesion       IN t_sesiones.id_sesion%TYPE
                              ,p_timeout_minutos IN NUMBER) AS
  BEGIN
    UPDATE t_sesiones s
       SET s.fecha_fin = CASE
                           WHEN p_timeout_minutos IS NOT NULL
                                AND s.fecha_inicio <
                                SYSDATE -
                                (1 / 24 / 60 * (p_timeout_minutos + 1)) THEN
                            SYSDATE - (1 / 24 / 60 * (p_timeout_minutos + 1))
                           ELSE
                            SYSDATE
                         END
     WHERE s.id_sesion = p_id_sesion
       AND s.fecha_fin IS NULL;
  END pr_usuarios_logout;

  -------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_error_msg(p_msg VARCHAR2) IS
    v_msg       VARCHAR2(500) := p_msg;
    v_msg_error VARCHAR2(500);
    v_error_nro VARCHAR2(10);
    v_tabla     VARCHAR2(50);
    v_dato      VARCHAR2(100);
    v_uk        VARCHAR2(100);
  BEGIN
    v_error_nro := substr(v_msg, 5, instr(v_msg, ':') - 5);
    IF v_error_nro = '20999'
    THEN
      raise_application_error(-20999, substr(v_msg, instr(v_msg, ':') + 1));
    END IF;
    IF v_msg LIKE '%unique constraint (HOMESAFEHOME.UK_%) violated%'
    THEN
      v_uk := substr(v_msg, (instr(v_msg, 'HOMESAFEHOME.') + 8), instr(v_msg, ')') -
                      instr(v_msg, 'HOMESAFEHOME.') - 8);
      BEGIN
        SELECT column_name
          INTO v_dato
          FROM all_cons_columns
         WHERE owner = 'HOMESAFEHOME'
           AND constraint_name = upper(v_uk);
      EXCEPTION
        WHEN OTHERS THEN
          v_dato := 'Desconocido';
      END;
      raise_application_error(-20999, 'El valor ingresado ya existe en el sistema');
    END IF;
    v_tabla     := lower(substr(v_msg, instr(v_msg, '"', 1, 3), instr(v_msg, '"', -1, 3) -
                                 instr(v_msg, '"', 1, 3) + 1)); -- TABLA
    v_dato      := lower(substr(v_msg, instr(v_msg, '"', 1, 5) + 1, instr(v_msg, ')') -
                                 instr(v_msg, '"', 1, 5) - 2));
    v_dato := CASE
                WHEN v_error_nro IN ('01400', '01407') THEN
                 lower(substr(v_msg, instr(v_msg, '"', 1, 5) + 1, instr(v_msg, ')') -
                               instr(v_msg, '"', 1, 5) - 2))
                WHEN v_error_nro IN ('12899') THEN
                 lower(substr(v_msg, instr(v_msg, '"', 1, 5) + 1, instr(v_msg, '"', -1, 1) -
                               instr(v_msg, '"', 1, 5) - 1))
                ELSE
                 v_msg
              END;
    v_dato := CASE
                WHEN upper(v_dato) LIKE 'N\_%' ESCAPE '\' THEN
                 'Nombre'
                WHEN upper(v_dato) LIKE 'ID\_%' ESCAPE '\' THEN
                 'Id'
                ELSE
                 v_dato
              END;
    v_msg_error := CASE
                     WHEN v_error_nro IN ('01400', '01407') THEN
                      v_dato || ' es un dato requerido.'
                     WHEN v_error_nro = '12899' THEN
                      v_dato || ' tiene demasiados caracteres'
                     ELSE
                      'OTRO'
                   END;
    IF v_msg_error <> 'OTRO'
    THEN
      raise_application_error(-20999, v_msg_error);
    ELSE
      raise_application_error(-20000, v_msg);
    END IF;
  END pr_error_msg;

-------------------------------------------------------------------------------------------------------------------------
END pkg_seguridad;
/

prompt
prompt Creating package body PKG_SENIALES
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_seniales IS

  PROCEDURE pr_getbyid(p_id     IN t_seniales.id_senial%TYPE
                      ,p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_cursor FOR
      SELECT s.id_senial id
            ,s.n_senial nombre
            ,CASE
               WHEN s.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_seniales s
       WHERE s.id_senial = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_activo                IN OUT VARCHAR2
                     ,p_nombre                IN VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_nombre, :p2 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    -- contar resultados para el paginado
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_seniales s';
    IF p_nombre IS NOT NULL
    THEN
      v_where := 's.n_senial LIKE ''%' || p_nombre || '%''';
    END IF;
    IF p_activo IS NOT NULL
       AND p_nombre IS NOT NULL
    THEN
      v_where := v_where || ' AND ';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || 's.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || 's.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_nombre,p_activo;
    v_sql_datos := v_with ||
                   'SELECT c.id_senial Id,
            c.n_senial nombre,
            c.fecha_baja fechaBaja,
            CASE
               WHEN c.fecha_baja IS NULL THEN
                '' SI ''
               ELSE
                '' NO ''
             END activo
             FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT se.* FROM t_seniales se' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rownum >= ' || v_registro_desde ||
                   ' ORDER BY c.n_senial';
                   DBMS_OUTPUT.PUT_LINE(''||v_sql_datos);
    OPEN p_cursor FOR v_sql_datos
      USING p_nombre,p_activo;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id     IN OUT t_seniales.id_senial%TYPE
                      ,p_nombre IN t_seniales.n_senial%TYPE) AS
  BEGIN
    IF p_id = 0
    THEN
      -- alta
      p_id := seq_senial.nextval;
      INSERT INTO t_seniales (id_senial, n_senial) VALUES (p_id, p_nombre);
    ELSE
      -- modificacion
      UPDATE t_seniales s
         SET s.n_senial = p_nombre
       WHERE s.id_senial = p_id;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_seniales.id_senial%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_seniales s
       SET s.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE s.id_senial = p_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_seniales;
/

prompt
prompt Creating package body PKG_USUARIOS
prompt ==================================
prompt
CREATE OR REPLACE PACKAGE BODY pkg_usuarios IS

  PROCEDURE pr_getcombos(p_perfiles OUT SYS_REFCURSOR) AS
  BEGIN
    OPEN p_perfiles FOR
      SELECT p.id_perfil id, p.n_perfil nombre
        FROM t_perfiles p
       WHERE p.fecha_baja IS NULL;
  END pr_getcombos;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getbyid(p_id          IN t_usuarios.id_usuario%TYPE
                      ,p_id_perfiles OUT pkg_array.inttabletype
                      ,p_cursor      OUT SYS_REFCURSOR) AS
  BEGIN
    --Selecciono todos los perfiles para el usuario determinado por el id
    SELECT up.id_perfil BULK COLLECT
      INTO p_id_perfiles
      FROM t_usuarios_perfil up
     WHERE up.id_usuario = p_id;
    --Selecciono todos los datos para el usuario determinado por el id
    OPEN p_cursor FOR
      SELECT t.id_usuario id
            ,t.fecha_inicio fechainicio
            ,t.fecha_baja fechabaja
            ,t.email
            --,t.password
            ,t.ultimo_login ultimologin
            ,CASE
               WHEN t.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_usuarios t
       WHERE id_usuario = p_id;
  END pr_getbyid;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_getall(p_email                 IN t_usuarios.email%TYPE
                     ,p_activo                IN OUT VARCHAR2
                     ,p_numeropaginalistado   IN NUMBER
                     ,p_totalregistroslistado OUT NUMBER
                     ,p_cursor                OUT SYS_REFCURSOR) AS
    v_registro_desde NUMBER(10) := (p_numeropaginalistado * 10) - 9;
    v_registro_hasta NUMBER(10) := v_registro_desde + 9;
    v_sql_count      VARCHAR2(4000);
    v_sql_datos      VARCHAR2(4000);
    v_with           VARCHAR2(2000) := 'WITH param as (SELECT :p1 p_email, :p2 p_activo FROM dual) ';
    v_where          VARCHAR2(2000);
  BEGIN
    v_sql_count := v_with || 'SELECT COUNT(*) FROM t_usuarios t';
    IF p_email IS NOT NULL
    THEN
      v_where := v_where || ' AND lower(t.email) = lower(p_email)';
    END IF;
    IF p_activo = 'SI'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NULL ';
    END IF;
    IF p_activo = 'NO'
    THEN
      v_where := v_where || ' AND t.fecha_baja IS NOT NULL ';
    END IF;
    IF (v_where IS NOT NULL)
    THEN
      v_where     := substr(v_where, 5);
      v_where     := ', param where ' || v_where;
      v_sql_count := v_sql_count || v_where;
    END IF;
    EXECUTE IMMEDIATE v_sql_count
      INTO p_totalregistroslistado
      USING p_email, p_activo;
    v_sql_datos := v_with || 'SELECT c.id_usuario id
          ,c.fecha_inicio fechainicio
          ,c.fecha_baja fechabaja
          ,c.email
          ,c.nombre
          ,c.apellido         
          ,c.apellido || '', '' ||  c.nombre as PersonaNombre
          ,c.ultimo_login ultimologin
          ,CASE
           WHEN c.fecha_baja IS NULL THEN
            ''SI''
           ELSE
            ''NO''
         END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                   '(SELECT t.* FROM t_usuarios t' || v_where || ' )a ' ||
                   'WHERE rownum <= ' || v_registro_hasta ||
                   ') c WHERE rnum >= ' || v_registro_desde ||
                   ' ORDER BY c.email';
    OPEN p_cursor FOR v_sql_datos
      USING p_email, p_activo;
  END pr_getall;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_postput(p_id          IN OUT t_usuarios.id_usuario%TYPE
                      ,p_email       IN t_usuarios.email%TYPE
                      ,p_password    IN t_usuarios.password%TYPE
                      ,p_nombre    IN t_usuarios.nombre%TYPE
                      ,p_apellido IN t_usuarios.apellido%TYPE
                      ) AS
    
  BEGIN
    IF p_id = 0
    THEN
      --Alta
      p_id := seq_usuario.nextval;
      INSERT INTO t_usuarios
        (id_usuario, fecha_inicio, email, password, nombre, apellido)
      VALUES
        (p_id, SYSDATE, lower(p_email), lower(p_password), p_nombre, p_apellido);
        INSERT INTO t_usuarios_perfil
          (id_usuario_perfil, id_usuario, id_perfil)
        VALUES
          (seq_usuario_perfil.nextval, p_id, 5);
    ELSE
      --Modificacion
      UPDATE t_usuarios t
         SET t.email = p_email, t.password = p_password, t.nombre = p_nombre, t.apellido = p_apellido
       WHERE t.id_usuario = p_id;
    
    END IF;
      --Se eliminan todos los perfiles del usuario modificado
      
    /* 
    ex_empty_array EXCEPTION;
      DELETE FROM t_usuarios_perfil up WHERE up.id_usuario = p_id;
    ,p_id_perfiles IN pkg_array.inttabletype
    IF (p_id_perfiles.first IS NULL)
    THEN
      RAISE ex_empty_array;
    ELSE
      FOR i IN p_id_perfiles.first .. p_id_perfiles.last
      LOOP
        INSERT INTO t_usuarios_perfil
          (id_usuario_perfil, id_usuario, id_perfil)
        VALUES
          (seq_usuario_perfil.nextval, p_id, p_id_perfiles(i));
      END LOOP;
    END IF;*/
  EXCEPTION
   /* WHEN ex_empty_array THEN
      raise_application_error(-20999, 'Debe seleccionar perfiles.');*/
    WHEN OTHERS THEN
      pkg_seguridad.pr_error_msg(SQLERRM);
      RAISE;
  END pr_postput;

  --------------------------------------------------------------------------------------------------------------------------------------------
  PROCEDURE pr_delete(p_id           IN t_perfiles.id_perfil%TYPE
                     ,p_activo_nuevo IN VARCHAR2) AS
  BEGIN
    UPDATE t_usuarios p
       SET p.fecha_baja = CASE
                            WHEN p_activo_nuevo = 'SI' THEN
                             NULL
                            ELSE
                             SYSDATE
                          END
     WHERE p.id_usuario = p_id;
    -- auditoria?
  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_delete;

END pkg_usuarios;
/

prompt
prompt Creating trigger TRG_EVENTOS
prompt ============================
prompt
create or replace trigger TRG_EVENTOS
  after insert or update on t_eventos  
  for each row
DECLARE
  v_usuario_duenio t_usuarios_dispositivo.id_usuario%TYPE;
  v_minimo_valor   t_configuraciones_notificacion.valor_desde%TYPE;
  v_maximo_valor   t_configuraciones_notificacion.valor_hasta%TYPE;
  v_titulo         t_configuraciones_notificacion.titulo%TYPE := '';
  v_mensaje        t_configuraciones_notificacion.titulo%TYPE := '';
BEGIN
  SELECT d.id_usuario
    INTO v_usuario_duenio
    FROM t_usuarios_dispositivo d
   WHERE d.id_dispositivo = :new.id_dispositivo;
  --Definicion el tipo de mensaje segun la señal que venga
  /*1 
  id_senial 1 MONOXIDO DE CARBONO Valores
  id_senial 3 PUERTA (0=abierto, 1 = cerrado) 
  2 LUZ
  4 GARAGE*/
  SELECT MIN(valor_desde)
    INTO v_minimo_valor
    FROM t_configuraciones_notificacion
   WHERE id_senial = :new.id_senial;
  SELECT MAX(valor_hasta)
    INTO v_maximo_valor
    FROM t_configuraciones_notificacion
   WHERE id_senial = :new.id_senial;
  IF (:new.valor >= v_minimo_valor AND :new.valor <= v_maximo_valor)
  THEN
    SELECT cn.titulo, cn.mensaje
      INTO v_titulo, v_mensaje
      FROM t_configuraciones_notificacion cn
     WHERE :new.id_senial = cn.id_senial
       AND :new.valor BETWEEN cn.valor_desde AND cn.valor_hasta;
  END IF;
  -------------------------------------------------------------------------------------
  --Notificacion dueño
  INSERT INTO t_notificaciones
    (id_notificacion
    ,fecha_notificacion
    ,id_evento
    ,id_usuario
    ,titulo
    ,mensaje)
  VALUES
    (seq_notificacion.nextval
    ,:new.fecha_evento
    ,:new.id_evento
    ,v_usuario_duenio
    ,v_titulo
    ,v_mensaje);
  --Notificaciones contactos
  INSERT INTO t_notificaciones
    (id_notificacion
    ,fecha_notificacion
    ,id_evento
    ,id_usuario
    ,titulo
    ,mensaje)
    SELECT seq_notificacion.nextval
          ,:new.fecha_evento
          ,:new.id_evento
          ,c.id_usuario_contacto
          ,v_titulo
          ,v_mensaje
      FROM t_usuarios_dispositivo d
      LEFT JOIN t_contactos c
        ON c.id_usuario_duenio = d.id_usuario
     WHERE :new.id_dispositivo = d.id_dispositivo;
END trg_eventos;
/


spool off
