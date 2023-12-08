DROP DATABASE IF EXISTS bd2_practica1;
CREATE DATABASE bd2_practica1;
USE bd2_practica1;

CREATE TABLE habitacion(
	idHabitacion INT,
    habitacion VARCHAR(50),
    PRIMARY KEY (idHabitacion)    
);

CREATE TABLE paciente(
	idPaciente INT,
    edad INT,
    genero VARCHAR(20),
    PRIMARY KEY (idPaciente)  
);

CREATE TABLE log_habitacion(
	idHabitacion INT,
	timestampx VARCHAR(100),
    statusx VARCHAR(45),
    PRIMARY KEY (timestampx, idHabitacion),  
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion(idHabitacion)
);

CREATE TABLE log_actividad(
	id_log_actividad INT AUTO_INCREMENT,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    idHabitacion INT,
    idPaciente INT,    
    PRIMARY KEY (id_log_actividad),
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion(idHabitacion),
    FOREIGN KEY (idPaciente) REFERENCES Paciente(idPaciente)
);