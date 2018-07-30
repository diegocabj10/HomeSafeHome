CREATE OR REPLACE PACKAGE pkg_seniales IS

  CREATE OR REPLACE PROCEDURE pr_seniales_dl(p_id IN t_seniales.id_senial%TYPE,
                                             p_activo_nuevo IN VARCHAR2);

  CREATE OR REPLACE PROCEDURE pr_seniales_g(p_id IN OUT t_seniales.id_senial%TYPE,
                                            p_descripcion IN t_seniales.valor%TYPE);

  CREATE OR REPLACE PROCEDURE pr_seniales_s(p_id IN t_seniales.id_senial%TYPE,
                                            p_cursor OUT SYS_REFCURSOR);

  CREATE OR REPLACE PROCEDURE pr_seniales_sf(p_activo IN OUT VARCHAR2,
                                             p_numeropaginalistado IN NUMBER,
                                             p_totalregistroslistado OUT NUMBER,
                                             p_cursor OUT SYS_REFCURSOR);

  CREATE OR REPLACE PROCEDURE pr_seniales_set(p_cursor_senial OUT SYS_REFCURSOR);

END pkg_seniales;
