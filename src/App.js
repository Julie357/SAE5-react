// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentCard from './pages/StudentCard';
import { useDispatch } from 'react-redux';
import { loadExercices } from './features/exercices/exerciceAction';
import '@fontsource/itim';
import ExercicesList from './pages/ExercicesList';
import { ThemeProvider } from "@mui/material";
import theme from './theme';

const App = () => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExercices());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/studentCard" element={<StudentCard/>} />
          <Route path="/exercicesList" element={<ExercicesList/>} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
    
  );
};

export default App;