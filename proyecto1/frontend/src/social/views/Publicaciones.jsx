import { Card, CardContent, CardHeader, Avatar, Typography, CardActions, IconButton, Grid, TextField, Button } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useState } from 'react';

export const Publicaciones = () => {

    const posts = [
        {
          id: 1,
          author: "Dra. Ana Torres",
          authorAvatar: "path/to/ana-avatar.jpg",
          content: "Compartiendo mi última investigación sobre cardiología y avances recientes en la medicina.",
          date: "2023-06-12T18:30:00.000Z",
          likes: 34,
          comments: 12
        },
        {
          id: 2,
          author: "Dr. Luis Ramirez",
          authorAvatar: "path/to/luis-avatar.jpg",
          content: "Es increíble cómo la tecnología está cambiando el futuro de la atención al paciente. #tecnologíamédica",
          date: "2023-06-11T15:45:00.000Z",
          likes: 56,
          comments: 18
        },
        {
          id: 3,
          author: "Dra. María Gómez",
          authorAvatar: "path/to/maria-avatar.jpg",
          content: "Agradecida por asistir al congreso internacional de dermatología. Aprendí mucho sobre nuevos tratamientos.",
          date: "2023-06-10T12:00:00.000Z",
          likes: 42,
          comments: 9
        },
        {
          id: 4,
          author: "Dr. Jorge Espinoza",
          authorAvatar: "path/to/jorge-avatar.jpg",
          content: "Alentando a mis colegas a mantenerse activos en la comunidad médica en línea. #conectividad",
          date: "2023-06-09T09:20:00.000Z",
          likes: 19,
          comments: 4
        }
      ];

      // Estado para el nuevo post
        const [newPostContent, setNewPostContent] = useState("");

        // Manejar el cambio en el área de texto
        const handlePostChange = (event) => {
            //setNewPostContent(event.target.value);
        };

        // Manejar el envío del nuevo post
        const handlePostSubmit = () => {
            // Aquí puedes manejar la lógica para enviar el post a tu backend o añadirlo al estado
            //console.log(newPostContent);
            // Luego limpiar el estado
            //setNewPostContent("");
        };
      
  return (
    <Grid container spacing={2}>

    {/* Formulario para añadir un nuevo post */}
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
            >
            Publicar
            </Button>
        </Grid>  
      {posts.map((post, index) => (
        <Grid item key={index} xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={
                <Avatar src={post.authorAvatar}>
                  {post.author[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`Dr. ${post.author}`}
              subheader={post.date}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {/* Aquí puedes agregar acciones como 'Me gusta', 'Comentar', etc. */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
