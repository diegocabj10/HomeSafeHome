
/******************************************************************************
    Procedimientos para la tabla  SEG_CIU.T_HECHOS_DELICTUOSO
	segun modelo de ABMC simples
	Generado: 13/06/2017	  20362571201
******************************************************************************/
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure pr_HECHOS_DELICTUOSO_set
(
    p_cursor out sys_refcursor
)
as
begin

    open p_cursor for
    select t.ID_HECHOS_DELICTUOSOS Id, t.ID_DEPARTAMENTO Nombre 
	from SEG_CIU.T_HECHOS_DELICTUOSO t
	order by ID_DEPARTAMENTO;
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure pr_HECHOS_DELICTUOSO_sf(
	p_ID_DEPARTAMENTO in T_HECHOS_DELICTUOSO.ID_DEPARTAMENTO%type,
	p_ID_LOCALIDAD in T_HECHOS_DELICTUOSO.ID_LOCALIDAD%type,
	p_ID_SECCIONAL in T_HECHOS_DELICTUOSO.ID_SECCIONAL%type,
	p_PERIODO in T_HECHOS_DELICTUOSO.PERIODO%type,
	p_DENUNCIA_PARTICULAR in T_HECHOS_DELICTUOSO.DENUNCIA_PARTICULAR%type,
	p_INTERVENCION_POLICIAL in T_HECHOS_DELICTUOSO.INTERVENCION_POLICIAL%type,
	p_ORDEN_JUDICIAL in T_HECHOS_DELICTUOSO.ORDEN_JUDICIAL%type,
	p_MOTIVO_NO_CONSTA in T_HECHOS_DELICTUOSO.MOTIVO_NO_CONSTA%type,
	p_INCULPADO_MASCULINO in T_HECHOS_DELICTUOSO.INCULPADO_MASCULINO%type,
	p_INCULPADO_FEMENINO in T_HECHOS_DELICTUOSO.INCULPADO_FEMENINO%type,
	p_INCULPADO_NO_CONSTA in T_HECHOS_DELICTUOSO.INCULPADO_NO_CONSTA%type,
	p_ID_TIPO_DELITO_HD in T_HECHOS_DELICTUOSO.ID_TIPO_DELITO_HD%type,
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
    from SEG_CIU.T_HECHOS_DELICTUOSO t
    where 
		(p_ID_DEPARTAMENTO is null or t.ID_DEPARTAMENTO = p_ID_DEPARTAMENTO) and 
	(p_ID_LOCALIDAD is null or t.ID_LOCALIDAD = p_ID_LOCALIDAD) and 
	(p_ID_SECCIONAL is null or t.ID_SECCIONAL = p_ID_SECCIONAL) and 
	(p_PERIODO is null or t.PERIODO = p_PERIODO) and 
	(p_DENUNCIA_PARTICULAR is null or t.DENUNCIA_PARTICULAR = p_DENUNCIA_PARTICULAR) and 
	(p_INTERVENCION_POLICIAL is null or t.INTERVENCION_POLICIAL = p_INTERVENCION_POLICIAL) and 
	(p_ORDEN_JUDICIAL is null or t.ORDEN_JUDICIAL = p_ORDEN_JUDICIAL) and 
	(p_MOTIVO_NO_CONSTA is null or t.MOTIVO_NO_CONSTA = p_MOTIVO_NO_CONSTA) and 
	(p_INCULPADO_MASCULINO is null or t.INCULPADO_MASCULINO = p_INCULPADO_MASCULINO) and 
	(p_INCULPADO_FEMENINO is null or t.INCULPADO_FEMENINO = p_INCULPADO_FEMENINO) and 
	(p_INCULPADO_NO_CONSTA is null or t.INCULPADO_NO_CONSTA = p_INCULPADO_NO_CONSTA) and 
	(p_ID_TIPO_DELITO_HD is null or t.ID_TIPO_DELITO_HD = p_ID_TIPO_DELITO_HD)        and 1 = case when  p_activo is null  then 1
             when p_activo = 'SI' and  t.FECHA_BAJA is null then 1
             when p_activo = 'NO' and not t.FECHA_BAJA is null then 1
             else 0 end;
    
    
    open p_cursor for
  -- <paginacion>
     select * from (select pag.*, rownum rnum from (
  -- <paginacion>
     select
		t.ID_HECHOS_DELICTUOSOS Id,
		t.ID_DEPARTAMENTO,
		t.ID_LOCALIDAD,
		t.ID_SECCIONAL,
		t.PERIODO,
		t.DENUNCIA_PARTICULAR,
		t.INTERVENCION_POLICIAL,
		t.ORDEN_JUDICIAL,
		t.MOTIVO_NO_CONSTA,
		t.INCULPADO_MASCULINO,
		t.INCULPADO_FEMENINO,
		t.INCULPADO_NO_CONSTA,
		t.ID_TIPO_DELITO_HD,
		t.FECHA_BAJA FechaBaja	
        , case when t.FECHA_BAJA is null then 'SI' else 'NO' end activo
	 from SEG_CIU.T_HECHOS_DELICTUOSO t
     where 
	 	  (p_ID_DEPARTAMENTO is null or t.ID_DEPARTAMENTO = p_ID_DEPARTAMENTO) and 
	(p_ID_LOCALIDAD is null or t.ID_LOCALIDAD = p_ID_LOCALIDAD) and 
	(p_ID_SECCIONAL is null or t.ID_SECCIONAL = p_ID_SECCIONAL) and 
	(p_PERIODO is null or t.PERIODO = p_PERIODO) and 
	(p_DENUNCIA_PARTICULAR is null or t.DENUNCIA_PARTICULAR = p_DENUNCIA_PARTICULAR) and 
	(p_INTERVENCION_POLICIAL is null or t.INTERVENCION_POLICIAL = p_INTERVENCION_POLICIAL) and 
	(p_ORDEN_JUDICIAL is null or t.ORDEN_JUDICIAL = p_ORDEN_JUDICIAL) and 
	(p_MOTIVO_NO_CONSTA is null or t.MOTIVO_NO_CONSTA = p_MOTIVO_NO_CONSTA) and 
	(p_INCULPADO_MASCULINO is null or t.INCULPADO_MASCULINO = p_INCULPADO_MASCULINO) and 
	(p_INCULPADO_FEMENINO is null or t.INCULPADO_FEMENINO = p_INCULPADO_FEMENINO) and 
	(p_INCULPADO_NO_CONSTA is null or t.INCULPADO_NO_CONSTA = p_INCULPADO_NO_CONSTA) and 
	(p_ID_TIPO_DELITO_HD is null or t.ID_TIPO_DELITO_HD = p_ID_TIPO_DELITO_HD)          and 1 = case when  p_activo is null  then 1
          when p_activo = 'SI' and  t.FECHA_BAJA is null then 1
          when p_activo = 'NO' and not t.FECHA_BAJA is null then 1
          else 0 end
    order by ID_DEPARTAMENTO
  -- <paginacion>
     ) pag where rownum <= v_registro_hasta) where rnum >= v_registro_desde;
  -- <paginacion>
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure pr_HECHOS_DELICTUOSO_s
(
	p_id in T_HECHOS_DELICTUOSO.ID_HECHOS_DELICTUOSOS%type,
	p_cursor out SYS_REFCURSOR
)
as
begin
 open p_cursor for
   select  
		t.ID_HECHOS_DELICTUOSOS Id,
		t.ID_DEPARTAMENTO,
		t.ID_LOCALIDAD,
		t.ID_SECCIONAL,
		t.PERIODO,
		t.DENUNCIA_PARTICULAR,
		t.INTERVENCION_POLICIAL,
		t.ORDEN_JUDICIAL,
		t.MOTIVO_NO_CONSTA,
		t.INCULPADO_MASCULINO,
		t.INCULPADO_FEMENINO,
		t.INCULPADO_NO_CONSTA,
		t.ID_TIPO_DELITO_HD,
		t.FECHA_BAJA FechaBaja	
	    , case when t.FECHA_BAJA is null then 'SI' else 'NO' end activo
	from SEG_CIU.T_HECHOS_DELICTUOSO t
	where
		t.ID_HECHOS_DELICTUOSOS = p_id;
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure pr_HECHOS_DELICTUOSO_g 
(
	p_id in out T_HECHOS_DELICTUOSO.ID_HECHOS_DELICTUOSOS%type,
	p_ID_DEPARTAMENTO in T_HECHOS_DELICTUOSO.ID_DEPARTAMENTO%type,
	p_ID_LOCALIDAD in T_HECHOS_DELICTUOSO.ID_LOCALIDAD%type,
	p_ID_SECCIONAL in T_HECHOS_DELICTUOSO.ID_SECCIONAL%type,
	p_PERIODO in T_HECHOS_DELICTUOSO.PERIODO%type,
	p_DENUNCIA_PARTICULAR in T_HECHOS_DELICTUOSO.DENUNCIA_PARTICULAR%type,
	p_INTERVENCION_POLICIAL in T_HECHOS_DELICTUOSO.INTERVENCION_POLICIAL%type,
	p_ORDEN_JUDICIAL in T_HECHOS_DELICTUOSO.ORDEN_JUDICIAL%type,
	p_MOTIVO_NO_CONSTA in T_HECHOS_DELICTUOSO.MOTIVO_NO_CONSTA%type,
	p_INCULPADO_MASCULINO in T_HECHOS_DELICTUOSO.INCULPADO_MASCULINO%type,
	p_INCULPADO_FEMENINO in T_HECHOS_DELICTUOSO.INCULPADO_FEMENINO%type,
	p_INCULPADO_NO_CONSTA in T_HECHOS_DELICTUOSO.INCULPADO_NO_CONSTA%type,
	p_ID_TIPO_DELITO_HD in T_HECHOS_DELICTUOSO.ID_TIPO_DELITO_HD%type 
)
as
begin
  if p_id is null then 
        -- alta  (eliminar los campos que no se insertan; ej fec_baja)
		
		p_id := SEG_CIU.seq_HECHOS_DELICTUOSO_id.nextval;
		insert into SEG_CIU.T_HECHOS_DELICTUOSO
		(
			ID_HECHOS_DELICTUOSOS,
		ID_DEPARTAMENTO,
		ID_LOCALIDAD,
		ID_SECCIONAL,
		PERIODO,
		DENUNCIA_PARTICULAR,
		INTERVENCION_POLICIAL,
		ORDEN_JUDICIAL,
		MOTIVO_NO_CONSTA,
		INCULPADO_MASCULINO,
		INCULPADO_FEMENINO,
		INCULPADO_NO_CONSTA,
		ID_TIPO_DELITO_HD	
			)
			values 
			(
				p_id,
			p_ID_DEPARTAMENTO,
			p_ID_LOCALIDAD,
			p_ID_SECCIONAL,
			p_PERIODO,
			p_DENUNCIA_PARTICULAR,
			p_INTERVENCION_POLICIAL,
			p_ORDEN_JUDICIAL,
			p_MOTIVO_NO_CONSTA,
			p_INCULPADO_MASCULINO,
			p_INCULPADO_FEMENINO,
			p_INCULPADO_NO_CONSTA,
			p_ID_TIPO_DELITO_HD 
			);
		  else
	      -- modificacion (eliminar los campos que no se actualizan; ej fec_baja)
	       update SEG_CIU.T_HECHOS_DELICTUOSO t
			set
				ID_DEPARTAMENTO = p_ID_DEPARTAMENTO,
			ID_LOCALIDAD = p_ID_LOCALIDAD,
			ID_SECCIONAL = p_ID_SECCIONAL,
			PERIODO = p_PERIODO,
			DENUNCIA_PARTICULAR = p_DENUNCIA_PARTICULAR,
			INTERVENCION_POLICIAL = p_INTERVENCION_POLICIAL,
			ORDEN_JUDICIAL = p_ORDEN_JUDICIAL,
			MOTIVO_NO_CONSTA = p_MOTIVO_NO_CONSTA,
			INCULPADO_MASCULINO = p_INCULPADO_MASCULINO,
			INCULPADO_FEMENINO = p_INCULPADO_FEMENINO,
			INCULPADO_NO_CONSTA = p_INCULPADO_NO_CONSTA,
			ID_TIPO_DELITO_HD = p_ID_TIPO_DELITO_HD	
			where
				t.ID_HECHOS_DELICTUOSOS = p_id;
	
	  end if;
	  exception when others then
	    seg_ciu.pr_error_msg(sqlerrm);
	end;
	------------------------------------------------------------
	------------------------------------------------------------
	create or replace procedure pr_HECHOS_DELICTUOSO_dl (
	 p_id in T_HECHOS_DELICTUOSO.ID_HECHOS_DELICTUOSOS%type,
	 p_activo_nuevo in varchar2  
	 )
	as
	
	begin
	  
	  update SEG_CIU.T_HECHOS_DELICTUOSO t set t.FECHA_BAJA = case when p_activo_nuevo ='SI' then null else sysdate end
	       where
			t.ID_HECHOS_DELICTUOSOS = p_id;
	  -- auditoria?
	end;
	
	
	------------------------------------------------------------
	------------------------------------------------------------
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Text;
	
	namespace Dto
	{
	    public class DtoHECHOS_DELICTUOSO: DtoAbmBase
	    {
	        public string Nombre { get; set; }
	
	    }
	}
	
	
	
	
