// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageClasse from './Pages/PageClasse';
import ClasseInformations from './Pages/ClasseInformations';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={PageClasse} />
          <Route path="/classe-informations" element={ClasseInformations} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
