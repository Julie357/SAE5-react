// theme.js
import { createTheme } from '@mui/system';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
  text: {
    secondary: lime, // Assurez-vous que cette propriété est correcte
  },
  // Ajoutez d'autres propriétés du thème ici...
});
  // Ajoutez d'autres propriétés du thème ici


export default theme;
