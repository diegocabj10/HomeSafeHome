CREATE OR REPLACE PACKAGE BODY pkg_seniales IS

  CREATE OR REPLACE PROCEDURE pr_seniales_dl(p_id in t_senial.id_senial%TYPE,
                                                 p_activo_nuevo IN VARCHAR2) AS
    BEGIN
      UPDATE t_seniales d
         SET d.fecha_baja = CASE
                              WHEN p_activo_nuevo = 'SI' THEN
                               NULL
                              ELSE
                               SYSDATE
                            END
       WHERE e.id_senial = p_id;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
  END pr_seniales_dl;

  CREATE OR REPLACE PROCEDURE pr_seniales_g(p_id IN OUT t_seniales.id_senial%TYPE,
                                            p_descripcion IN t_seniales.descripcion%TYPE) AS
    BEGIN

      IF p_id IS NULL THEN  -- alta
        p_id := seq_senial.nextval;
        INSERT INTO t_perfil (id_senial, descripcion) 
               VALUES (p_id, p_descripcion);
      ELSE  -- modificacion
        UPDATE t_seniales s
        SET    s.descripcion = p_descripcion
        WHERE  s.id_senial = p_id;
      END IF;

    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
    END;
  END pr_seniales_g;

  CREATE OR REPLACE PROCEDURE pr_seniales_s(p_id IN t_seniales.id_senial%TYPE,
                                            p_cursor OUT SYS_REFCURSOR) AS
  BEGIN
    
    OPEN p_cursor FOR
      SELECT s.id_senial id,
             s.descripcion descripcion,
             CASE
               WHEN s.fecha_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_seniales s
       WHERE p.id_senial = p_id;

  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_seniales_s;
  
  CREATE OR REPLACE PROCEDURE pr_seniales_sf(p_activo IN OUT VARCHAR2,
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

      v_sql_count := v_with || 'SELECT COUNT(*) FROM t_seniales s';

      IF p_activo = 'SI' THEN
        v_where := v_where || ' AND s.fec_baja IS NULL ';
      END IF;
      IF p_activo = 'NO' THEN
        v_where := v_where || ' AND s.fec_baja IS NOT NULL ';
      END IF;

      IF (v_where IS NOT NULL) THEN
        v_where     := substr(v_where, 5);
        v_where     := ', param where ' || v_where;
        v_sql_count := v_sql_count || v_where;
      END IF;

      EXECUTE IMMEDIATE v_sql_count
        INTO p_totalregistroslistado
        USING p_activo;

      v_sql_datos := v_with || 'SELECT s.id_senial Id,
            s.descripcion descripcion,
            s.fecha_baja fechaBaja,
            CASE
               WHEN s.fecha_baja IS NULL THEN
                '' SI ''
               ELSE
                '' NO ''
             END activo
             FROM (SELECT a.*,rownum rnum FROM ' ||
                     '(SELECT se.* FROM t_seniales se' || v_where || ' )a ' ||
                     'WHERE rownum <= ' || v_registro_hasta ||
                     ') c WHERE rownum >= ' || v_registro_desde ||
                     ' ORDER BY c.descripcion';

      OPEN p_cursor FOR v_sql_datos
        USING p_activo;

    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
    END pr_seniales_sf;
    
  CREATE OR REPLACE PROCEDURE pr_seniales_set(p_cursor_senial OUT SYS_REFCURSOR) AS
  
    OPEN p_cursor_senial FOR
        SELECT s.id_senial id, s.descripcion descripcion
        FROM   t_seniales s
        WHERE  s.fecha_baja IS NULL
        ORDER  BY s.descripcion;        
    EXCEPTION
      WHEN OTHERS THEN
        RAISE;               
  END pr_seniales_set;                                  

END pkg_seniales;
