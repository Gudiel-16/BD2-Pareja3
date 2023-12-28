import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider, TextField, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Mensajes = () => {
  const [conversaciones, setConversaciones] = useState([
    { id: 1, nombre: 'Dos Dr Dos', ultimoMensaje: 'Continúe su discusión' },

  ]);
  const [conversacionActiva, setConversacionActiva] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const seleccionarConversacion = (conversacion) => {
    setConversacionActiva(conversacion);
  };

  const enviarMensaje = () => {
    console.log('Enviar mensaje:', mensaje);
    // Aquí implementarías la lógica para enviar el mensaje a la conversación activa
    setMensaje('');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" gutterBottom>
          Mensajes
        </Typography>
        <Divider />
        <List>
          {conversaciones.map((conversacion) => (
            <ListItem button key={conversacion.id} onClick={() => seleccionarConversacion(conversacion)}>
              <ListItemText primary={conversacion.nombre} secondary={conversacion.ultimoMensaje} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6" gutterBottom>
          {conversacionActiva ? `Conversación con ${conversacionActiva.nombre}` : 'Selecciona una conversación'}
        </Typography>
        <Divider />
        {/* Aquí iría el componente o la lógica para mostrar los mensajes de la conversación activa */}
        <Box sx={{ my: 2 }}>
          {/* Simulación de la conversación */}
          <Typography variant="body1">Hola doctor Dos, ¿cómo se encuentra?</Typography>
          <Typography variant="body2" color="text.secondary">12/02/2023 | 07</Typography>
        </Box>
        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 2 }}>
          <TextField
            fullWidth
            label="Escribe un mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={enviarMensaje}>
            Enviar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Mensajes;
