import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';


import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAtuhenication } from '../../store/auth/thunks';

export const Login = () => {

  const dispatch = useDispatch();

  const { status } = useSelector(state => state.auth);


  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  })

  const isAuthenticating = useMemo( () => status === 'cheking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(checkingAtuhenication());
  }


    return (
      <AuthLayout title="Login">
        <form onSubmit={ onSubmit }>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <TextField 
                  label="email" 
                  type="text" 
                  placeholder='user@gmail.com' 
                  fullWidth
                  name='email'
                  value={ email } 
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
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button
                    disabled={ isAuthenticating } 
                    type='submit' variant='contained' fullWidth>
                    Login
                  </Button>
                </Grid>
                
              </Grid>
  
  
              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
  
            </Grid>
  
  
          </form>
  
      </AuthLayout>
    )
  }