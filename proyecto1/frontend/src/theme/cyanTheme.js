import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";


export const cyanTheme = createTheme({
    palette: {
        primary: {
            main: cyan[500],
        },
        secondary: {
            main: cyan[500],
        },
    },
    error: {
        main: "#f44336",
    }
});
