import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions } from '@mui/material';

export const BusquedaAmigos = () => {
  const [searchTerm, setSearchTerm] = useState({ apellido: '', nombre: '' });

  // Función para manejar los cambios en los campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Aquí implementarías la lógica de búsqueda, como hacer una solicitud a tu backend
    console.log('Buscar', searchTerm);
  };

  return (
    <Box sx={{ m: 4 }}>
      {/* Buscar una persona específica */}
      <Typography variant="h5" gutterBottom>Buscar una persona específica</Typography>
      <TextField
        label="Apellido"
        name="apellido"
        value={searchTerm.apellido}
        onChange={handleInputChange}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Nombre"
        name="nombre"
        value={searchTerm.nombre}
        onChange={handleInputChange}
      />
      <Button onClick={handleSearch} variant="contained" sx={{ ml: 2 }}>Buscar</Button>

      {/* Secciones de sugerencias */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Amigos de tus amigos</Typography>
      {/* Componente o lista para mostrar amigos de tus amigos */}
      <Typography>No tenemos amigos para ofrecerte.</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Sugerencias de amistad</Typography>
      {/* Componente o lista para mostrar sugerencias de amistad */}
      <Typography>...sugerencias...</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>En el mismo campo que tú</Typography>
      {/* Componente o lista para mostrar personas en el mismo campo de estudio */}
      <Typography>¿Has completado tu perfil? Nadie coincide con tu campo de estudio.</Typography>
    </Box>
  );
};
