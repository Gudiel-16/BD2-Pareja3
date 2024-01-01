import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardActions, Grid, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerAmigosDeAmigos2, obtenerNoAm , agregarAmigo} from '../../store/social';


export const BusquedaAmigos = () => {

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const [searchTerm, setSearchTerm] = useState({ apellido: '', nombre: '' });
  const { amigosDeAmigos,noAmigos ,loading, error } = useSelector((state) => state.amigos);

  // Función para manejar los cambios en los campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerAmigosDeAmigos2(user.id_doctor));
    dispatch(obtenerNoAm(user.id_doctor));

  }, [dispatch, user.id_doctor]);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Aquí implementarías la lógica de búsqueda, como hacer una solicitud a tu backend
    console.log('Buscar', searchTerm);
  };

  const agregar = (idAmigo) => {
    dispatch(agregarAmigo({ id_doctor: user.id_doctor, id_amigo: idAmigo }));
  }

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

      
      {amigosDeAmigos.map((amigo) => (
        <Grid item xs={12} sm={6} md={4} key={amigo.id_doctor} >
          <Card>
            <Avatar style={{ width: 100, height: 100 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {amigo.nombre}
                </Typography>
                <Button size="small" color="primary" onClick={() => agregar(amigo.id_doctor)}>
                  Agregar
                </Button>

              </CardContent>
          </Card>
        </Grid>
      ))}


      {/* Secciones de sugerencias */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Personas que no Son Tus Amigos</Typography>
      {noAmigos.map((amigo) => (
        <Grid item xs={12} sm={6} md={4} key={amigo.id_doctor} >
          <Card>
            <Avatar style={{ width: 100, height: 100 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {amigo.nombre}
                </Typography>
                <Button size="small" color="primary" onClick={() => agregar(amigo.id_doctor)}>
                  Agregar
                </Button>

              </CardContent>
          </Card>
        </Grid>
      ))}
    </Box>
  );
};
