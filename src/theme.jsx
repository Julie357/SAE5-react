import { createTheme } from "@mui/material";
import "@fontsource/itim";

const theme = createTheme({
    typography: {
      fontFamily: "itim",
      color: "#2B3643"
    },
    palette: {
      text: {
        primary: '#121C28', // Couleur principale du texte
        secondary: '#2B3643', // Couleur du texte secondaire
      },
      primary: {
        main: "#FFB5A7",
        dark: "#FFA08F",
        light: "#FCD5CE",
      },
      secondary: {
        light: "#757ce8",
        main: "#D8ECFC",
        dark: "#3D6787",
      },
      success: {
        main: "#A1CDF1"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'itim';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
          }
        `,
      },
    },
  });

export default theme;