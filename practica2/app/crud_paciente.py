import mysql.connector

def select_paciente(usuario, password, rol):

    config_db = credeciales_db(usuario, password)
    connection = None
    cursor = None

    try:

        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = '''SET ROLE {};'''.format(rol)

        cursor.execute(query_set)

        query_use = "USE bd2_practica1;"

        cursor.execute(query_use)

        query = '''
                    SELECT *
                    FROM paciente
                    ORDER BY idPaciente DESC
                    LIMIT 25;
                '''

        cursor.execute(query)

        resultados = cursor.fetchall()

        return resultados

    except mysql.connector.Error as err:
        print(err)
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()

def update_paciente(usuario, password, rol, id_paciente, edad_paciente, genero_paciente):

    config_db = credeciales_db(usuario, password)
    connection = None
    cursor = None

    try:

        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = '''SET ROLE {};'''.format(rol)

        cursor.execute(query_set)

        query_use = "USE bd2_practica1;"

        cursor.execute(query_use)

        query = '''
                    UPDATE paciente SET edad = {}, genero = '{}' WHERE idPaciente = {};
                '''.format(edad_paciente, genero_paciente, id_paciente)

        cursor.execute(query)

    except mysql.connector.Error as err:
        print(err)
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()    

def insert_paciente(usuario, password, rol, id_paciente, edad_paciente, genero_paciente):

    config_db = credeciales_db(usuario, password)
    connection = None
    cursor = None

    try:

        connection = mysql.connector.connect(**config_db)

        cursor = connection.cursor()

        query_set = '''SET ROLE {};'''.format(rol)

        cursor.execute(query_set)

        query_use = "USE bd2_practica1;"

        cursor.execute(query_use)

        query = '''
                    INSERT INTO paciente(idPaciente, edad, genero) VALUES({}, {}, '{}');
                '''.format(id_paciente, edad_paciente, genero_paciente)

        cursor.execute(query)

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
        # 'database': "bd2_practica1",
        'user': usuario,
        'password': password_usuario,
        'port': 3306,
        'autocommit': True
    }

    return config_db

# if __name__ == "__main__":
#     # print(select_asistente("asistente4", "1234", "asistente"))
#     # print(select_paciente("asistente4", "1234", "asistente"))
#     update_paciente("asistente4", "1234", "asistente", 200, "Masculino", 100000)
