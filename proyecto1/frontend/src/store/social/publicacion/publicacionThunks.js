// publicacionThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPublicaciones = createAsyncThunk(
    'publicaciones/fetchPublicaciones',
    async (doctorId, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:3000/api/publicacion/${doctorId}`);
        if (!response.ok) throw new Error('Error al obtener publicaciones.');
        const resp = await response.json();
        // Mapea a través de la respuesta para extraer y reformatear las publicaciones
        const publicacionesConAutor = resp.data.flatMap(autor => 
          autor.publicaciones.map(publicacion => ({
            ...publicacion,  // Datos de la publicación
            autor: autor.nombre, // Agrega el nombre del autor
            autorId: autor.id_doctor // Agrega el ID del autor
            // Puedes agregar más campos del autor si es necesario
          }))
        );
        console.log(publicacionesConAutor);
        return publicacionesConAutor;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const crearPublicacion = createAsyncThunk(
  'publicaciones/crearPublicacion',
  async (publicacionData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/publicacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publicacionData),
      });
      if (!response.ok) throw new Error('Error al crear publicación.');
      const data = await response.json();
      return data.data; // Asegúrate de devolver la nueva publicación
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
