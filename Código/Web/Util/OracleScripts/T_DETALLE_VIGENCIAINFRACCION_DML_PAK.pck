
/******************************************************************************
    Procedimientos para la tabla  REPAT.T_DETALLE_VIGENCIAINFRACCION
	segun modelo de ABMC simples
	Generado: 02/02/2017	  20218230149
******************************************************************************/
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_DETALLE_VIGENCIAINFRACCION_set
(
    p_cursor out sys_refcursor
)
as
begin

    open p_cursor for
    select t.ID_DETALLE_VIGENCIA Id, t.SANCION_MULTA Nombre 
	from REPAT.T_DETALLE_VIGENCIAINFRACCION t
	order by SANCION_MULTA;
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_DETALLE_VIGENCIAINFRACCION_sf(
	p_FEC_INICIO in T_DETALLE_VIGENCIAINFRACCION.FEC_INICIO%type,
	p_MULTA_UNIDAD_MINIMA in T_DETALLE_VIGENCIAINFRACCION.MULTA_UNIDAD_MINIMA%type,
	p_MULTA_UNIDAD_MAXIMA in T_DETALLE_VIGENCIAINFRACCION.MULTA_UNIDAD_MAXIMA%type,
	p_SANCION_MULTA in T_DETALLE_VIGENCIAINFRACCION.SANCION_MULTA%type,
	p_SANCION_SUSPENCION in T_DETALLE_VIGENCIAINFRACCION.SANCION_SUSPENCION%type,
	p_TIEMPO_VALIDEZ_SUSPENCION in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_SUSPENCION%type,
	p_SANCION_INHAB in T_DETALLE_VIGENCIAINFRACCION.SANCION_INHAB%type,
	p_TIEMPO_VALIDEZ_INHAB in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_INHAB%type,
	p_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.PUNTOS%type,
	p_FEC_FIN_VIGENCIA in T_DETALLE_VIGENCIAINFRACCION.FEC_FIN_VIGENCIA%type,
	p_TIEMPO_VALIDEZ_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_PUNTOS%type,
	p_ID_TIPO_FALTA in T_DETALLE_VIGENCIAINFRACCION.ID_TIPO_FALTA%type,
	p_ID_OBSERVACION_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.ID_OBSERVACION_PUNTOS%type,
	p_ID_INFRACCION_NOMENCLADA in T_DETALLE_VIGENCIAINFRACCION.ID_INFRACCION_NOMENCLADA%type,
	p_ID_TIPO_PAGO in T_DETALLE_VIGENCIAINFRACCION.ID_TIPO_PAGO%type,
	p_activo          IN OUT VARCHAR2 
   ,p_NumeroPaginaListado in number
   ,p_TotalRegistrosListado OUT NUMBER
   ,p_cursor          OUT SYS_REFCURSOR) 
   AS
    v_registro_desde  number(10) := (p_NumeroPaginaListado * 10) - 9 ;
    v_registro_hasta  number(10) := v_registro_desde + 9;
begin

-- contar resultados
  select count(*)
    into p_TotalRegistrosListado
    from REPAT.T_DETALLE_VIGENCIAINFRACCION t
    where 
		(p_FEC_INICIO is null or t.FEC_INICIO = p_FEC_INICIO) and 
	(p_MULTA_UNIDAD_MINIMA is null or t.MULTA_UNIDAD_MINIMA = p_MULTA_UNIDAD_MINIMA) and 
	(p_MULTA_UNIDAD_MAXIMA is null or t.MULTA_UNIDAD_MAXIMA = p_MULTA_UNIDAD_MAXIMA) and 
	(p_SANCION_MULTA is null or t.SANCION_MULTA like  '%' ||p_SANCION_MULTA|| '%') and 
	(p_SANCION_SUSPENCION is null or t.SANCION_SUSPENCION like  '%' ||p_SANCION_SUSPENCION|| '%') and 
	(p_TIEMPO_VALIDEZ_SUSPENCION is null or t.TIEMPO_VALIDEZ_SUSPENCION = p_TIEMPO_VALIDEZ_SUSPENCION) and 
	(p_SANCION_INHAB is null or t.SANCION_INHAB like  '%' ||p_SANCION_INHAB|| '%') and 
	(p_TIEMPO_VALIDEZ_INHAB is null or t.TIEMPO_VALIDEZ_INHAB = p_TIEMPO_VALIDEZ_INHAB) and 
	(p_PUNTOS is null or t.PUNTOS = p_PUNTOS) and 
	(p_FEC_FIN_VIGENCIA is null or t.FEC_FIN_VIGENCIA = p_FEC_FIN_VIGENCIA) and 
	(p_TIEMPO_VALIDEZ_PUNTOS is null or t.TIEMPO_VALIDEZ_PUNTOS = p_TIEMPO_VALIDEZ_PUNTOS) and 
	(p_ID_TIPO_FALTA is null or t.ID_TIPO_FALTA = p_ID_TIPO_FALTA) and 
	(p_ID_OBSERVACION_PUNTOS is null or t.ID_OBSERVACION_PUNTOS = p_ID_OBSERVACION_PUNTOS) and 
	(p_ID_INFRACCION_NOMENCLADA is null or t.ID_INFRACCION_NOMENCLADA = p_ID_INFRACCION_NOMENCLADA) and 
	(p_ID_TIPO_PAGO is null or t.ID_TIPO_PAGO = p_ID_TIPO_PAGO)        and 1 = case when  p_activo is null  then 1
             when p_activo = 'SI' and  t.__CampoFechaBajaInexistente is null then 1
             when p_activo = 'NO' and not t.__CampoFechaBajaInexistente is null then 1
             else 0 end;
    
    
    open p_cursor for
  -- <paginacion>
     select * from (select pag.*, rownum rnum from (
  -- <paginacion>
     select
		t.ID_DETALLE_VIGENCIA Id,
		t.FEC_INICIO,
		t.MULTA_UNIDAD_MINIMA,
		t.MULTA_UNIDAD_MAXIMA,
		t.SANCION_MULTA,
		t.SANCION_SUSPENCION,
		t.TIEMPO_VALIDEZ_SUSPENCION,
		t.SANCION_INHAB,
		t.TIEMPO_VALIDEZ_INHAB,
		t.PUNTOS,
		t.FEC_FIN_VIGENCIA,
		t.TIEMPO_VALIDEZ_PUNTOS,
		t.ID_TIPO_FALTA,
		t.ID_OBSERVACION_PUNTOS,
		t.ID_INFRACCION_NOMENCLADA,
		t.ID_TIPO_PAGO	
        , case when t.__CampoFechaBajaInexistente is null then 'SI' else 'NO' end activo
	 from REPAT.T_DETALLE_VIGENCIAINFRACCION t
     where 
	 	  (p_FEC_INICIO is null or t.FEC_INICIO = p_FEC_INICIO) and 
	(p_MULTA_UNIDAD_MINIMA is null or t.MULTA_UNIDAD_MINIMA = p_MULTA_UNIDAD_MINIMA) and 
	(p_MULTA_UNIDAD_MAXIMA is null or t.MULTA_UNIDAD_MAXIMA = p_MULTA_UNIDAD_MAXIMA) and 
	(p_SANCION_MULTA is null or t.SANCION_MULTA like  '%' ||p_SANCION_MULTA|| '%') and 
	(p_SANCION_SUSPENCION is null or t.SANCION_SUSPENCION like  '%' ||p_SANCION_SUSPENCION|| '%') and 
	(p_TIEMPO_VALIDEZ_SUSPENCION is null or t.TIEMPO_VALIDEZ_SUSPENCION = p_TIEMPO_VALIDEZ_SUSPENCION) and 
	(p_SANCION_INHAB is null or t.SANCION_INHAB like  '%' ||p_SANCION_INHAB|| '%') and 
	(p_TIEMPO_VALIDEZ_INHAB is null or t.TIEMPO_VALIDEZ_INHAB = p_TIEMPO_VALIDEZ_INHAB) and 
	(p_PUNTOS is null or t.PUNTOS = p_PUNTOS) and 
	(p_FEC_FIN_VIGENCIA is null or t.FEC_FIN_VIGENCIA = p_FEC_FIN_VIGENCIA) and 
	(p_TIEMPO_VALIDEZ_PUNTOS is null or t.TIEMPO_VALIDEZ_PUNTOS = p_TIEMPO_VALIDEZ_PUNTOS) and 
	(p_ID_TIPO_FALTA is null or t.ID_TIPO_FALTA = p_ID_TIPO_FALTA) and 
	(p_ID_OBSERVACION_PUNTOS is null or t.ID_OBSERVACION_PUNTOS = p_ID_OBSERVACION_PUNTOS) and 
	(p_ID_INFRACCION_NOMENCLADA is null or t.ID_INFRACCION_NOMENCLADA = p_ID_INFRACCION_NOMENCLADA) and 
	(p_ID_TIPO_PAGO is null or t.ID_TIPO_PAGO = p_ID_TIPO_PAGO)          and 1 = case when  p_activo is null  then 1
          when p_activo = 'SI' and  t.__CampoFechaBajaInexistente is null then 1
          when p_activo = 'NO' and not t.__CampoFechaBajaInexistente is null then 1
          else 0 end
    order by SANCION_MULTA
  -- <paginacion>
     ) pag where rownum <= v_registro_hasta) where rnum >= v_registro_desde;
  -- <paginacion>
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_DETALLE_VIGENCIAINFRACCION_s
(
	p_id in T_DETALLE_VIGENCIAINFRACCION.ID_DETALLE_VIGENCIA%type,
	p_cursor out SYS_REFCURSOR
)
as
begin
 open p_cursor for
   select  
		t.ID_DETALLE_VIGENCIA Id,
		t.FEC_INICIO,
		t.MULTA_UNIDAD_MINIMA,
		t.MULTA_UNIDAD_MAXIMA,
		t.SANCION_MULTA,
		t.SANCION_SUSPENCION,
		t.TIEMPO_VALIDEZ_SUSPENCION,
		t.SANCION_INHAB,
		t.TIEMPO_VALIDEZ_INHAB,
		t.PUNTOS,
		t.FEC_FIN_VIGENCIA,
		t.TIEMPO_VALIDEZ_PUNTOS,
		t.ID_TIPO_FALTA,
		t.ID_OBSERVACION_PUNTOS,
		t.ID_INFRACCION_NOMENCLADA,
		t.ID_TIPO_PAGO	
	    , case when t.__CampoFechaBajaInexistente is null then 'SI' else 'NO' end activo
	from REPAT.T_DETALLE_VIGENCIAINFRACCION t
	where
		t.ID_DETALLE_VIGENCIA = p_id;
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_DETALLE_VIGENCIAINFRACCION_g 
(
	p_ID_DETALLE_VIGENCIA in out T_DETALLE_VIGENCIAINFRACCION.ID_DETALLE_VIGENCIA%type,
	p_FEC_INICIO in T_DETALLE_VIGENCIAINFRACCION.FEC_INICIO%type,
	p_MULTA_UNIDAD_MINIMA in T_DETALLE_VIGENCIAINFRACCION.MULTA_UNIDAD_MINIMA%type,
	p_MULTA_UNIDAD_MAXIMA in T_DETALLE_VIGENCIAINFRACCION.MULTA_UNIDAD_MAXIMA%type,
	p_SANCION_MULTA in T_DETALLE_VIGENCIAINFRACCION.SANCION_MULTA%type,
	p_SANCION_SUSPENCION in T_DETALLE_VIGENCIAINFRACCION.SANCION_SUSPENCION%type,
	p_TIEMPO_VALIDEZ_SUSPENCION in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_SUSPENCION%type,
	p_SANCION_INHAB in T_DETALLE_VIGENCIAINFRACCION.SANCION_INHAB%type,
	p_TIEMPO_VALIDEZ_INHAB in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_INHAB%type,
	p_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.PUNTOS%type,
	p_FEC_FIN_VIGENCIA in T_DETALLE_VIGENCIAINFRACCION.FEC_FIN_VIGENCIA%type,
	p_TIEMPO_VALIDEZ_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.TIEMPO_VALIDEZ_PUNTOS%type,
	p_ID_TIPO_FALTA in T_DETALLE_VIGENCIAINFRACCION.ID_TIPO_FALTA%type,
	p_ID_OBSERVACION_PUNTOS in T_DETALLE_VIGENCIAINFRACCION.ID_OBSERVACION_PUNTOS%type,
	p_ID_INFRACCION_NOMENCLADA in T_DETALLE_VIGENCIAINFRACCION.ID_INFRACCION_NOMENCLADA%type,
	p_ID_TIPO_PAGO in T_DETALLE_VIGENCIAINFRACCION.ID_TIPO_PAGO%type 
)
as
begin
  if p_ID_DETALLE_VIGENCIA is null then 
        -- alta  (eliminar los campos que no se insertan; ej fec_baja)
		
		p_ID_DETALLE_VIGENCIA := REPAT.seq_DETALLE_VIGENCIAINFRACCION_id.nextval;
		insert into REPAT.T_DETALLE_VIGENCIAINFRACCION
		(
			ID_DETALLE_VIGENCIA,
		FEC_INICIO,
		MULTA_UNIDAD_MINIMA,
		MULTA_UNIDAD_MAXIMA,
		SANCION_MULTA,
		SANCION_SUSPENCION,
		TIEMPO_VALIDEZ_SUSPENCION,
		SANCION_INHAB,
		TIEMPO_VALIDEZ_INHAB,
		PUNTOS,
		FEC_FIN_VIGENCIA,
		TIEMPO_VALIDEZ_PUNTOS,
		ID_TIPO_FALTA,
		ID_OBSERVACION_PUNTOS,
		ID_INFRACCION_NOMENCLADA,
		ID_TIPO_PAGO	
		)
		values 
		(
			p_ID_DETALLE_VIGENCIA,
		p_FEC_INICIO,
		p_MULTA_UNIDAD_MINIMA,
		p_MULTA_UNIDAD_MAXIMA,
		p_SANCION_MULTA,
		p_SANCION_SUSPENCION,
		p_TIEMPO_VALIDEZ_SUSPENCION,
		p_SANCION_INHAB,
		p_TIEMPO_VALIDEZ_INHAB,
		p_PUNTOS,
		p_FEC_FIN_VIGENCIA,
		p_TIEMPO_VALIDEZ_PUNTOS,
		p_ID_TIPO_FALTA,
		p_ID_OBSERVACION_PUNTOS,
		p_ID_INFRACCION_NOMENCLADA,
		p_ID_TIPO_PAGO 
		);
	  else
      -- modificacion (eliminar los campos que no se actualizan; ej fec_baja)
       update REPAT.T_DETALLE_VIGENCIAINFRACCION t
		set
			FEC_INICIO = p_FEC_INICIO,
		MULTA_UNIDAD_MINIMA = p_MULTA_UNIDAD_MINIMA,
		MULTA_UNIDAD_MAXIMA = p_MULTA_UNIDAD_MAXIMA,
		SANCION_MULTA = p_SANCION_MULTA,
		SANCION_SUSPENCION = p_SANCION_SUSPENCION,
		TIEMPO_VALIDEZ_SUSPENCION = p_TIEMPO_VALIDEZ_SUSPENCION,
		SANCION_INHAB = p_SANCION_INHAB,
		TIEMPO_VALIDEZ_INHAB = p_TIEMPO_VALIDEZ_INHAB,
		PUNTOS = p_PUNTOS,
		FEC_FIN_VIGENCIA = p_FEC_FIN_VIGENCIA,
		TIEMPO_VALIDEZ_PUNTOS = p_TIEMPO_VALIDEZ_PUNTOS,
		ID_TIPO_FALTA = p_ID_TIPO_FALTA,
		ID_OBSERVACION_PUNTOS = p_ID_OBSERVACION_PUNTOS,
		ID_INFRACCION_NOMENCLADA = p_ID_INFRACCION_NOMENCLADA,
		ID_TIPO_PAGO = p_ID_TIPO_PAGO	
		where
			t.ID_DETALLE_VIGENCIA = p_id;

  end if;
  exception when others then
    repat.pr_error_msg(sqlerrm);
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_DETALLE_VIGENCIAINFRACCION_dl (
 p_id in T_DETALLE_VIGENCIAINFRACCION.ID_DETALLE_VIGENCIA%type,
 p_activo_nuevo in varchar2  
 )
as

begin
  
  update REPAT.T_DETALLE_VIGENCIAINFRACCION t set t.__CampoFechaBajaInexistente = case when p_activo_nuevo ='SI' then null else sysdate end
       where
		t.ID_DETALLE_VIGENCIA = p_id;
  -- auditoria?
end;


