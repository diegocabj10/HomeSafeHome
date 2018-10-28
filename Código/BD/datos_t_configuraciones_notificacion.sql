prompt PL/SQL Developer import file
prompt Created on sábado, 27 de octubre de 2018 by dmarchetti
set feedback off
set define off
prompt Disabling triggers for T_CONFIGURACIONES_NOTIFICACION...
alter table T_CONFIGURACIONES_NOTIFICACION disable all triggers;
prompt Disabling foreign key constraints for T_CONFIGURACIONES_NOTIFICACION...
alter table T_CONFIGURACIONES_NOTIFICACION disable constraint FK_SENIAL;
prompt Deleting T_CONFIGURACIONES_NOTIFICACION...
delete from T_CONFIGURACIONES_NOTIFICACION;
commit;
prompt Loading T_CONFIGURACIONES_NOTIFICACION...
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (1, 3, 0, 0, 'Apertura Puerta', 'Se ha detectado una apertura de la puerta.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (2, 3, 1, 1, 'Cierre Puerta', 'Se ha detectado un cierre de la puerta');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (3, 1, 35, 99, 'Monoxido de Carbono', 'Presencia de CO (+0.0035%): Dolor de cabeza y mareos en el plazo de 6 a 8 horas de exposición constante');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (4, 1, 100, 199, null, 'Presencia de CO (+0.01%): Cefalea leve en 2 o 3 horas.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (5, 1, 200, 399, null, 'Presencia de CO (+0.02%): En 2 a 3 horas se puede observar un leve dolor de cabeza, náuseas, vértigo y síntomas mentales (pérdida de razonamiento).');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (6, 1, 400, 799, null, 'Presencia de CO (+0.04%): En 2 a 3 horas se puede observar un fuerte dolor de cabeza, incoordinación muscular, debilidad, vómitos y colapso.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (7, 1, 800, 1099, null, 'Presencia de CO (+0.08%): Fuerte dolor de cabeza, debilidad, vómitos, mareos, náuseas, convulsiones y colapso dentro de los 45 minutos.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (8, 1, 1100, 1599, null, 'Presencia de CO (+0.11%): Después de 1.5 a 3 horas se puede observar coma. (La respiración es aún bastante buena a no ser que el envenenamiento se haya prolongado).');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (9, 1, 1600, 3199, null, 'Presencia de CO (+0.16%): Cefalea, taquicardia, mareos y náuseas dentro de los 20 minutos; la muerte en menos de 2 horas.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (10, 1, 3200, 4999, null, 'Presencia de CO (+0.32%): Cefaleas, mareos y náuseas en 5 o 10 minutos. Muerte dentro de los 30 minutos.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (11, 1, 5000, 6399, null, 'Presencia de CO (+0.5%): Después de 2 a 15 minutos se puede producir la muerte.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (12, 1, 6400, 12799, null, 'Presencia de CO (+0.64%): Dolor de cabeza y mareos en 1 o 2 minutos. Convulsiones, paro respiratorio y muerte en menos de 15 minutos.');
insert into T_CONFIGURACIONES_NOTIFICACION (ID_CONFIGURACION_NOTIFICACION, ID_SENIAL, VALOR_DESDE, VALOR_HASTA, TITULO, MENSAJE)
values (13, 1, 12800, 99999, null, 'Presencia de CO (+1.28%): Inconsciencia después de 2 ó 3 respiraciones. Muerte en menos de 3 minutos.');
commit;
prompt 13 records loaded
prompt Enabling foreign key constraints for T_CONFIGURACIONES_NOTIFICACION...
alter table T_CONFIGURACIONES_NOTIFICACION enable constraint FK_SENIAL;
prompt Enabling triggers for T_CONFIGURACIONES_NOTIFICACION...
alter table T_CONFIGURACIONES_NOTIFICACION enable all triggers;
set feedback on
set define on
prompt Done.
