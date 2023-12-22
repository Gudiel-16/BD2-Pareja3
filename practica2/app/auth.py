import mysql.connector

def login(usuario, password):
    
    config_db = credeciales_db("admin", "1234")
    connection = None
    cursor = None

    try:

        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = "SET ROLE administrador;"

        cursor.execute(query_set)

        query = '''
                    SELECT *
                    FROM Usuarios
                    WHERE username = '{}' AND password = '{}';
                '''.format(usuario, password)

        # print(query)
        cursor.execute(query)

        resultados = cursor.fetchall()

        if(len(resultados) > 0):
            return resultados[0][3] # retornamos el rol

        return None

    except mysql.connector.Error as err:
        print(err)
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def crear_y_registrar_usuario_en_db(usuario_admin, password_admin, usuario_a_crear, password_usuario_a_crear, rol_usuario_a_crear):
    
    config_db = credeciales_db(usuario_admin, password_admin)
    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = "SET ROLE administrador;"

        cursor.execute(query_set)

        query_crear_usuario = '''
                                CREATE USER '{}'@'localhost' IDENTIFIED BY '{}';
                              '''.format(usuario_a_crear, password_usuario_a_crear)

        cursor.execute(query_crear_usuario)

        query_asignar_permisos = ''' GRANT {} TO '{}'@'localhost'; '''.format(rol_usuario_a_crear, usuario_a_crear)

        cursor.execute(query_asignar_permisos)

        query_flush = "FLUSH PRIVILEGES;"

        cursor.execute(query_flush)

        query_insertar_usuario = '''
                                    INSERT INTO usuarios(username, password, rol) VALUES('{}', '{}', '{}');
                                 '''.format(usuario_a_crear, password_usuario_a_crear, rol_usuario_a_crear)
        
        cursor.execute(query_insertar_usuario)

    except mysql.connector.Error as err:
        print(err)
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()

def verificar_si_username_existe_en_db(usuario_admin, password_admin, usuario_a_crear):
    
    config_db = credeciales_db(usuario_admin, password_admin)
    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = "SET ROLE administrador;"

        cursor.execute(query_set)

        query = ''' SELECT username FROM usuarios WHERE username = '{}'; '''.format(usuario_a_crear)

        cursor.execute(query)

        resultados = cursor.fetchall()

        if(len(resultados) == 0):
            return False

        return True

    except mysql.connector.Error as err:
        # posible error: credenciales de admin incorrectas
        print(err)
            
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()

def credeciales_db(usuario, password_usuario):
    config_db = {
        'host': 'localhost',
        'database': "bd2_practica1",
        'user': usuario,
        'password': password_usuario,
        'port': 3306,
        'autocommit': True
    }

    return config_db

# if __name__ == "__main__":
#     print(login("admin", "1234"))
    # print(verificar_si_usuario_tiene_permisos("asistente", "habitacion", "SELECT"))
#     print(verificar_si_username_existe("bd2_practica1", "admin", "1234", "asistente1"))

        


