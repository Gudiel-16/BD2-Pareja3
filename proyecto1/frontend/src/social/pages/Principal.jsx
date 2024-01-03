import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { SocialLayout } from '../layout/SocialLayout';
import { UserInformation, Publicaciones, ListaAmigos, PerfilAmigo, BusquedaAmigos, VistaConsultas} from '../views/index';
import Mensajes from '../views/Messages';


export const Principal = () => {

    const user = {
        title: 'Dr',
        name: 'Carlos',
        fullName: 'Carlos Hernández',
        username: 'carlosh',
        age: '50',
        website: 'https://mi-sitio-web.com',
        specialty: 'Cardiología'
      };

      const vistaActual = useSelector((state) => state.navigation.vistaActual);

      const renderizarVista = () => {
        switch (vistaActual) {
          case 'UserInformation':
            return <UserInformation user={user} />;
          case 'Publicaciones':
            return <Publicaciones />;
          case 'ListaAmigos':
            return <ListaAmigos />;
          case 'PerfilAmigo':
            return <PerfilAmigo />;
          case 'BusquedaAmigos':
            return <BusquedaAmigos />;
          case 'Mensajes':
            return <Mensajes />;
          case 'VistaConsultas':
            return <VistaConsultas />;
          default:
            return <UserInformation user={user} />;
        }
      };
      
  return (
    <SocialLayout>
      {renderizarVista()}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </SocialLayout>
  )
}