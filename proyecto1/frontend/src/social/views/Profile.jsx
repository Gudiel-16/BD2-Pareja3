import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Link, Avatar, ListItem, List } from '@mui/material';
import { FilePresent as FilePresentIcon } from '@mui/icons-material';

// Suponiendo que tienes un objeto 'amigo' con esta información
const amigo = {
  nombreCompleto: "Doctor Dos",
  usuario: "doc2",
  edad: 35,
  sitioWeb: "doc2web",
  especialidad: "Pediatra",
  amigos: [
    // Lista de amigos
    { id: '1', nombre: 'de Tres Dr tres', perfilUrl: '/perfil/tres' },
    // ... más amigos
  ],
  cursos: [
    // Lista de cursos o archivos PDF
    { id: '1', nombre: 'Caso de paciente BD2', archivoUrl: '/path/to/archivo.pdf' },
    // ... más cursos
  ],
};

export const PerfilAmigo = () => {
  const [esAmigo, setEsAmigo] = useState(false); // Estado para controlar si ya son amigos o no

  // Funciones para manejar el estado de amistad
  const agregarAmigo = () => {
    // Lógica para agregar amigo
    setEsAmigo(true);
  };

  return (
    <Grid container spacing={2}>

      {/* Información del perfil */}
      <Grid item xs={12}>
        <Typography variant='h3'>Perfil de {amigo.nombreCompleto}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Nombre Completo: {amigo.nombreCompleto}</Typography>
            <Typography variant='h6'>Nombre de Usuario: {amigo.usuario}</Typography>
            <Typography>Edad: {amigo.edad}</Typography>
            <Typography>Sitio Web: {amigo.sitioWeb}</Typography>
            <Typography>Especialidad: {amigo.especialidad}</Typography>
          </CardContent>
          <Button
            variant='contained'
            color={esAmigo ? 'secondary' : 'primary'}
            onClick={esAmigo ? undefined : agregarAmigo}
          >
            {esAmigo ? 'Ya son amigos' : 'Agregar como amigo'}
          </Button>
        </Card>
      </Grid>

      {/* Sección de cursos */}
      <Grid item xs={12}>
        <Typography variant='h4'>Sus cursos:</Typography>
        <List>
          {amigo.cursos.map(curso => (
            <ListItem key={curso.id}>
              <FilePresentIcon />
              <Link href={curso.archivoUrl} download>{curso.nombre}</Link>
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Lista de amigos */}
      <Grid item xs={12}>
        <Typography variant='h4'>Sus amigos:</Typography>
        {amigo.amigos.map(amigo => (
          <Card key={amigo.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar />
            <CardContent>
              <Typography>{amigo.nombre}</Typography>
              <Link href={amigo.perfilUrl}>Página de perfil</Link>
            </CardContent>
          </Card>
        ))}
      </Grid>

    </Grid>
  );
};
