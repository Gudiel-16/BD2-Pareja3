// amigosSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { obtenerAmigos, obtenerAmigosDeAmigos, obtenerAmigosDeAmigos2, obtenerNoAm, agregarAmigo} from './amigosThunks';

const initialState = {
  amigos: [],
  amigosDeAmigos: [],
  noAmigos: [],
  loading: false,
  error: null,
};

export const amigosSlice = createSlice({
  name: 'amigos',
  initialState,
  reducers: {
    // Aquí puedes agregar reducers para acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
        .addCase(obtenerAmigos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(obtenerAmigos.fulfilled, (state, action) => {
            state.amigos = action.payload;
            state.loading = false;
        })
        .addCase(obtenerAmigos.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(obtenerAmigosDeAmigos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(obtenerAmigosDeAmigos.fulfilled, (state, action) => {
            state.amigosDeAmigos = action.payload;
            state.loading = false;
        })
        .addCase(obtenerAmigosDeAmigos.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(obtenerAmigosDeAmigos2.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(obtenerAmigosDeAmigos2.fulfilled, (state, action) => {
            state.amigosDeAmigos = action.payload;
            state.loading = false;
        })
        .addCase(obtenerAmigosDeAmigos2.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(obtenerNoAm.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(obtenerNoAm.fulfilled, (state, action) => {
            state.noAmigos = action.payload;
            state.loading = false;
        })
        .addCase(obtenerNoAm.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        .addCase(agregarAmigo.fulfilled, (state, action) => {
          state.amigos.push(action.payload.nuevoAmigo);
        });
  },
  
});