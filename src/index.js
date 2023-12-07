import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import PageClasses from './Pages/PageClasse';
import ClasseInformations from './Pages/ClasseInformations';
import PageTexte from './Pages/PageTexte'
import EnsembleClasse from './Pages/EnsembleClasse';
import Page404 from './Pages/Page404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path="/" element={<PageClasses />} />
        <Route path="/classe-informations" element={<ClasseInformations />} />
        <Route path="/texte" element={<PageTexte />} />
        <Route path="/classe" element={<EnsembleClasse />}/>
        <Route exact path="*" element={<Page404/>} />

      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
