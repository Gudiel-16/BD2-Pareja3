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
    password VARCHAR(255) NOT NULL
);
