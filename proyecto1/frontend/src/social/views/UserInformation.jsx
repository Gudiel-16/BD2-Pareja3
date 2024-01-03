import { Button, Grid, TextField, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { EditOutlined, PictureAsPdf } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { actualizarFotoPerfil, actualizarUsuario , subirPDF, obtenerDatosUsuario} from '../../store/social/user/userThunks';
import { MyPdfViewer } from '../../ui/components';

export const UserInformation = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.usuario?.user);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);


  const [username, setUsername] = useState(user.username || '');
  const [website, setWebsite] = useState(user.sitio_web || '');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handleOpenPdfViewer = (file) => {
    setSelectedPdfFile(file);
    setIsPdfViewerOpen(true);
  };

  const handleClosePdfViewer = () => {
    setIsPdfViewerOpen(false);
  };
  
  

  const handleOpenPdf = (base64String) => {
    const cleanBase64String = base64String.split(',')[1] || base64String;
    try {
      const decodedData = atob(cleanBase64String);
      setSelectedPdf({ data: decodedData });
      setIsPdfViewerOpen(true);  // Abrir el modal al seleccionar un PDF
    } catch (error) {
      console.error("Error al decodificar el PDF", error);
    }
  };
  
  
  

  useEffect(() => {
    if (user && user.id_doctor) {
      dispatch(obtenerDatosUsuario(user.id_doctor));
    }
  }, [dispatch, user?.id_doctor]);

  const handleUpdateUserInfo = () => {
    const updatedUser = { ...user, username, sitio_web: website };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Aquí también puedes despachar una acción para actualizar la información en el backend
    dispatch(actualizarUsuario({
      id_doctor: user.id_doctor, 
      username: username, 
      sitio_web: website
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Actualiza selectedFile con la nueva imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFilePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPDF(file);
    } else {
      alert("Por favor selecciona un archivo PDF.");
    }
  };

  const handleUpload = () => {
    if (selectedFile && user) {
      const foto = selectedFile.split(',')[1]; // Obtener solo la parte de datos en base64

      user.foto = foto
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(actualizarFotoPerfil({ id_doctor: user.id_doctor, foto }));
    }
  };

  const handleUploadPDF = async () => {
    if (selectedPDF) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedPDF);
      reader.onloadend = () => {
        const base64PDF = reader.result;

        // Aquí despachas la acción con los datos necesarios
        dispatch(subirPDF({ id_doctor: user.id_doctor, nombre: selectedPDF.name, pdf: base64PDF }));
      };
      reader.onerror = () => {
        console.error("Hubo un error al leer el archivo.");
      };
    }
  };


  const { loading } = useSelector((state) => state.usuario);



  return (
    <Grid container direction='column' spacing={2}>

      <Grid item>
        <Avatar src={`data:image/png;base64,${user.foto}`} alt={user?.nombre} style={{ width: 100, height: 100 }} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
          Actualizar Foto
        </Button>
      </Grid>

      
      <Grid item>
        <Typography variant='h4' gutterBottom>
          Bienvenido
        </Typography>
      </Grid>
      
      <Grid item container direction="column" spacing={1}>
        <Typography variant='h6'>Mi información:</Typography>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Nombre Completo"
            value={user.nombre || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Nombre Usuario"
            value={username}
            onChange={handleUsernameChange} // Permitir edición
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Edad"
            value={user.edad || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Sitio Web"
            value={website}
            onChange={handleWebsiteChange} // Permitir edición
          />
        </Grid>
        
        <Grid item>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Especialidad"
            value={user.especialidad || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
      
      <Grid item>
        <Button 
          variant='contained' 
          startIcon={<EditOutlined />}
          onClick={handleUpdateUserInfo}
        >
          Modificar mis datos
        </Button>
      </Grid>
      <Grid item container direction='column' spacing={2}>
        <Typography variant='h6'>Casos de pacientes en los que estoy trabajando:</Typography>
        
        <Grid item>
          <input type="file" accept="application/pdf" onChange={handleFilePdfChange} />
          <Button variant='contained' onClick={handleUploadPDF}>Subir PDF</Button>
        </Grid>
      </Grid>
      <Grid item>
        <List>
          {userInfo.docs.map((doc, index) => (
            <ListItem key={index} button onClick={() => handleOpenPdf(doc.pdf)}>
              <ListItemIcon>
                <PictureAsPdf/> 
              </ListItemIcon>
              <ListItemText primary={doc.nombre} />
              <Button 
                color="primary" 
                href={`data:application/pdf;base64,${doc.pdf}`}
                download={doc.nombre}
              >
                Descargar
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item>
          {selectedPdf && (
            <MyPdfViewer
              file={selectedPdf}
              open={isPdfViewerOpen}
              onClose={handleClosePdfViewer}
            />
          )}
      </Grid>
    </Grid>
  )
}
