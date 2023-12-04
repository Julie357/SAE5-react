import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/system';
import { lime, purple } from '@mui/material/colors';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/PageClasse';
import Eleve from './Components/Eleve';
import reportWebVitals from './reportWebVitals';
import PageTexte from './Pages/PageTexte';
import PageClasse from './Components/PageClasse';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      <Router>
          <PageClasse />
          {/* <Route exact path="/" component={Home} />
          <Route path="/eleve" component={Eleve} />  Ajoutez cette ligne avec le chemin et le composant About */}
      </Router>
    {/* </ThemeProvider> */}
  </React.StrictMode>,
);


reportWebVitals();
