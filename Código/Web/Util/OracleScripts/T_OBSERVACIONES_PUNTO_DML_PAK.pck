
/******************************************************************************
    Procedimientos para la tabla  REPAT.T_OBSERVACIONES_PUNTO
	segun modelo de ABMC simples
	Generado: 10/11/2016	  20218230149
******************************************************************************/
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_OBSERVACIONES_PUNTO_set
(
    oREFCURSOR out sys_refcursor
)
as
begin

    open oREFCURSOR for
    select t.ID_OBSERVACION_PUNTOS Id, t.CODIGO Nombre 
	from REPAT.T_OBSERVACIONES_PUNTO t
	order by CODIGO;
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_OBSERVACIONES_PUNTO_sf(
	iCODIGO in T_OBSERVACIONES_PUNTO.CODIGO%type,
	iN_OBSERVACION_PUNTO in T_OBSERVACIONES_PUNTO.N_OBSERVACION_PUNTO%type,
    p_activo in out varchar2,
    p_registro_desde  in number,
    p_registro_hasta in number,
    p_registros_total out number,
    oREFCURSOR out sys_refcursor)
as
begin

-- contar resultados
  select count(*)
    into p_registros_total
    from REPAT.T_OBSERVACIONES_PUNTO t
    where 
		(iCODIGO is null or t.CODIGO like  '%' ||iCODIGO|| '%') and 
	(iN_OBSERVACION_PUNTO is null or t.N_OBSERVACION_PUNTO like  '%' ||iN_OBSERVACION_PUNTO|| '%')        and 1 = case when  p_activo is null  then 1
             when p_activo = 'SI' and  t.FEC_BAJA is null then 1
             when p_activo = 'NO' and not t.FEC_BAJA is null then 1
             else 0 end;
    
    
    open oREFCURSOR for
  -- <paginacion>
     select * from (select pag.*, rownum rnum from (
  -- <paginacion>
     select
		t.ID_OBSERVACION_PUNTOS Id,
		t.CODIGO,
		t.N_OBSERVACION_PUNTO Nombre,
		t.FEC_BAJA FechaBaja	
        , case when t.FEC_BAJA is null then 'SI' else 'NO' end activo
	 from REPAT.T_OBSERVACIONES_PUNTO t
     where 
	 	  (iCODIGO is null or t.CODIGO like  '%' ||iCODIGO|| '%') and 
	(iN_OBSERVACION_PUNTO is null or t.N_OBSERVACION_PUNTO like  '%' ||iN_OBSERVACION_PUNTO|| '%')          and 1 = case when  p_activo is null  then 1
          when p_activo = 'SI' and  t.FEC_BAJA is null then 1
          when p_activo = 'NO' and not t.FEC_BAJA is null then 1
          else 0 end
    order by CODIGO
  -- <paginacion>
     ) pag where rownum <= p_registro_hasta) where rnum >= p_registro_desde;
  -- <paginacion>
    
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_OBSERVACIONES_PUNTO_s
(
	iID_OBSERVACION_PUNTOS in T_OBSERVACIONES_PUNTO.ID_OBSERVACION_PUNTOS%type,
	oREFCURSOR out SYS_REFCURSOR
)
as
begin
 open oREFCURSOR for
   select  
		t.ID_OBSERVACION_PUNTOS Id,
		t.CODIGO,
		t.N_OBSERVACION_PUNTO Nombre,
		t.FEC_BAJA FechaBaja	
	    , case when t.FEC_BAJA is null then 'SI' else 'NO' end activo
	from REPAT.T_OBSERVACIONES_PUNTO t
	where
		t.ID_OBSERVACION_PUNTOS = iID_OBSERVACION_PUNTOS;
end;
------------------------------------------------------------
------------------------------------------------------------
create or replace procedure prn_OBSERVACIONES_PUNTO_g 
(
	iID_OBSERVACION_PUNTOS in out T_OBSERVACIONES_PUNTO.ID_OBSERVACION_PUNTOS%type,
	iCODIGO in T_OBSERVACIONES_PUNTO.CODIGO%type,
	iN_OBSERVACION_PUNTO in T_OBSERVACIONES_PUNTO.N_OBSERVACION_PUNTO%type 
)
as
begin
  if iID_OBSERVACION_PUNTOS is null then 
        -- alta  (eliminar los campos que no se insertan; ej fec_baja)
		
		iID_OBSERVACION_PUNTOS := REPAT.seq_OBSERVACIONES_PUNTO_id.nextval;
		insert into REPAT.T_OBSERVACIONES_PUNTO
		(
			ID_OBSERVACION_PUNTOS,
		CODIGO,
		N_OBSERVACION_PUNTO	
			)
			values 
			(
				iID_OBSERVACION_PUNTOS,
			iCODIGO,
			iN_OBSERVACION_PUNTO 
			);
		  else
	      -- modificacion (eliminar los campos que no se actualizan; ej fec_baja)
	       update REPAT.T_OBSERVACIONES_PUNTO t
			set
				CODIGO = iCODIGO,
			N_OBSERVACION_PUNTO = iN_OBSERVACION_PUNTO	
			where
				t.ID_OBSERVACION_PUNTOS = iID_OBSERVACION_PUNTOS;
	
	  end if;
	  exception when others then
	    repat.pr_error_msg(sqlerrm);
	end;
	------------------------------------------------------------
	------------------------------------------------------------
	create or replace procedure prn_OBSERVACIONES_PUNTO_dl (
	 iID_OBSERVACION_PUNTOS in T_OBSERVACIONES_PUNTO.ID_OBSERVACION_PUNTOS%type,
	 p_activo_nuevo in varchar2  
	 )
	as
	
	begin
	  
	  update REPAT.T_OBSERVACIONES_PUNTO t set t.FEC_BAJA = case when p_activo_nuevo ='SI' then null else sysdate end
	       where
			t.ID_OBSERVACION_PUNTOS = iID_OBSERVACION_PUNTOS;
	  -- auditoria?
	end;
	
	
