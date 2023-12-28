import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';

const amigos = [
  {
    id: '1',
    nombre: 'Dos Dr Dos',
    perfilUrl: '/perfil/dos',
    imagen: 'path/to/amigo1-imagen.jpg',
  },
  {
    id: '2',
    nombre: 'Tres Dr Tres',
    perfilUrl: '/perfil/tres',
    imagen: 'path/to/amigo2-imagen.jpg',
  },
  {
    id: '3',
    nombre: 'Cuatro Dr Cuatro',
    perfilUrl: '/perfil/cuatro',
    imagen: 'path/to/amigo3-imagen.jpg',
  },
  {
    id: '4',
    nombre: 'Cinco Dr Cinco',
    perfilUrl: '/perfil/cinco',
    imagen: 'path/to/amigo4-imagen.jpg',
  },
  {
    id: '5',
    nombre: 'Seis Dr Seis',
    perfilUrl: '/perfil/seis',
    imagen: 'path/to/amigo5-imagen.jpg',
  },
  {
    id: '6',
    nombre: 'Siete Dr Siete',
    perfilUrl: '/perfil/siete',
    imagen: 'path/to/amigo6-imagen.jpg',
  },
  {
    id: '7',
    nombre: 'Ocho Dr Ocho',
    perfilUrl: '/perfil/ocho',
    imagen: 'path/to/amigo7-imagen.jpg',
  },
  {
    id: '8',
    nombre: 'Nueve Dr Nueve',
    perfilUrl: '/perfil/nueve',
    imagen: 'path/to/amigo8-imagen.jpg',
  },
  {
    id: '9',
    nombre: 'Diez Dr Diez',
    perfilUrl: '/perfil/diez',
    imagen: 'path/to/amigo9-imagen.jpg',
  },
  {
    id: '10',
    nombre: 'Once Dr Once',
    perfilUrl: '/perfil/once',
    imagen: 'path/to/amigo10-imagen.jpg',
  }
];


export const ListaAmigos = () => {
  const handleEliminarAmigo = (idAmigo) => {
    // Aquí deberías agregar la lógica para eliminar a un amigo, como hacer una solicitud a tu API.
    console.log(`Eliminar amigo con id: ${idAmigo}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>Mis amigos:</Typography>
      </Grid>
      {amigos.map((amigo) => (
        <Grid item xs={12} sm={6} md={4} key={amigo.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={amigo.imagen}
              alt={`Imagen de ${amigo.nombre}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {amigo.nombre}
              </Typography>
              <Button size="small" color="primary" href={amigo.perfilUrl}>
                Página de perfil
              </Button>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" onClick={() => handleEliminarAmigo(amigo.id)}>
                Suprimir
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};