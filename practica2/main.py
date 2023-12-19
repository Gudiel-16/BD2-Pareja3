from colorama import init, Back, Fore, Style
from respaldo import crear_respaldo
import getpass

init()

### COLORES: CYAN, GREEN, YELLOW, BLUE, MAGENTA, YELLOW, BLACH, WHITE
### Fore: asigna un color
### RESET_ALL: regresa todo a normal

usuario_logueado = ""
password_usuario_logueado = ""

def iniciar_secion():
    print(Fore.CYAN, "\n======================================================")
    print("================== INICIO DE SESION ==================")
    # print("=============== BIENVENIDO USUARIO:", usuario_logueado, "===============")
    print("======================================================", Style.RESET_ALL)

    usuario = input("\nUSUARIO: ")
    password = getpass.getpass("PASSWORD: ")

    # LOGICA PARA INICIAR SESION

    # asignando valroes
    global usuario_logueado
    global password_usuario_logueado
    usuario_logueado = usuario
    password_usuario_logueado = password

    # datos ingresados
    print("\n", usuario, password)

    # usuario logueado
    print(usuario_logueado, password_usuario_logueado)

    menu_usuario()

def registar_usuario():

    print("\n", Fore.CYAN, "************ REGISTRAR USUARIO ************", Style.RESET_ALL)
    nombre_usuario = input("\nNOMBRE DE USUARIO A CREAR: ")
    password_usuario = getpass.getpass("PASSWORD DE USUARIO A CREAR: ")
    rol_usuario = input("ROL DE USUARIO A CREAR: ")
    usuario_admin = input("USUARIO ADMINISTRDOR: ")
    password_admin = getpass.getpass("PASSWORD DE ADMINISTRADOR: ")
    registrar_nuevo_usuario_si_o_no = input("REGISTRAR NUEVO USUARIO: SI (S) NO (N) ")

    if(registrar_nuevo_usuario_si_o_no.lower() == "s"):
        # LOGICA PARA INGRESAR NUEVO USUARIO

        # datos ingresados
        print("\n", nombre_usuario, password_usuario, rol_usuario, usuario_admin, password_admin, registrar_nuevo_usuario_si_o_no)
        
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
            menu_crud()
        elif opcion == "2":
            menu_crud()
        elif opcion == "3":
            menu_crud()
        elif opcion == "4":
            menu_crud()
        elif opcion == "5":
            menu_respaldo()
        elif opcion == "6":
            print("Ver respaldos")
        elif opcion == "7":
            print("Restaurar respaldo")
        elif opcion == "8":
            print("\n", Back.BLUE + Fore.WHITE,"¡Hasta luego " + usuario_logueado + "!", Style.RESET_ALL)
            break
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)

def menu_crud():
    
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
            print("pacientes")
        elif opcion == "2":
            print("habitaciones")
        elif opcion == "3":
            print("log actividad")
        elif opcion == "4":
            print("log habitacion")
        elif opcion == "5":
            break
        else:
            print("\n", Back.RED + Fore.WHITE, "Por favor, ingrese una opción válida.", Style.RESET_ALL)

def menu_respaldo():
    crear_respaldo(usuario_logueado, password_usuario_logueado)
    
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