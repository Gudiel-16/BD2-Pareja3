import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Box, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConsultas } from '../../store/social';

const consultas = [
  { id: 1, titulo: 'Consulta 1'},
  { id: 2, titulo: 'Consulta 2'},
  { id: 3, titulo: 'Consulta 3'},
  { id: 4, titulo: 'Consulta 4'},
  { id: 5, titulo: 'Consulta 5'},

];


export const VistaConsultas = () => {
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);

  const dispatch = useDispatch();
  const { datosConsultas, loading, error } = useSelector((state) => state.consultas);
  console.log(datosConsultas)

  // Manejador para seleccionar una consulta y cargar sus datos
  const handleSelectConsulta = (consultaId) => {
    setConsultaSeleccionada(consultaId);
    dispatch(fetchConsultas(consultaId));
  };

  useEffect(() => {
    if (consultaSeleccionada) {
      dispatch(fetchConsultas(consultaSeleccionada.id));
    }
  }, [dispatch, consultaSeleccionada]);

  const renderConsultaResultado = () => {
    if (!datosConsultas) return null;
  
    if (consultaSeleccionada === 1) {
      return datosConsultas.map((dato) => (
        <Typography key={dato.categoria}>
          {dato.categoria}: {dato.total?.toLocaleString()}
        </Typography>
      ));
    } else if (consultaSeleccionada === 2) {
      return datosConsultas.map((dato) => (
        <Typography key={dato.idHabitacion}>
          {dato.habitacion}: {dato.cantidad?.toLocaleString()}
        </Typography>
      ));
    }else if (consultaSeleccionada === 3) {
      return datosConsultas.map((dato) => (
        <Typography key={dato.idGenero}>
          {dato.genero}: {dato.cantidad?.toLocaleString()}
        </Typography>
      ));
    }else if (consultaSeleccionada === 4) {
      return datosConsultas.map((dato) => (
        <Typography key={dato.idEdad}>
          Edad {dato.edad}: {dato.cantidad?.toLocaleString()}
        </Typography>
      ));
    }else if (consultaSeleccionada === 5) {
      return datosConsultas.map((dato) => (
        <Typography key={dato.idEdad}>
          Edad {dato.edad}: {dato.cantidad?.toLocaleString()}
        </Typography>
      ));
    }
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">Consultas</Typography>
        <List component="nav">
          {consultas.map((consulta) => (
            <ListItem
              button
              selected={consultaSeleccionada === consulta.id}
              onClick={() => handleSelectConsulta(consulta.id)}
              key={consulta.id}
            >
              <ListItemText primary={consulta.titulo} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={8}>
        {consultaSeleccionada && (
          <>
            <Typography variant="h6">Resultado de la Consulta</Typography>
            <Box sx={{ p: 2, borderLeft: 1, borderColor: 'divider' }}>
              {loading && <p>Cargando...</p>}
              {renderConsultaResultado()}
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};


