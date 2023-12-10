/*CARGA HABITACIONES*/
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\datos de entrada\\Habitaciones.csv" 
INTO TABLE habitacion 
CHARACTER SET latin1 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n' 
IGNORE 1 LINES 
(idHabitacion, habitacion);

/*CARGA PACIENTES*/
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\datos de entrada\\Pacientes.csv" 
INTO TABLE paciente 
CHARACTER SET 'latin1' 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(idPaciente,edad,genero);

/*CARGA LogActividades1*/
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\datos de entrada\\LogActividades1.csv" 
INTO TABLE log_actividad 
CHARACTER SET latin1 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(timestampx, actividad, idHabitacion, idPaciente);

/*CARGA LogActividades2*/
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\datos de entrada\\LogActividades2.csv" 
INTO TABLE log_actividad 
CHARACTER SET latin1 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(timestampx, actividad, idHabitacion, idPaciente);

/*CARGA LogHabitacion*/
LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\datos de entrada\\LogHabitacion.csv" 
INTO TABLE log_habitacion 
CHARACTER SET latin1 
FIELDS TERMINATED BY ';' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS 
(idHabitacion, timestampx, statusx);