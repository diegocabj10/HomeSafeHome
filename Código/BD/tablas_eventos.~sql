CREATE TABLE t_dispositivos (
  id_dispositivo NUMBER,
  descripcion VARCHAR2(50),
  CONSTRAINT dispositivos_pk PRIMARY KEY (id_dispositivo)
);

CREATE TABLE t_seniales (
  id_senial NUMBER,
  descripcion VARCHAR2(50),
  CONSTRAINT seniales_pk PRIMARY KEY (id_senial)
);

CREATE TABLE t_eventos (
  id_evento NUMBER,
  fecha DATE,
  valor NUMBER(10,2),
  id_dispositivo NUMBER,
  id_senial NUMBER,
  CONSTRAINT eventos_pk PRIMARY KEY (id_evento),
  CONSTRAINT dispositivos_fk
    FOREIGN KEY (id_dispositivo)
    REFERENCES t_dispositivos(id_dispositivo),
  CONSTRAINT seniales_fk
    FOREIGN KEY (department_id)
    REFERENCES t_seniales(id_senial)
);
