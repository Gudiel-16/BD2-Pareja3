import { createAsyncThunk } from '@reduxjs/toolkit';

export const obtenerAmigos = createAsyncThunk(
  'amigos/obtenerAmigos',
  async (id_doctor, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/amigos/${id_doctor}`);
      if (!response.ok) throw new Error('Error al obtener amigos.');

      const data = await response.json();
      console.log(data.data);
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
