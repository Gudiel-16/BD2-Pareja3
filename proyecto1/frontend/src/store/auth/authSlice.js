import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'cheking', // 'not-authenticated', 'authenticated'
         id_doctor :  null ,
         correo :  null ,
         edad : null,
         especialidad :  null ,
         nombre : null ,
         username :  null ,
         foto :  null,
         errorMessage: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = 'authenticated', // 'not-authenticated', 'authenticated'
            state.id_doctor = action.payload.id_doctor;
            state.correo = action.payload.correo;
            state.edad = action.payload.edad;
            state.especialidad = action.payload.especialidad;
            state.nombre = action.payload.nombre;
            state.username = action.payload.username;
            state.foto = action.payload.foto;
            state.errorMessage = null;
        },
        logout: (state, payload) => {
            state.status = 'not-authenticated', // 'not-authenticated', 'authenticated'
            state.id_doctor = null;
            state.correo = null;
            state.edad = null;
            state.especialidad = null;
            state.nombre = null;
            state.username = null;
            state.foto = null;
            state.errorMessage = payload.msg;
        },

        checkingCredentiasl: (state, action) => {
            state.status = 'checking';
        }
    },
});

export const { login, logout, checkingCredentiasl } = authSlice.actions;