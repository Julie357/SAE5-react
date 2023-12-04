// src/App.js
import React from 'react';
import Home from './Home';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme.js';

function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <Home />
      {/* </ThemeProvider> */}
      
    </div>
  );
}

export default App;
