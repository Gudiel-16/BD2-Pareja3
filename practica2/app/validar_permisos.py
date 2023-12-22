import mysql.connector

def verificar_si_usuario_tiene_permisos(rol_usuario_logueado, nombre_tabla, tipo_privilegio):
    
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
                    FROM information_schema.TABLE_PRIVILEGES
                    WHERE TABLE_SCHEMA = 'bd2_practica1'
                        AND (GRANTEE = "'{}'@'%'" OR GRANTEE = "'{}'@'localhost'")
                        AND TABLE_NAME = '{}'
                        AND PRIVILEGE_TYPE = '{}'
                '''.format(rol_usuario_logueado, rol_usuario_logueado, nombre_tabla, tipo_privilegio)

        cursor.execute(query)

        resultados = cursor.fetchall()

        if(len(resultados) == 0):
            return False

        return True

    except mysql.connector.Error as err:
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