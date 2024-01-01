import { Card, CardContent, CardHeader, Avatar, Typography, CardActions, IconButton, Grid, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearPublicacion, fetchPublicaciones, fetchPublicacionesDeAmigos } from '../../store/social/publicacion/publicacionThunks';

export const Publicaciones = () => {
    const dispatch = useDispatch();
    const { publicaciones, publicacionesAmigos,loading, error } = useSelector((state) => state.publicaciones);
    const [newPostContent, setNewPostContent] = useState('');

    const userString = localStorage.getItem('user');
    const { id_doctor } = userString ? JSON.parse(userString) : null;

    useEffect(() => {
      dispatch(fetchPublicaciones(id_doctor));
      dispatch(fetchPublicacionesDeAmigos(id_doctor));
    }, [dispatch, id_doctor]);

    const handlePostChange = (event) => {
        setNewPostContent(event.target.value);
    };

    const handlePostSubmit = () => {
      if (!newPostContent.trim()) return; // Previene la creación de publicaciones vacías
      const newPost = {
        id_doctor: id_doctor,
        texto: newPostContent,
        fecha: new Date().toISOString()
      };
      dispatch(crearPublicacion(newPost))
        .unwrap() // Unwrap es necesario para manejar promesas con createAsyncThunk
        .then(() => dispatch(fetchPublicaciones(id_doctor))) // Recargar publicaciones después de crear una
        .catch(() => {}); // Manejar errores si es necesario
      setNewPostContent('');
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' gutterBottom>Añadir una publicación:</Typography>
          <TextField
            label="¿Qué estás pensando?"
            multiline
            rows={4}
            value={newPostContent}
            onChange={handlePostChange}
            variant="outlined"
            fullWidth
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handlePostSubmit}
            sx={{ mt: 2 }}
            disabled={loading} // Deshabilita durante la carga
          >
            Publicar
          </Button>
        </Grid>
        {loading && <CircularProgress />} 
        {error && <Alert severity="error">{error}</Alert>}
        {publicaciones.map((post, index) => (
        <Grid item key={index} xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={
                post.autor
                  ? <Avatar>{post.autor[0]}</Avatar> // Primer letra del nombre del autor
                  : <Avatar /> // Avatar por defecto si no hay autor
              }
              title={post.autor || "Anónimo"} // Nombre del autor o "Anónimo" si no está disponible
              subheader={new Date(post.fecha).toLocaleString()} // Formatea la fecha
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.texto}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {publicacionesAmigos.map((post, index) => (
        <Grid item key={index} xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={
                post.autor
                  ? <Avatar>{post.autor[0]}</Avatar> // Primer letra del nombre del autor
                  : <Avatar /> // Avatar por defecto si no hay autor
              }
              title={post.autor || "Anónimo"} // Nombre del autor o "Anónimo" si no está disponible
              subheader={new Date(post.fecha).toLocaleString()} // Formatea la fecha
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.texto}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
    );
};
