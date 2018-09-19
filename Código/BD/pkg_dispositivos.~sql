CREATE OR REPLACE PACKAGE pkg_dispositivos IS

  CREATE OR REPLACE PROCEDURE pr_dispositivos_dl(p_id IN t_dispositivos.id_dispositivo%TYPE,
                                                 p_activo_nuevo IN VARCHAR2);

  CREATE OR REPLACE PROCEDURE pr_dispositivos_g(p_id IN OUT t_dispositivos.id_dispositivo%TYPE,
                                                p_descripcion IN t_dispositivos.valor%TYPE);

  CREATE OR REPLACE PROCEDURE pr_dispositivos_s(p_id IN t_dispositivos.id_dispositivo%TYPE,
                                                p_cursor OUT SYS_REFCURSOR);

  CREATE OR REPLACE PROCEDURE pr_dispositivos_sf(p_activo IN OUT VARCHAR2,
                                                 p_numeropaginalistado IN NUMBER,
                                                 p_totalregistroslistado OUT NUMBER,
                                                 p_cursor OUT SYS_REFCURSOR);

  CREATE OR REPLACE PROCEDURE pr_dispositivos_set(p_cursor_dispositivo OUT SYS_REFCURSOR);

END pkg_dispositivos;
