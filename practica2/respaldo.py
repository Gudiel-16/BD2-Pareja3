import subprocess
import datetime

# Funcion que crea un respaldo de la base de datos
def crear_respaldo(usuario, password):

    # Obtener la fecha y hora actual
    fecha_actual = datetime.datetime.now().strftime('%d-%m-%Y_%H-%M-%S')
    nombre_archivo = f"{fecha_actual}.sql"

    # Ruta completa del archivo de respaldo

    ruta_respaldo = f"./respaldos/{nombre_archivo}"

    # comando para realizar respaldo 
    cmd = f"mysqldump -u {usuario} -p{password} bd2_practica1 > {ruta_respaldo}"

    try: 
        # run command
        subprocess.run(cmd, shell=True, check = True)
        print("Respaldo {nombre_archivo} realizado correctamente ")
    
    except subprocess.CalledProcessError as e:
        print("Error al realizar respaldo")
        print(e)

    