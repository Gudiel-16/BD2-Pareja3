// consultasThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConsultas = createAsyncThunk(
  'consultas/fetchConsultas',
  async (consultaId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/consultas/${consultaId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al obtener la consulta.');
      }
      const data = await response.json();
      return data.data; // Suponiendo que quieres almacenar la parte 'data' de la respuesta
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
