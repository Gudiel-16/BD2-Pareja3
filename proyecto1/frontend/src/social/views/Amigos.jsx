import React, { useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerAmigos } from '../../store/social';


export const ListaAmigos = () => {
  const handleEliminarAmigo = (idAmigo) => {
    // Aquí deberías agregar la lógica para eliminar a un amigo, como hacer una solicitud a tu API.
    console.log(`Eliminar amigo con id: ${idAmigo}`);
  };


  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;


  const dispatch = useDispatch();
  const { amigos, loading, error } = useSelector((state) => state.amigos);

  useEffect(() => {
    dispatch(obtenerAmigos(user.id_doctor));
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>Mis amigos:</Typography>
      </Grid>
      {amigos.map((amigo) => (
        <Grid item xs={12} sm={6} md={4} key={amigo.id_doctor}>
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