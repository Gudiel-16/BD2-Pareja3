import { Button, Grid, TextField, Typography, Link, Avatar } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const UserInformation = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  console.log(user);
  
  return (
    <Grid container direction='column' spacing={2}>

      <Grid item>
        {/* Foto de perfil */}
        <Avatar 
          alt={user.nombre || 'Perfil'}
          src={user.foto || '/path/to/default-avatar.jpg'} // Ruta a la imagen de perfil o una imagen por defecto
          sx={{ width: 100, height: 100 }} // Tamaño del avatar
        />
      </Grid>

      
      <Grid item>
        <Typography variant='h4' gutterBottom>
          Bienvenido
        </Typography>
      </Grid>
      
      <Grid item container direction="column" spacing={1}>
        <Typography variant='h6'>Mi información:</Typography>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Nombre Completo"
            value={user.nombre || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Nombre Usuario"
            value={user.username || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Edad"
            value={user.edad || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Sitio Web"
            value={user.sitio_web || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Especialidad"
            value={user.especialidad || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
      
      <Grid item>
        <Button variant='contained' startIcon={<EditOutlined />}>
          Modificar mis datos
        </Button>
      </Grid>

      <Grid item container direction='column' spacing={2}>
        <Typography variant='h6'>Casos de pacientes en los que estoy trabajando:</Typography>
        
        <Grid item>
          <Button variant='contained' color='primary'>
            Agregar un PDF
          </Button>
        </Grid>
      </Grid>

    </Grid>
  )
}
