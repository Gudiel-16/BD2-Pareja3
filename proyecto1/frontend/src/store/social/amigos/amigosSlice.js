import { createSlice } from '@reduxjs/toolkit';
import { obtenerAmigos } from './amigosThunks';

const initialState = {
  amigos: [],
  loading: false,
  error: null,
};

export const amigosSlice = createSlice({
  name: 'amigos',
  initialState,
  reducers: {
    // Aquí puedes agregar reducers para otras acciones síncronas si es necesario
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
      });
    // Puedes agregar más manejadores aquí si tienes más thunks
  },
});

export default amigosSlice.reducer;
