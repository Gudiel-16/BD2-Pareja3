import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setVistaActual } from '../../store/social/navigationSlice';

export const SideBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();
    const vistas = [
        {nombre: 'Perfil', vista: 'UserInformation'},
        {nombre: 'Publicaciones', vista: 'Publicaciones'},
        {nombre: 'Mis Amigos', vista: 'ListaAmigos'},
        {nombre: 'Agregar Amigos', vista: 'BusquedaAmigos'},
        {nombre: 'Mensajes', vista: 'Mensajes'},
        {nombre: 'Consultas', vista: 'VistaConsultas'}

    ]

    const handleItemClick = (vista) => {
        dispatch(setVistaActual(vista));
    }

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    Dr. { 'Nombre Apellido' }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Publicaciones','UserInformation','ListaAmigos','BusquedaAmigos','Mensajes', 'VistaConsultas'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton onClick={ ()=> handleItemClick(text) }>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text } />
                                    <ListItemText secondary={ 'Exercitation cillum irure elit consectetur.' } />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}