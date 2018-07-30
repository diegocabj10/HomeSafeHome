CREATE OR REPLACE PACKAGE BODY pkg_eventos IS

  CREATE OR REPLACE PROCEDURE pr_eventos_dl(p_id in t_evento.id_evento%TYPE,
                                            p_activo_nuevo IN VARCHAR2) AS
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
  END pr_eventos_dl;

  CREATE OR REPLACE PROCEDURE pr_eventos_g(p_id          IN OUT t_evento.id_evento%TYPE,
                                           p_valor      IN t_evento.valor%TYPE,
                                           p_id_dispositivo IN t_evento.id_dispositivo%TYPE,
                                           p_id_senial  IN t_evento.id_senial%TYPE,
                                           p_id_Procesos IN pkg_array.inttabletype) IS
      ex_empty_array EXCEPTION;
    BEGIN

      IF p_id IS NULL THEN  -- alta
        p_id := seq_evento.nextval;
        INSERT INTO t_perfil (id_evento, fecha, valor, id_dispositivo, id_senial) 
               VALUES (p_id, SYSDATE, p_valor, p_id_dispositivo, p_id_senial);
      ELSE  -- modificacion
        UPDATE t_eventos e
        SET    e.valor = p_valor,
               e.id_dispositivo = p_id_dispositivo,
               e.id_senial = p_id_senial
        WHERE  e.id_evento = p_id;
      END IF;

    EXCEPTION
      WHEN OTHERS THEN
        RAISE;
    END;
  END pr_eventos_g;

  CREATE OR REPLACE PROCEDURE pr_eventos_s(p_id             IN t_eventos.id_evento%TYPE,
                                           p_id_senial      OUT pkg_array.inttabletype,
                                           p_id_dispositivo OUT pkg_array.inttabletype,
                                           p_cursor         OUT SYS_REFCURSOR) AS
  BEGIN

    SELECT e.id_senial BULK COLLECT
      INTO p_id_senial
      FROM t_eventos e
     WHERE e.id_evento = p_id;

    SELECT e.id_dispositivo BULK COLLECT
      INTO p_id_dispositivo
      FROM t_eventos e
     WHERE e.id_evento = p_id;

    OPEN p_cursor FOR
      SELECT e.id_evento id,
             e.id_senial idSenial,
             e.id_dispositivo idDispositivo,
             e.fec_baja fechabaja,
             CASE
               WHEN e.fec_baja IS NULL THEN
                'SI'
               ELSE
                'NO'
             END activo
        FROM t_eventos e
       WHERE p.id_evento = p_id;

  EXCEPTION
    WHEN OTHERS THEN
      RAISE;
  END pr_eventos_s;
  
  CREATE OR REPLACE PROCEDURE pr_eventos_sf(p_id_dispositivo        IN t_eventos.id_dispositivo%TYPE,
                                            p_id_senial             IN t_eventos.id_senial%TYPE,
                                            p_activo                IN OUT VARCHAR2,
                                            p_numeropaginalistado   IN NUMBER,
                                            p_totalregistroslistado OUT NUMBER,
                                            p_cursor                OUT SYS_REFCURSOR) AS
  v_registro_desde number(10) := (p_numeropaginalistado * 10) - 9;
  v_registro_hasta number(10) := v_registro_desde + 9;
  v_sql_count      VARCHAR2(4000);
  v_sql_datos      VARCHAR2(4000);
  v_with           varchar2(2000) := 'WITH param as (SELECT :p1 p_id_dispositivo, :p2 p_id_senial, p3: p_activo FROM dual) ';
  v_where          VARCHAR2(2000);
BEGIN
  -- contar resultados para el paginado

  v_sql_count := v_with || 'SELECT COUNT(*) FROM t_eventos e';

  IF p_id_dispositivo <> 0 THEN
    v_where := v_where || ' AND e.p_id_dispositivo = ' || p_id_dispositivo;
  END IF;
  
  IF p_id_senial <> 0 THEN
    v_where := v_where || ' AND e.p_id_senial = ' || p_id_senial;
  END IF;

  IF p_activo = 'SI' THEN
    v_where := v_where || ' AND p.fec_baja IS NULL ';
  END IF;
  IF p_activo = 'NO' THEN
    v_where := v_where || ' AND p.fec_baja IS NOT NULL ';
  END IF;

  IF (v_where IS NOT NULL) THEN
    v_where     := substr(v_where, 5);
    v_where     := ', param where ' || v_where;
    v_sql_count := v_sql_count || v_where;
  END IF;

  EXECUTE IMMEDIATE v_sql_count
    INTO p_totalregistroslistado
    USING p_id_dispositivo, p_id_senial, p_activo;

  v_sql_datos := v_with || 'SELECT e.id_evento Id,
        e.fecha fecha,
        e.valor valor,
        e.id_dispositivo idDispositivo,
        e.id_senial idSenial,
        e.fecha_baja fechaBaja,
        CASE
           WHEN e.fecha_baja IS NULL THEN
            '' SI ''
           ELSE
            '' NO ''
         END activo
         FROM (SELECT a.*,rownum rnum FROM ' ||
                 '(SELECT ev.* FROM t_eventos ev' || v_where || ' )a ' ||
                 'WHERE rownum <= ' || v_registro_hasta ||
                 ') c WHERE rnum >= ' || v_registro_desde ||
                 ' ORDER BY c.fecha desc';

  OPEN p_cursor FOR v_sql_datos
    USING p_id_dispositivo, p_id_senial, p_activo;

EXCEPTION
  WHEN OTHERS THEN
    RAISE;
END pr_eventos_sf;

  CREATE OR REPLACE PROCEDURE pr_eventos_set(p_cursor_senial OUT SYS_REFCURSOR,
                                             p_cursor_dispositivo OUT SYS_REFCURSOR) AS
    pkg_dispositivos.pr_eventos_set(p_cursor_senial);
    pkg_dispositivos.pr_dispositivos_set(p_cursor_dispositivo);
    /*OPEN p_cursor_senial FOR
        SELECT s.id_senial id, s.descripcion descripcion
        FROM   t_seniales s
        WHERE  s.fecha_baja IS NULL
        ORDER  BY s.descripcion;OPEN p_cursor_senial FOR
        SELECT d.id_dispositivo id, d.descripcion descripcion
        FROM   t_dispositivos d
        WHERE  d.fecha_baja IS NULL
        ORDER  BY d.descripcion;*/
    EXCEPTION
      WHEN OTHERS THEN
        RAISE;               
  END pr_eventos_set;                                  

END pkg_eventos;
