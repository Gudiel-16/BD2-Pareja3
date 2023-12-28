import React, { useState } from 'react';
import { List, ListItem, ListItemText, Box, Typography, Divider, Grid } from '@mui/material';

const consultas = [
  { id: 1, titulo: 'Consulta 1', resultado: { pediatrico: 92200, medianaEdad: 8500, geriatrico: 25000 } },
  { id: 2, titulo: 'Consulta 2', resultado: { pediatrico: 88000, medianaEdad: 7600, geriatrico: 29000 } },
  { id: 3, titulo: 'Consulta 3', resultado: { pediatrico: 94000, medianaEdad: 8000, geriatrico: 27000 } },
  { id: 4, titulo: 'Consulta 4', resultado: { pediatrico: 91000, medianaEdad: 8200, geriatrico: 26000 } },
  { id: 5, titulo: 'Consulta 5', resultado: { pediatrico: 96000, medianaEdad: 8400, geriatrico: 28000 } },
];

export const VistaConsultas = () => {
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(consultas[0]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">Consultas</Typography>
        <List component="nav">
          {consultas.map((consulta) => (
            <ListItem
              button
              selected={consultaSeleccionada.id === consulta.id}
              onClick={() => setConsultaSeleccionada(consulta)}
              key={consulta.id}
            >
              <ListItemText primary={consulta.titulo} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="h6">Resultado de la Consulta</Typography>
        <Box sx={{ p: 2, borderLeft: 1, borderColor: 'divider' }}>
          <Typography>Pediátrico: {consultaSeleccionada.resultado.pediatrico.toLocaleString()}</Typography>
          <Typography>Mediana Edad: {consultaSeleccionada.resultado.medianaEdad.toLocaleString()}</Typography>
          <Typography>Geríatrico: {consultaSeleccionada.resultado.geriatrico.toLocaleString()}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
