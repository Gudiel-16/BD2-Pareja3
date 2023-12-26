// En Apptheme.jsx
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from "@mui/material";
import { cyanTheme } from "./"; // Asegúrate de que la ruta sea correcta aquí

const Apptheme = ({ children }) => {
  return (
    <ThemeProvider theme={cyanTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Apptheme;
