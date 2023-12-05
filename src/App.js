// src/App.js
import React from 'react';
import Home from './Home';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageClasse from './PageClasse';
import ClasseInfoamtions from './Pages/ClasseInfoamtions';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={PageClasse} />
          {/* <Route path="/classe/:classeId" component={ClasseInfoamtions} /> */}
          <Route path="/classe/3" component={ClasseInfoamtions} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
