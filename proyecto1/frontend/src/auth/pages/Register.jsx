import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/auth/thunks';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { nombre, username, correo, edad, especialidad, password, onInputChange, formState } = useForm({
    nombre: '',
    username: '',
    correo: '',
    edad: '',
    especialidad: '',
    password: ''
  });

  const { status } = useSelector(state => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [status]);


  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/auth/login");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(formState);

    dispatch(  registerUser( formState ) );

  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre" 
                type="text" 
                placeholder='Nombre' 
                fullWidth
                name='nombre'
                value={ nombre }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="username" 
                type="text" 
                placeholder='username' 
                fullWidth
                name='username'
                value={ username }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="correo" 
                type="text" 
                placeholder='correo@google.com' 
                fullWidth
                name='correo'
                value={ correo }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Edad" 
                type="text" 
                placeholder='Edad' 
                fullWidth
                name='edad'
                value={ edad }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Especialidad" 
                type="text" 
                placeholder='Especialidad' 
                fullWidth
                name='especialidad'
                value={ especialidad }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>

                <Button 
                  type='submit'
                  variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Registro Exitoso"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Usuario creado correctamente.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>

          </Grid>


        </form>

    </AuthLayout>
  )
}