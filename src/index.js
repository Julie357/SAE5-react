// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/system';
import Home from './Components/PageClasse';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/system';
import { lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <Home />
  </React.StrictMode>
);

reportWebVitals();
