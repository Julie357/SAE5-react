import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentCard from './pages/StudentCard';
import { useDispatch } from 'react-redux';
import { loadErrorsStats, loadExercices } from './features/exercices/exerciceAction';
import '@fontsource/itim';
import ExercicesList from './pages/ExercicesList';
import PageClasses from './pages/PageClasses';
import PageTexte from './pages/PageTexte'
import EnsembleClasse from './pages/EnsembleClasse';
import Page404 from './pages/Page404';
import { ThemeProvider } from "@mui/material";
import theme from './theme';
import D3GraphBulle from './pages/components/GraphBulle/D3GraphBulle';

const App = () => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExercices());
    dispatch(loadErrorsStats());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/studentCard" element={<StudentCard/>} />
          <Route path="/exercicesList" element={<ExercicesList/>} />
          <Route path="/pageClasse" element={<PageClasses/>} />
          <Route path="/texte" element={<PageTexte />} />
          <Route path="/classe" element={<EnsembleClasse />}/>
          <Route path="/vizu-j" element={<D3GraphBulle />}/>
          <Route exact path="*" element={<Page404/>} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
    
  );
};

export default App;
