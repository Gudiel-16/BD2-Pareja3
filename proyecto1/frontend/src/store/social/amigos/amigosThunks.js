import { createAsyncThunk } from '@reduxjs/toolkit';

export const obtenerAmigos = createAsyncThunk(
  'amigos/obtenerAmigos',
  async (id_doctor, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/amigos/${id_doctor}`);
      if (!response.ok) throw new Error('Error al obtener amigos.');
      const data = await response.json();
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerAmigosDeAmigos = createAsyncThunk(
  'amigos/obtenerAmigosDeAmigos',
  async (id_doctor, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/amigos/${id_doctor}`);
      if (!response.ok) throw new Error('Error al obtener amigos de amigos.');
      const data = await response.json();
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerAmigosDeAmigos2 = createAsyncThunk(
  'amigos/obtenerAmigosDeAmigos2',
  async (id_doctor, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/amigos/encomun/${id_doctor}`);
      if (!response.ok) throw new Error('Error al obtener amigos de amigos.');
      const data = await response.json();
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const obtenerNoAm = createAsyncThunk(
  'amigos/obtenerNoAm',
  async (id_doctor, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/noamigos/${id_doctor}`);
      if (!response.ok) throw new Error('Error al obtener usuarios no amigos.');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const agregarAmigo = createAsyncThunk(
  'amigos/agregarAmigo',
  async ({ id_doctor, id_amigo }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/amigos/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_doctor: id_doctor,
          id_amigo: id_amigo,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al agregar amigo.');
      }
      const data = await response.json();
      return data; // Aquí puedes devolver el mensaje de éxito o cualquier otra info que devuelva tu API
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
