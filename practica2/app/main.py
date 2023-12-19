from colorama import init, Back, Fore, Style
from auth import verificar_si_username_existe_en_db, crear_y_registrar_usuario_en_db, login
from validar_permisos import verificar_si_usuario_tiene_permisos
from crud_paciente import select_paciente, update_paciente, insert_paciente
from crud_habitacion import select_habitacion
from crud_log_actividad import select_log_actividad, update_log_actividad, insert_log_actividad
from crud_log_habitacion import select_log_habitacion, update_log_habitacion, insert_log_habitacion
from respaldo import crear_respaldo, registrar_respaldo_en_db, obtener_lista_respaldos, mostrar_respaldos, restaurar_respaldo, menu_restaurar_respaldo
import getpass
from logs import llamar_insertar_registro_actividad

init()

### COLORES: CYAN, GREEN, YELLOW, BLUE, MAGENTA, YELLOW, BLACH, WHITE
### Fore: asigna un color
### RESET_ALL: regresa todo a normal

usuario_logueado = ""
password_usuario_logueado = ""
rol_usuario_logueado = ""

def iniciar_secion():
    print(Fore.CYAN, "\n======================================================")
    print("================== INICIO DE SESION ==================")
    # print("=============== BIENVENIDO USUARIO:", usuario_logueado, "===============")
    print("======================================================", Style.RESET_ALL)

    usuario = input("\nUSUARIO: ")
    password = getpass.getpass("PASSWORD: ")

    si_existe_usuario_regresa_rol = login(usuario, password)

    if(si_existe_usuario_regresa_rol is not None):

        # asignando valroes
        global usuario_logueado
        global password_usuario_logueado
        global rol_usuario_logueado
        usuario_logueado = usuario
        password_usuario_logueado = password
        rol_usuario_logueado = si_existe_usuario_regresa_rol

        llamar_insertar_registro_actividad(usuario, "LOGIN", "Inicio de sesion exitoso.")
        print("\n", Back.GREEN + Fore.WHITE, "Inicio de sesion exitoso", Style.RESET_ALL) 

        menu_usuario()
    else:
        #usuario, accion, detalles
        llamar_insertar_registro_actividad(usuario, "LOGIN", "Credenciales incorrectas")
        print("\n", Back.RED + Fore.WHITE, "Nombre de usuario o password incorrecto", Style.RESET_ALL) 

def registar_usuario():

    print("\n", Fore.CYAN, "************ REGISTRAR USUARIO ************", Style.RESET_ALL)
    nombre_usuario = input("\nNOMBRE DE USUARIO A CREAR: ")
    password_usuario = getpass.getpass("PASSWORD DE USUARIO A CREAR: ")
    rol_usuario = seleccionar_rol_valido()
    usuario_admin = input("USUARIO ADMINISTRADOR: ")
    password_admin = getpass.getpass("PASSWORD DE ADMINISTRADOR: ")
    registrar_nuevo_usuario_si_o_no = input("REGISTRAR NUEVO USUARIO: SI (S) NO (N) ")

    if(registrar_nuevo_usuario_si_o_no.lower() == "s"):
        if(verificar_si_username_existe_en_db(usuario_admin, password_admin, nombre_usuario) == False):
            crear_y_registrar_usuario_en_db(usuario_admin, password_admin, nombre_usuario, password_usuario, rol_usuario)
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_admin, "INSERT", "Se registro nuevo usuario")
            print("\n", Back.GREEN + Fore.WHITE, "Usuario registrado exitosamente", Style.RESET_ALL) 
        else:
            llamar_insertar_registro_actividad(usuario_admin, "INSERT", "Error al registrar un usuario, usuario existente")
            print("\n", Back.RED + Fore.WHITE, "Error al registrar un usuario, usuario existente", Style.RESET_ALL) 

        # datos ingresados
        # print("\n", nombre_usuario, password_usuario, rol_usuario, usuario_admin, password_admin, registrar_nuevo_usuario_si_o_no)

def seleccionar_rol_valido():
    while True:
        print("\nSELECCIONE ROL: ")
        print("1. ASISTENTE")
        print("2. DOCTOR")
        print("3. SOPORTE")

        opcion = input("\nINGRESE LA OPCION DESEADA: ")

        if opcion == "1":
            return "asistente"
        elif opcion == "2":
            return "doctor"
        elif opcion == "3":
            return "soporte"
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)
     
def menu_usuario():

    while True:
        # print("\n", Fore.CYAN, "************ BIENVENIDO USUARIO:", usuario_logueado, "************")
        print(Fore.CYAN, "\n==========================================================")
        print("=============== BIENVENIDO USUARIO:", usuario_logueado, "===============")
        print("==========================================================\n")
        print("1. CONSULTAS")
        print("2. ACTUALIZAR REGISTROS")
        print("3. AGREGAR REGISTROS")
        print("4. ELIMINAR REGISTROS")
        print("5. REALIZAR RESPALDO COMPLETO")
        print("6. VER RESPALDOS REALIZADOS")
        print("7. RESTAURAR RESPALDO")
        print("8. CERRAR SESION" , Style.RESET_ALL)

        opcion = input("\nINGRESE LA OPCION DESEADA: ")

        if opcion == "1":
            menu_crud("SELECT")
        elif opcion == "2":
            menu_crud("UPDATE")
        elif opcion == "3":
            menu_crud("INSERT")
        elif opcion == "4":
            menu_crud("DELETE")
        elif opcion == "5":
            crear_respaldo(usuario_logueado, password_usuario_logueado)
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "INSERT", "Se creo un respaldo nuevo")
        elif opcion == "6":
            mostrar_respaldos(usuario_logueado, password_usuario_logueado)
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "SELECT", "Se consulto tabla de respaldos")
        elif opcion == "7":
            menu_restaurar_respaldo(usuario_logueado, password_usuario_logueado)
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "SELECT", "Se realizo una restauracion")
        elif opcion == "8":
            print("\n", Back.BLUE + Fore.WHITE,"¡Hasta luego " + usuario_logueado + "!", Style.RESET_ALL)
            break
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)

def menu_crud(privilegio):
    
    while True:
        print(Fore.CYAN, "\n==========================================================")
        print("=============== BIENVENIDO USUARIO:", usuario_logueado, "===============")
        print("==========================================================\n")
        print("1. PACIENTES")
        print("2. HABITACIONES")
        print("3. LOG ACTIVIDAD")
        print("4. LOG HABITACION")
        print("5. REGRESAR" , Style.RESET_ALL)

        opcion = input("\nINGRESE LA OPCION DESEADA: ")

        if opcion == "1":
            if(verificar_si_usuario_tiene_permisos(rol_usuario_logueado, "paciente", privilegio)):
                swith_cruds("paciente", privilegio)
            else:
                print("\n", Back.RED + Fore.WHITE, "Acceso denegado.", Style.RESET_ALL)
                #usuario, accion, detalles
                llamar_insertar_registro_actividad(usuario_logueado, "ACCESS DENIED", "Se denego el acceso")
        elif opcion == "2":
            if(verificar_si_usuario_tiene_permisos(rol_usuario_logueado, "habitacion", privilegio)):
                swith_cruds("habitacion", privilegio)
            else:
                print("\n", Back.RED + Fore.WHITE, "Acceso denegado.", Style.RESET_ALL) 
                #usuario, accion, detalles
                llamar_insertar_registro_actividad(usuario_logueado, "ACCESS DENIED", "Se denego el acceso")
        elif opcion == "3":
            if(verificar_si_usuario_tiene_permisos(rol_usuario_logueado, "log_actividad", privilegio)):
                swith_cruds("log_actividad", privilegio)
            else:
                print("\n", Back.RED + Fore.WHITE, "Acceso denegado.", Style.RESET_ALL)
                #usuario, accion, detalles
                llamar_insertar_registro_actividad(usuario_logueado, "ACCESS DENIED", "Se denego el acceso") 
        elif opcion == "4":
            if(verificar_si_usuario_tiene_permisos(rol_usuario_logueado, "log_habitacion", privilegio)):
                swith_cruds("log_habitacion", privilegio)
            else:
                print("\n", Back.RED + Fore.WHITE, "Acceso denegado.", Style.RESET_ALL) 
                #usuario, accion, detalles
                llamar_insertar_registro_actividad(usuario_logueado, "ACCESS DENIED", "Se denego el acceso")
        elif opcion == "5":
            break
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)

def swith_cruds(tabla, privilegio):
    # guardar logs en cada accion
    if(tabla == "paciente"):
        if(privilegio == "SELECT"):
            resultados = select_paciente(usuario_logueado, password_usuario_logueado, rol_usuario_logueado)
            for resultado in resultados:
                print(resultado)
        elif(privilegio == "UPDATE"):
            id_paciente = input("\nID PACIENTE: ")
            edad_paciente = input("EDAD PACIENTE: ")
            genero_paciente = input("GENERO PACIENTE: ")
            update_paciente(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, id_paciente, edad_paciente, genero_paciente)
            
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "UPDATE", "Se actualizo paciente")
            
            print("\n", Back.GREEN + Fore.WHITE, "Paciente actualizado exitosamente.", Style.RESET_ALL) 
        elif(privilegio == "INSERT"):
            id_paciente = input("\nID PACIENTE: ")
            edad_paciente = input("EDAD PACIENTE: ")
            genero_paciente = input("GENERO PACIENTE: ")
            insert_paciente(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, id_paciente, edad_paciente, genero_paciente)
            
            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "INSERT", "Se inserto paciente")
            
            print("\n", Back.GREEN + Fore.WHITE, "Paciente insertado exitosamente.", Style.RESET_ALL) 
    elif(tabla == "habitacion"):
        if(privilegio == "SELECT"):
            resultados = select_habitacion(usuario_logueado, password_usuario_logueado, rol_usuario_logueado)

            #usuario, accion, detalles
            llamar_insertar_registro_actividad(usuario_logueado, "SELECT", "Se consulto habitacion")

            for resultado in resultados:
                print(resultado)
    elif(tabla == "log_actividad"):
        if(privilegio == "SELECT"):
            resultados = select_log_actividad(usuario_logueado, password_usuario_logueado, rol_usuario_logueado)
            for resultado in resultados:
                print(resultado)
        elif(privilegio == "UPDATE"):
            id_log_actividad = input("\nID LOG ACTIVIDAD: ")
            timestampx = input("TIMESTAMP (yyyy-mm-dd hh:mm:ss): ")
            actividad = input("ACTIVIDAD: ")
            id_habitacion = input("ID HABITACION: ")
            id_paciente = input("ID PACIENTE: ")
            update_log_actividad(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, id_log_actividad, timestampx, actividad, id_habitacion, id_paciente)
            print("\n", Back.GREEN + Fore.WHITE, "Log actividad actualizado exitosamente.", Style.RESET_ALL) 
        elif(privilegio == "INSERT"):
            timestampx = input("TIMESTAMP (yyyy-mm-dd hh:mm:ss): ")
            actividad = input("ACTIVIDAD: ")
            id_habitacion = input("ID HABITACION: ")
            id_paciente = input("ID PACIENTE: ")
            insert_log_actividad(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, timestampx, actividad, id_habitacion, id_paciente)
            print("\n", Back.GREEN + Fore.WHITE, "Log actividad insertado exitosamente.", Style.RESET_ALL) 
    elif(tabla == "log_habitacion"):
        if(privilegio == "SELECT"):
            resultados = select_log_habitacion(usuario_logueado, password_usuario_logueado, rol_usuario_logueado)
            for resultado in resultados:
                print(resultado)
        elif(privilegio == "UPDATE"):
            estado = input("\nESTADO: ")
            id_habitacion = input("ID HABITACION: ")
            timestampx = input("TIMESTAMP (ver formato fecha en db): ")
            update_log_habitacion(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, estado, id_habitacion, timestampx)
            print("\n", Back.GREEN + Fore.WHITE, "Log habitacion actualizado exitosamente.", Style.RESET_ALL) 
        elif(privilegio == "INSERT"):
            id_habitacion = input("ID HABITACION: ")
            timestampx = input("TIMESTAMP (yyyy-mm-dd hh:mm:ss): ")
            estado = input("ESTADO: ")
            insert_log_habitacion(usuario_logueado, password_usuario_logueado, rol_usuario_logueado, id_habitacion, timestampx, estado)
            print("\n", Back.GREEN + Fore.WHITE, "Log habitacion insertado exitosamente.", Style.RESET_ALL) 

def main():

    while True:
        print(Fore.CYAN, "\n======================================================")
        print("=================== MENU PRINCIPAL ===================")
        print("======================================================\n")
        print("1. INICIAR SESION")
        print("2. RESITRAR UN NUEVO USUARIO")
        print("3. SALIR" , Style.RESET_ALL)

        opcion = input("\nINGRESE LA OPCION DESEADA: ")

        if opcion == "1":
            iniciar_secion()
        elif opcion == "2":
            registar_usuario()
        elif opcion == "3":
            print("\n", Back.BLUE + Fore.WHITE,"¡Hasta luego!", Style.RESET_ALL)
            break
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)

if __name__ == "__main__":
    main()