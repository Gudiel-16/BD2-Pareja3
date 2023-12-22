import os
import subprocess
import datetime
import mysql.connector

def crear_respaldo(usuario, password):
    fecha_actual = datetime.datetime.now().strftime('%d-%m-%Y_%H-%M-%S')
    nombre_archivo = f"{fecha_actual}.sql"
    ruta_respaldo = f"../respaldos/{nombre_archivo}"

    cmd = f"mysqldump -u {usuario} -p{password} bd2_practica1 > {ruta_respaldo}"

    try:
        subprocess.run(cmd, shell=True, check=True)
        tamaño = os.path.getsize(ruta_respaldo) / (1024 * 1024)  # Tamaño en MB
        print(f"Respaldo {nombre_archivo} realizado correctamente")
        registrar_respaldo_en_db(nombre_archivo,usuario, password)

    except subprocess.CalledProcessError as e:
        print("Error al realizar respaldo")
        print(e)
        return None, None

def registrar_respaldo_en_db(nombre_archivo, usuario, password):

    conexion = mysql.connector.connect( user=usuario, password=password, host='localhost', database='bd2_practica1')
    cursor = conexion.cursor()

    fecha_hora_actual = datetime.datetime.now()
    query = "INSERT INTO registros_respaldos (nombre_archivo, fecha_hora) VALUES (%s, %s)"
    valores = (nombre_archivo, fecha_hora_actual)

    cursor.execute(query, valores)
    conexion.commit()
    cursor.close()
    conexion.close()

import mysql.connector

def obtener_lista_respaldos(usuario, password):
    try:
        conexion = mysql.connector.connect(user=usuario, password=password, host='localhost', database='bd2_practica1')
        cursor = conexion.cursor()

        query = "SELECT id, nombre_archivo, fecha_hora FROM registros_respaldos"
        cursor.execute(query)

        # Obtener todos los registros
        registros = cursor.fetchall()

        cursor.close()
        conexion.close()
        return registros

    except mysql.connector.Error as e:
        print(f"Error al obtener lista de respaldos: {e}")
        return None

def mostrar_respaldos(usuario_logueado, password_usuario_logueado):
    respaldos = obtener_lista_respaldos(usuario_logueado, password_usuario_logueado)

    if respaldos:
        print("\nLista de Respaldos Realizados:")
        for respaldo in respaldos:
            id_respaldo, nombre_archivo, fecha_hora = respaldo
            print(f"ID: {id_respaldo}, Archivo: {nombre_archivo}, Fecha: {fecha_hora}")
    else:
        print("No hay respaldos disponibles o no se pudo recuperar la lista.")


import subprocess

def restaurar_respaldo(usuario, password, nombre_archivo):
    ruta_respaldo = f"../respaldos/{nombre_archivo}"

    cmd = f"mysql -u {usuario} -p{password} bd2_practica1 < {ruta_respaldo}"

    try:
        subprocess.run(cmd, shell=True, check=True)
        print(f"Respaldo {nombre_archivo} restaurado correctamente")
    except subprocess.CalledProcessError as e:
        print("Error al restaurar respaldo")
        print(e)


def menu_restaurar_respaldo(usuario_logueado, password_usuario_logueado):
    print("\nSeleccione el respaldo que desea restaurar:")
    
    # Suponiendo que tienes una función para obtener los respaldos
    respaldos = obtener_lista_respaldos(usuario_logueado, password_usuario_logueado)
    if respaldos:
        for respaldo in respaldos:
            id_respaldo, nombre_archivo, fecha_hora = respaldo
            print(f"ID: {id_respaldo}, Archivo: {nombre_archivo}, Fecha: {fecha_hora}")

        id_respaldo_elegido = input("\nINGRESE EL ID DEL RESPALDO A RESTAURAR: ")
        respaldo_elegido = next((r for r in respaldos if r[0] == int(id_respaldo_elegido)), None)
        
        if respaldo_elegido:
            restaurar_respaldo(usuario_logueado, password_usuario_logueado, respaldo_elegido[1])
        else:
            print("ID de respaldo no válido.")
    else:
        print("No hay respaldos disponibles.")