// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk para obtener información del perfil del usuario
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`tu_endpoint/api/profile/${userId}`);
      if (!response.ok) throw new Error('No se pudo obtener la información del perfil.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk para actualizar el perfil del usuario
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`tu_endpoint/api/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Incluir token de autenticación si es necesario
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('No se pudo actualizar la información del perfil.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk para agregar un archivo PDF al perfil del usuario
export const addUserPDF = createAsyncThunk(
  'user/addUserPDF',
  async ({ userId, pdfData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`tu_endpoint/api/profile/add-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Incluir token de autenticación si es necesario
        },
        body: JSON.stringify({ userId, pdf: pdfData }),
      });
      if (!response.ok) throw new Error('No se pudo agregar el archivo PDF.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    // Puedes agregar más estados aquí según sea necesario
  },
  reducers: {
    // Reducers síncronos aquí si es necesario
  },
  extraReducers: {
    [fetchUserProfile.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Reducers para los otros thunks...
  },
});

export default userSlice.reducer;
