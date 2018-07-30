CREATE OR REPLACE PACKAGE pkg_eventos IS

  CREATE OR REPLACE PROCEDURE pr_eventos_dl(p_id IN t_eventos.id_evento%TYPE,
                                            p_activo_nuevo IN VARCHAR2);

  CREATE OR REPLACE PROCEDURE pr_eventos_g(p_id IN OUT t_eventos.id_evento%TYPE,
                                           p_valor IN t_eventos.valor%TYPE,
                                           p_id_dispositivo IN t_eventos.id_dispositivo%TYPE,
                                           p_id_senial IN t_eventos.id_senial%TYPE);

  CREATE OR REPLACE PROCEDURE pr_eventos_s(p_id IN t_eventos.id_evento%TYPE,
                                           p_id_senial OUT pkg_array.inttabletype,
                                           p_id_dispositivo OUT pkg_array.inttabletype,
                                           p_cursor OUT SYS_REFCURSOR);

  CREATE OR REPLACE PROCEDURE pr_eventos_sf(p_id_dispositivo IN t_eventos.id_dispositivo%TYPE,
                                            p_id_senial IN t_eventos.id_senial%TYPE,
                                            p_activo IN OUT VARCHAR2,
                                            p_numeropaginalistado IN NUMBER,
                                            p_totalregistroslistado OUT NUMBER,
                                            p_cursor OUT SYS_REFCURSOR);
                                            
  CREATE OR REPLACE PROCEDURE pr_eventos_set(p_cursor_senial OUT SYS_REFCURSOR,
                                             p_cursor_dispositivo OUT SYS_REFCURSOR);
                                           
END pkg_eventos;
