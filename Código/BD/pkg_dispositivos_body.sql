CREATE OR REPLACE PACKAGE BODY pkg_dispositivos IS

  CREATE OR REPLACE PROCEDURE pr_dispositivos_dl(p_id in t_dispositivo.id_dispositivo%TYPE,
                                                 p_activo_nuevo IN VARCHAR2) AS
    BEGIN
      UPDATE t_dispositivos d
         SET d.fecha_baja = CASE
                              WHEN p_activo_nuevo = 'SI' THEN
                               NULL
                              ELSE
                               SYSDATE
                            END
       WHERE e.id_dispositivo = p_id;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
  END pr_dispositivos_dl;

  CREATE OR REPLACE PROCEDURE pr_dispositivos_g(p_id IN OUT t_dispositivos.id_dispositivo%TYPE,
                                                p_descripcion IN t_dispositivos.descripcion%TYPE) AS
    BEGIN

      IF p_id IS NULL THEN  -- alta
        p_id := seq_dispositivo.nextval;
        INSERT INTO t_perfil (id_dispositivo, descripcion) 
               VALUES (p_id, p_descripcion);
      ELSE  -- modificacion
        UPDATE t_dispositivos e
        SET    e.descripcion = p_descripcion
        WHERE  e.id_dispositivo = p_id;
      END IF;

    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
    END;
  END pr_dispositivos_g;

  CREATE OR REPLACE PROCEDURE pr_dispositivos_s(p_id IN t_dispositivos.id_dispositivo%TYPE,
                                                p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    
    OPEN p_cursor FOR
      SELECT e.id_dispositivo id,
             e.descripcion descripcion,
             CASE
               WHEN e.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_dispositivos e
       WHERE p.id_dispositivo = p_id;

  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_dispositivos_s;
  
  CREATE OR REPLACE PROCEDURE pr_dispositivos_sf(p_activo IN OUT VARCHAR2,
                                                 p_numeropaginalistado IN NUMBER,
                                                 p_totalregistroslistado OUT NUMBER,
                                                 p_cursor OUT SYS_REFCURSOR) AS
      v_registro_desde number(10) := (p_numeropaginalistado * 10) - 9;
      v_registro_hasta number(10) := v_registro_desde + 9;
      v_sql_count      VARCHAR2(4000);
      v_sql_datos      VARCHAR2(4000);
      v_with           varchar2(2000) := 'WITH param as (SELECT :p1 p_activo FROM dual) ';
      v_where          VARCHAR2(2000);
    BEGIN
      -- contar resultados para el paginado

      v_sql_count := v_with || 'SELECT COUNT(*) FROM t_dispositivos d';

      IF p_activo = 'SI' THEN
        v_where := v_where || ' AND d.fec_baja IS NULL ';
      END IF;
      IF p_activo = 'NO' THEN
        v_where := v_where || ' AND d.fec_baja IS NOT NULL ';
      END IF;

      IF (v_where IS NOT NULL) THEN
        v_where     := substr(v_where, 5);
        v_where     := ', param where ' || v_where;
        v_sql_count := v_sql_count || v_where;
      END IF;

      EXECUTE IMMEDIATE v_sql_count
        INTO p_totalregistroslistado
        USING p_activo;

      v_sql_datos := v_with || 'SELECT d.id_dispositivo Id,
            d.descripcion descripcion,
            d.fecha_baja fechaBaja,
            CASE
               WHEN d.fecha_baja IS NULL THEN
                '' SI ''
               ELSE
                '' NO ''
             END activo
             FROM (SELECT a.*,rownum rnum FROM ' ||
                     '(SELECT di.* FROM t_dispositivos di' || v_where || ' )a ' ||
                     'WHERE rownum <= ' || v_registro_hasta ||
                     ') c WHERE rownum >= ' || v_registro_desde ||
                     ' ORDER BY c.descripcion';

      OPEN p_cursor FOR v_sql_datos
        USING p_activo;

    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
    END pr_dispositivos_sf;

  CREATE OR REPLACE PROCEDURE pr_dispositivos_set(p_cursor_senial OUT SYS_REFCURSOR) AS
    OPEN p_cursor_dispositivo FOR
        SELECT d.id_dispositivo id, d.descripcion descripcion
        FROM   t_dispositivos d
        WHERE  d.fecha_baja IS NULL
        ORDER  BY d.descripcion;
        
    EXCEPTION
      WHEN OTHERS THEN
        RAISE;               
  END pr_dispositivos_set;                                  

END pkg_dispositivos;
