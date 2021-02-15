---------------------------------------------
-- Export file for user HOMESAFEHOME       --
-- Created by diego on 29/9/2018, 18:13:12 --
---------------------------------------------

spool DER.log

prompt
prompt Creating table T_AUDITORIAS_PROCESO
prompt ===================================
prompt
create table HOMESAFEHOME.T_AUDITORIAS_PROCESO
(
  ID_AUDITORIA_PROCESO NUMBER(10) not null,
  N_AUDITORIA_PROCESO  VARCHAR2(100),
  DESCRIPCION          VARCHAR2(200),
  FECHA_BAJA           DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_AUDITORIAS_PROCESO
  add constraint PK_AUDITORIAS_PROCESO primary key (ID_AUDITORIA_PROCESO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_USUARIOS
prompt =========================
prompt
create table HOMESAFEHOME.T_USUARIOS
(
  ID_USUARIO   NUMBER(10) not null,
  LOGIN        VARCHAR2(30),
  FECHA_INICIO DATE,
  FECHA_FIN    DATE,
  EMAIL        VARCHAR2(40),
  ULTIMO_LOGIN DATE,
  FECHA_BAJA   DATE,
  PASSWORD     VARCHAR2(40),
  NOMBRE       VARCHAR2(100),
  APELLIDO     VARCHAR2(100)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS
  add constraint PK_USUARIOS primary key (ID_USUARIO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS
  add constraint UK_USU_EMAIL unique (EMAIL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_SESIONES
prompt =========================
prompt
create table HOMESAFEHOME.T_SESIONES
(
  ID_SESION    VARCHAR2(40) not null,
  IP           VARCHAR2(15),
  FECHA_INICIO DATE,
  FECHA_FIN    DATE,
  ID_USUARIO   NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_SESIONES
  add constraint PK_SESIONES primary key (ID_SESION)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_SESIONES
  add constraint FK_SES_USU foreign key (ID_USUARIO)
  references HOMESAFEHOME.T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_AUDITORIAS
prompt ===========================
prompt
create table HOMESAFEHOME.T_AUDITORIAS
(
  ID_AUDITORIA         NUMBER(10) not null,
  ID_SESION            VARCHAR2(40),
  FECHA_AUDITORIA      DATE,
  OBSERVACIONES        VARCHAR2(4000),
  ID_CLAVE             VARCHAR2(40),
  ID_AUDITORIA_PROCESO NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_AUDITORIAS
  add constraint PK_AUDITORIAS primary key (ID_AUDITORIA)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_AUDITORIAS
  add constraint FK_AUD_PROC foreign key (ID_AUDITORIA_PROCESO)
  references HOMESAFEHOME.T_AUDITORIAS_PROCESO (ID_AUDITORIA_PROCESO);
alter table HOMESAFEHOME.T_AUDITORIAS
  add constraint FK_AUD_SES foreign key (ID_SESION)
  references HOMESAFEHOME.T_SESIONES (ID_SESION);

prompt
prompt Creating table T_AVISOS
prompt =======================
prompt
create table HOMESAFEHOME.T_AVISOS
(
  ID_AVISO    NUMBER(10) not null,
  FECHA_AVISO DATE,
  TITULO      VARCHAR2(100),
  MENSAJE     VARCHAR2(400),
  ID_USUARIO  NUMBER(10),
  FECHA_BAJA  DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_AVISOS
  add constraint PK_AVISO primary key (ID_AVISO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_CONTACTOS
prompt ==========================
prompt
create table HOMESAFEHOME.T_CONTACTOS
(
  ID_CONTACTO         NUMBER(10) not null,
  FECHA_INICIO        DATE,
  ID_USUARIO_DUENIO   NUMBER(10),
  ID_USUARIO_CONTACTO NUMBER(10),
  FECHA_BAJA          DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_CONTACTOS
  add constraint PK_CONTACTOS primary key (ID_CONTACTO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_CONTACTOS
  add constraint FK_CONTACTO_USUARIO foreign key (ID_USUARIO_CONTACTO)
  references HOMESAFEHOME.T_USUARIOS (ID_USUARIO);
alter table HOMESAFEHOME.T_CONTACTOS
  add constraint FK_DUENIO_USUARIO foreign key (ID_USUARIO_DUENIO)
  references HOMESAFEHOME.T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_DISPOSITIVOS
prompt =============================
prompt
create table HOMESAFEHOME.T_DISPOSITIVOS
(
  ID_DISPOSITIVO NUMBER(10) not null,
  N_DISPOSITIVO  VARCHAR2(200),
  FECHA_BAJA     DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_DISPOSITIVOS
  add constraint PK_DISPOSITIVO primary key (ID_DISPOSITIVO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_DISPOSITIVOS
  add constraint UK_DISPOSITIVO unique (N_DISPOSITIVO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_SENIALES
prompt =========================
prompt
create table HOMESAFEHOME.T_SENIALES
(
  ID_SENIAL   NUMBER(10) not null,
  N_SENIAL    VARCHAR2(200),
  FECHA_BAJA  DATE,
  TIPO_SENIAL VARCHAR2(2),
  VALOR_DESDE NUMBER(5),
  VALOR_HASTA NUMBER(5)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_SENIALES
  add constraint PK_SENIAL primary key (ID_SENIAL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_SENIALES
  add constraint UK_SENIAL unique (N_SENIAL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_EVENTOS
prompt ========================
prompt
create table HOMESAFEHOME.T_EVENTOS
(
  ID_EVENTO      NUMBER(10) not null,
  FECHA_EVENTO   DATE,
  ID_SENIAL      NUMBER(10) not null,
  ID_DISPOSITIVO NUMBER(10) not null,
  VALOR          NUMBER(10),
  FECHA_BAJA     DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_EVENTOS
  add constraint PK_EVENTOS primary key (ID_EVENTO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_EVENTOS
  add constraint FK_EVENTOS_DISPOSITIVOS foreign key (ID_DISPOSITIVO)
  references HOMESAFEHOME.T_DISPOSITIVOS (ID_DISPOSITIVO);
alter table HOMESAFEHOME.T_EVENTOS
  add constraint FK_EVENTOS_SENIAL foreign key (ID_SENIAL)
  references HOMESAFEHOME.T_SENIALES (ID_SENIAL);

prompt
prompt Creating table T_RECLAMOS
prompt =========================
prompt
create table HOMESAFEHOME.T_RECLAMOS
(
  ID_RECLAMO    NUMBER(10) not null,
  FECHA_RECLAMO DATE,
  TITULO        VARCHAR2(100),
  MENSAJE       VARCHAR2(400),
  RESPUESTA     VARCHAR2(400),
  ID_USUARIO    NUMBER(10),
  FECHA_BAJA    DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_RECLAMOS
  add constraint PK_RECLAMO primary key (ID_RECLAMO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_NOTIFICACIONES
prompt ===============================
prompt
create table HOMESAFEHOME.T_NOTIFICACIONES
(
  ID_NOTIFICACION    NUMBER(10) not null,
  FECHA_NOTIFICACION DATE,
  ID_EVENTO          NUMBER(10),
  ID_RECLAMO         NUMBER(10),
  ID_AVISO           NUMBER(10),
  FECHA_ENTREGA      DATE,
  FECHA_LECTURA      DATE,
  FECHA_BAJA         DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_NOTIFICACIONES
  add constraint PK_NOTIFICACION primary key (ID_NOTIFICACION)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_NOTIFICACIONES
  add constraint FK_NOT_AVISOS foreign key (ID_AVISO)
  references HOMESAFEHOME.T_AVISOS (ID_AVISO);
alter table HOMESAFEHOME.T_NOTIFICACIONES
  add constraint FK_NOT_EVENTOS foreign key (ID_EVENTO)
  references HOMESAFEHOME.T_EVENTOS (ID_EVENTO);
alter table HOMESAFEHOME.T_NOTIFICACIONES
  add constraint FK_NOT_RECLAMOS foreign key (ID_RECLAMO)
  references HOMESAFEHOME.T_RECLAMOS (ID_RECLAMO);

prompt
prompt Creating table T_PERFILES
prompt =========================
prompt
create table HOMESAFEHOME.T_PERFILES
(
  ID_PERFIL  NUMBER(10) not null,
  N_PERFIL   VARCHAR2(200),
  FECHA_BAJA DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_PERFILES
  add constraint PK_PERFIL primary key (ID_PERFIL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_PERFILES
  add constraint UK_PERFIL unique (N_PERFIL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_PROCESOS
prompt =========================
prompt
create table HOMESAFEHOME.T_PROCESOS
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
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_PROCESOS
  add constraint PK_PROCESOS primary key (ID_PROCESO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_PERFILES_PROCESO
prompt =================================
prompt
create table HOMESAFEHOME.T_PERFILES_PROCESO
(
  ID_PERFIL_PROCESO NUMBER(10) not null,
  ID_PROCESO        NUMBER(10),
  ID_PERFIL         NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_PERFILES_PROCESO
  add constraint PK_PERFILES_PROCESO primary key (ID_PERFIL_PROCESO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_PERFILES_PROCESO
  add constraint FK_PERFIL_PROCESO foreign key (ID_PROCESO)
  references HOMESAFEHOME.T_PROCESOS (ID_PROCESO);
alter table HOMESAFEHOME.T_PERFILES_PROCESO
  add constraint FK_PROCESO_PERFIL foreign key (ID_PERFIL)
  references HOMESAFEHOME.T_PERFILES (ID_PERFIL);

prompt
prompt Creating table T_USUARIOS_DISPOSITIVO
prompt =====================================
prompt
create table HOMESAFEHOME.T_USUARIOS_DISPOSITIVO
(
  ID_USUARIO_DISPOSITIVO NUMBER(10) not null,
  FECHA_INICIO           DATE,
  ID_USUARIO             NUMBER(10),
  ID_DISPOSITIVO         NUMBER(10),
  FECHA_BAJA             DATE
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS_DISPOSITIVO
  add constraint PK_USU_DISP primary key (ID_USUARIO_DISPOSITIVO)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS_DISPOSITIVO
  add constraint FK_DISP_USU foreign key (ID_DISPOSITIVO)
  references HOMESAFEHOME.T_DISPOSITIVOS (ID_DISPOSITIVO);
alter table HOMESAFEHOME.T_USUARIOS_DISPOSITIVO
  add constraint FK_USU_DISP foreign key (ID_USUARIO)
  references HOMESAFEHOME.T_USUARIOS (ID_USUARIO);

prompt
prompt Creating table T_USUARIOS_PERFIL
prompt ================================
prompt
create table HOMESAFEHOME.T_USUARIOS_PERFIL
(
  ID_USUARIO_PERFIL NUMBER(10) not null,
  ID_USUARIO        NUMBER(10),
  ID_PERFIL         NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS_PERFIL
  add constraint PK_USUARIO_PERFIL primary key (ID_USUARIO_PERFIL)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table HOMESAFEHOME.T_USUARIOS_PERFIL
  add constraint FK_PERFIL_USUARIO foreign key (ID_USUARIO)
  references HOMESAFEHOME.T_USUARIOS (ID_USUARIO);
alter table HOMESAFEHOME.T_USUARIOS_PERFIL
  add constraint FK_USUARIO_PERFIL foreign key (ID_PERFIL)
  references HOMESAFEHOME.T_PERFILES (ID_PERFIL);


spool off
