
USE mysql;
SELECT DATABASE();
SELECT current_user();
SELECT * FROM USER;

-- Rol Asistente
CREATE ROLE asistente;
GRANT SELECT ON bd2_practica1.habitacion TO asistente;
GRANT SELECT, UPDATE ON bd2_practica1.paciente TO asistente;

-- Rol Doctor
CREATE ROLE doctor;
GRANT SELECT, UPDATE, INSERT ON bd2_practica1.paciente TO doctor;

-- Rol Soporte
CREATE ROLE soporte;
GRANT SELECT, UPDATE, INSERT ON bd2_practica1.log_actividad TO soporte;
GRANT SELECT, UPDATE, INSERT ON bd2_practica1.log_habitacion TO soporte;

-- Role Administrador
CREATE ROLE administrador;
GRANT ALL PRIVILEGES ON *.* TO administrador WITH GRANT OPTION;

-- Actualizando Roles y permisos
FLUSH PRIVILEGES;

-- Creacion de usuario y agregar privilegios
-- despues de logearse utilizar SET ROLE 'role'
-- ejemplo
-- set role asistente;
CREATE USER 'asistente1'@'localhost' IDENTIFIED BY '1234';
GRANT asistente TO 'asistente1'@'localhost';
