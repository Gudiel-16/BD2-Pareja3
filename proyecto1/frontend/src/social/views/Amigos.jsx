import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, CardMedia, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerAmigos } from '../../store/social';
import { PerfilAmigo } from './Profile';
import { CenterFocusStrong } from '@mui/icons-material';


export const ListaAmigos = () => {
  const handleEliminarAmigo = (idAmigo) => {
    // Aquí deberías agregar la lógica para eliminar a un amigo, como hacer una solicitud a tu API.
    console.log(`Eliminar amigo con id: ${idAmigo}`);
  };

  //const [ modalOpen, setModalOpen ] = useState(false);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);

  const handleOpenModal = (amigo) => {
    setAmigoSeleccionado(amigo);
  };

  const handleCloseModal = () => {
    setAmigoSeleccionado(null);
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
        <Grid item xs={12} sm={6} md={4} key={amigo.id_doctor} >
          <Card>
            <Avatar style={{ width: 100, height: 100 }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {amigo.nombre}
                </Typography>
                <Button size="small" color="primary" onClick={() => handleOpenModal(amigo)}>
                  Página de perfil
                </Button>
              </CardContent>
          </Card>
        </Grid>
      ))}
      
      {/* Solo renderiza un componente PerfilAmigo */}
      {amigoSeleccionado && (
        <PerfilAmigo
          open={Boolean(amigoSeleccionado)}
          onClose={handleCloseModal}
          amigo={amigoSeleccionado}
        />
      )}
    </Grid>
  );
};
