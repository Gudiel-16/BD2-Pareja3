// publicacionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPublicaciones, crearPublicacion, fetchPublicacionesDeAmigos } from './publicacionThunks';

const initialState = {
  publicaciones: [],
  publicacionesAmigos: [],
  loading: false,
  error: null,
};

export const publicacionSlice = createSlice({
  name: 'publicaciones',
  initialState,
  reducers: {
    // Tus reducers síncronos aquí si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicaciones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicaciones.fulfilled, (state, action) => {
        // Combina las publicaciones actuales con las nuevas del usuario
        state.publicaciones = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublicaciones.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(crearPublicacion.fulfilled, (state, action) => {
        // Agrega la nueva publicación al inicio del arreglo
        state.publicaciones.unshift(action.payload);
      })
      .addCase(fetchPublicacionesDeAmigos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicacionesDeAmigos.fulfilled, (state, action) => {
        // Combina las publicaciones de amigos con las actuales
        state.publicacionesAmigos = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublicacionesDeAmigos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
      // Puedes agregar más casos para otros estados si es necesario
  },
});

export default publicacionSlice.reducer;
