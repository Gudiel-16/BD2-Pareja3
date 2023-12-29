import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { navigationSlice } from './social/navigationSlice';
import { publicacionSlice} from './social/publicacion/publicacionSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        navigation: navigationSlice.reducer,
        publicaciones: publicacionSlice.reducer,
    }
});