import { createAsyncThunk } from '@reduxjs/toolkit';

export const actualizarFotoPerfil = createAsyncThunk(
  'user/actualizarFotoPerfil',
  async ({ id_doctor, foto }, { rejectWithValue }) => {
    console.log(id_doctor);
    console.log(foto);
    try {
      const response = await fetch('http://localhost:3000/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { "id_doctor": id_doctor,
               "foto": foto 
            }
            ),
      });
      if (!response.ok) throw new Error('Error al actualizar la foto de perfil.');
      const data = await response.json();
      return data; // Aquí puedes devolver lo que necesites
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const actualizarUsuario = createAsyncThunk(
  'user/actualizarUsuario',
  async ({ id_doctor, username, sitio_web }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/doctor', {
        method: 'PUT', // Utilizamos el método PUT para actualizar el usuario
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "id_doctor": id_doctor,
          "username": username,
          "sitio_web": sitio_web,
        }),
      });
      if (!response.ok) throw new Error('Error al actualizar el usuario.');

      const data = await response.json();
      return data; // Puedes devolver lo que necesites en la respuesta del servidor
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const subirPDF = createAsyncThunk(
    'pdf/subirPDF',
    async ({ id_doctor, nombre, pdf }, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3000/api/pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "id_doctor": id_doctor,
            "nombre": nombre,
            "pdf": pdf
          }),
        });
        if (!response.ok) throw new Error('Error al subir el PDF.');
  
        const data = await response.json();
        return data; // Retorna la respuesta del servidor, según lo que necesites
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );



  export const obtenerDatosUsuario = createAsyncThunk(
    'user/obtenerDatosUsuario',
    async (id_doctor, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:3000/api/doctor/${id_doctor}`);
        if (!response.ok) throw new Error('Error al obtener los datos del usuario.');
        const data = await response.json();
        return data.data[0]; // Ajusta esto según la estructura de tu respuesta
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  