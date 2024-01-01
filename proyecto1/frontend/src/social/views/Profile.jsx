import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Grid, Link, Avatar, ListItem, List, Dialog , DialogActions, ListItemIcon, ListItemText} from '@mui/material';
import { FilePresent as FilePresentIcon, PictureAsPdf } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerAmigosDeAmigos, obtenerDatosUsuario } from '../../store/social';

// Suponiendo que tienes un objeto 'amigo' con esta información

export const PerfilAmigo = ( {open, onClose, amigo}) => {
  const [esAmigo, setEsAmigo] = useState(true); // Estado para controlar si ya son amigos o no

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.usuario?.user);
  const amigos = useSelector((state)=> state.amigos.amigosDeAmigos);

  // Funciones para manejar el estado de amistad
  const agregarAmigo = () => {
    // Lógica para agregar amigo
    setEsAmigo(true);
  };

  useEffect(() => {
    if (amigo && amigo.id_doctor) {
      dispatch(obtenerDatosUsuario(amigo.id_doctor));
    }
  }, [dispatch, amigo?.id_doctor]);

  useEffect(() => {
    dispatch(obtenerAmigosDeAmigos(amigo.id_doctor));
  },[dispatch]);

  const abrirPDFBase64EnNuevaPestana = (pdfBase64) => {
    try {
      // Elimina el prefijo si existe
      const base64 = pdfBase64.split(',')[1] || pdfBase64;
      const pdfBlob = base64ToBlob(base64, 'application/pdf');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };
  
  const base64ToBlob = (base64, mimeType) => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    } catch (error) {
      throw new Error('Error al convertir base64 a Blob');
    }
  };
  


  return (
    <Dialog open={open} onClose={ onClose } fullWidth maxWidth='md'>
    <Grid container spacing={2}>

      {/* Información del perfil */}
      <Grid item xs={12}>
        <Typography variant='h3'>Dr.{amigo.username}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Nombre: {amigo.nombre}</Typography>
            <Typography variant='h6'>Nombre de Usuario: {amigo.username}</Typography>
            <Typography>Edad: {amigo.edad}</Typography>
            <Typography>Sitio Web: {amigo.sitio_web}</Typography>
            <Typography>Especialidad: {amigo.especialidad}</Typography>
          </CardContent>
          <Button
            variant='contained'
            color={esAmigo ? 'secondary' : 'primary'}
            onClick={esAmigo ? undefined : agregarAmigo}
            style={{ margin: '0 auto', marginBottom: 16, display: 'block' }}
          >
            {esAmigo ? 'Ya son amigos' : 'Agregar como amigo'}
           
          </Button>
        </Card>
        
      </Grid>


      {/* Sección de casos */}
      <Grid item>
          <List>
          {userInfo.docs.map((doc, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <PictureAsPdf /> 
              </ListItemIcon>
              <ListItemText primary={doc.nombre} />
              <Button 
                color="primary" 
                onClick={() => abrirPDFBase64EnNuevaPestana(doc.pdf, doc.nombre)}
              >
                Ver
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Lista de amigos */}
      <Grid item xs={12}>
        <Typography variant='h4'>Sus amigos:</Typography>
        {amigos.map(amigo => (
          <Card key={amigo.id_doctor} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar />
            <CardContent>
              <Typography>{amigo.nombre}</Typography>
              {/* <Link href={amigo.perfilUrl}>Página de perfil</Link> */}
            </CardContent>
          </Card>
        ))}
      </Grid>

    </Grid>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
