// publicacionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPublicaciones, crearPublicacion } from './publicacionThunks';

const initialState = {
  publicaciones: [],
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
        state.publicaciones = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublicaciones.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(crearPublicacion.fulfilled, (state, action) => {
        state.publicaciones.push(action.payload);
      });
      // Puedes agregar más casos para otros estados si es necesario
  },
});

export default publicacionSlice.reducer;
