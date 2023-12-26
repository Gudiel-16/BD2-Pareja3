import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

export const UserInformation = ({ user }) => {
  return (
    <Grid container direction='column' spacing={2}>
      
      <Grid item>
        <Typography variant='h4' gutterBottom>
          Bienvenido {user.title} {user.name}
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
            value={user.fullName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Nombre Usuario"
            value={user.username}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Edad"
            value={user.age}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Sitio Web"
            value={user.website}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Especialidad"
            value={user.specialty}
            InputProps={{
              readOnly: true,
            }}
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
