import { checkingCredentiasl, login, logout } from './';

export const checkingAtuhenication = ( email, password ) => {
    return async (dispatch) => {
        dispatch( checkingCredentiasl() );
    }
};

export const registerUser = ({ nombre, username, correo, edad, especialidad, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentiasl());

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'nombre': nombre,
                    'username': username,
                    'foto': 'asdfasdfasdfa',
                    'correo': correo,
                    'edad': edad,
                    'especialidad': especialidad,
                    'password': password
                })
            });

            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
                
                dispatch(login(data.data[0])); // Suponiendo que 'data' contiene la información del usuario y el token

            } else {
                dispatch(logout({ errorMessage: data.errorMessage || 'Error en el registro' }));
            }
        } catch (error) {
            dispatch(logout({ errorMessage: error.message }));
        }
    }
};


export const loginUser = ({ correo, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentiasl());

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { 
                        "correo" : correo, 
                        "password": password 
                    })
            });

            const data = await response.json();

            if (data.status === 200) {
                //console.log(data.data[0]);
                localStorage.setItem('user', JSON.stringify(data.data[0]));
                dispatch(login(data.data[0])); // Suponiendo que 'data' contiene la información del usuario y el token
            } else {
                console.log("error");
                dispatch(logout({ errorMessage: error || 'Error en el inicio de sesión' }));
            }
        } catch (error) {
            dispatch(logout({ errorMessage: error }));
        }
    }
};

export const logoutUser = () => {
    return async (dispatch) => {
        dispatch(logout({ errorMessage: null }));
    }
};