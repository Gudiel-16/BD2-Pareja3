import mysql.connector

def llamar_insertar_registro_actividad(usuario, accion, detalles):
    try:
        # Conexión a la base de datos
        conexion = mysql.connector.connect(
            user='root', 
            password='admin123', 
            host='localhost', 
            database='bd2_practica1'
        )

        # Crear un cursor
        cursor = conexion.cursor()

        # Llamar al procedimiento almacenado
        cursor.callproc('InsertarRegistroActividad', [usuario, accion, detalles])

        # Hacer commit de la transacción
        conexion.commit()

        # Cerrar el cursor y la conexión
        cursor.close()
        conexion.close()

        print("Registro de actividad insertado con éxito.")
    
    except mysql.connector.Error as e:
        print(f"Error al insertar registro de actividad: {e}")