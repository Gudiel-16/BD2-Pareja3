import { createSlice } from '@reduxjs/toolkit';
import { actualizarFotoPerfil,obtenerDatosUsuario, subirPDF } from './userThunks';

const initialState = {
  user: {
    id_doctor: '',
    nombre: '',
    username: '',
    foto: '',
    correo: '',
    edad: 0,
    especialidad: '',
    sitio_web: '',
    docs: [], // Lista de PDFs
  },
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Aquí puedes agregar reducers para otras acciones síncronas si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(actualizarFotoPerfil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarFotoPerfil.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }; // Actualizar la información del usuario
        state.loading = false;
      })
      .addCase(actualizarFotoPerfil.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(obtenerDatosUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerDatosUsuario.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(obtenerDatosUsuario.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(subirPDF.fulfilled, (state, action) => {
        // Asegúrate de que la respuesta del servidor incluye la información del nuevo PDF
        if (action.payload && action.payload.pdfInfo) {
          state.user.docs.push(action.payload.pdfInfo);
        }
      });
      
    // Puedes continuar agregando otros casos aquí
  },
});

export default userSlice.reducer;
