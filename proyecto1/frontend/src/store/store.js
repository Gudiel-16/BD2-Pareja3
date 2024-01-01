import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { navigationSlice } from './social/navigationSlice';
import { userSlice, amigosSlice, publicacionSlice, consultasSlice} from './social'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        navigation: navigationSlice.reducer,
        publicaciones: publicacionSlice.reducer,
        usuario: userSlice.reducer,
        amigos: amigosSlice.reducer,
        consultas : consultasSlice.reducer

    }
});