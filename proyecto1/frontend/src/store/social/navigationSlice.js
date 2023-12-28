// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    vistaActual: 'UserInformation', // La vista por defecto
  },
  reducers: {
    setVistaActual: (state, action) => {
      state.vistaActual = action.payload;
    },
  },
});

export const { setVistaActual } = navigationSlice.actions;

// Acciones específicas para cada vista
export const mostrarUserInformation = () => (dispatch) => {
  dispatch(setVistaActual('UserInformation'));
};
export const mostrarPublicaciones = () => (dispatch) => {
  dispatch(setVistaActual('Publicaciones'));
};
export const mostrarListaAmigos = () => (dispatch) => {
  dispatch(setVistaActual('ListaAmigos'));
};
export const mostrarPerfilAmigo = () => (dispatch) => {
  dispatch(setVistaActual('PerfilAmigo'));
};
export const mostrarBusquedaAmigos = () => (dispatch) => {
  dispatch(setVistaActual('BusquedaAmigos'));
};
export const mostrarMensajes = () => (dispatch) => {
  dispatch(setVistaActual('Mensajes'));
};
export const mostrarVistaConsultas = () => (dispatch) => {
  dispatch(setVistaActual('VistaConsultas'));
};