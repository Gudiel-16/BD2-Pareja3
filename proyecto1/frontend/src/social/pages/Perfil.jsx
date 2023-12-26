import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { SocialLayout } from '../layout/SocialLayout';
import { UserInformation } from '../views/index';

export const Perfil = () => {

    const user = {
        title: 'Dr',
        name: 'Carlos',
        fullName: 'Carlos Hernández',
        username: 'carlosh',
        age: '50',
        website: 'https://mi-sitio-web.com',
        specialty: 'Cardiología'
      };
      
  return (
    <SocialLayout>
      
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}

      <UserInformation user={user} />

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