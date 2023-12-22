USE bd2_practica1;

CREATE TABLE registro_actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255),
    accion TEXT,
    fecha_hora DATETIME,
    detalles TEXT
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL
);

CREATE TABLE registros_respaldos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_archivo VARCHAR(255),
    fecha_hora DATETIME
);


INSERT INTO usuarios(username, password, rol) values ('admin', '1234', 'administrador');

SELECT * FROM usuarios;
SELECT * FROM registros_respaldos;