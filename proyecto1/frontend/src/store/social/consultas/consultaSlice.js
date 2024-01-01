// consultasSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchConsultas } from './consultaThunks';


const initialState = {
  datosConsultas: [],
  loading: false,
  error: null,
};

export const consultasSlice = createSlice({
  name: 'consultas',
  initialState,
  reducers: {
    // Aquí puedes agregar reducers para acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultas.fulfilled, (state, action) => {
        state.datosConsultas = action.payload;
        state.loading = false;
      })
      .addCase(fetchConsultas.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default consultasSlice.reducer;
