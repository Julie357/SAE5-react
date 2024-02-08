import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentCard from './pages/StudentCard';
import { useDispatch } from 'react-redux';
import { loadErrorsStats, loadExercices } from './features/exercices/exerciceAction';
import '@fontsource/itim';
import ExercicesList from './pages/ExercicesList';
import PageTexte from './pages/PageTexte'
import StudentsList from './pages/StudentsList';
import Page404 from './pages/404';
import { ThemeProvider } from "@mui/material";
import theme from './theme';
import D3GraphBulle from './pages/components/GraphBulle/D3GraphBulle'
import { loadStudents } from './features/students/studentAction';
import {loadClasses} from './features/classes/classAction';
import { loadLexical } from './features/lexical/lexicalAction';

const App = () => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExercices());
    dispatch(loadErrorsStats());
    dispatch(loadStudents());
    dispatch(loadClasses());
    dispatch(loadLexical());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/studentsList/:idClass" element={<StudentsList />} />
          <Route path="/studentCard/:idStudent" element={<StudentCard />} />
          <Route path="/exercicesList/:idStudent" element={<ExercicesList />} />
          <Route path="/texte/:idExercise" element={<PageTexte />} />
          <Route path="/vizu-j" element={<D3GraphBulle />}/>
          <Route path="/classe" element={<StudentsList />}/>
          <Route exact path="*" element={<Page404/>} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
    
  );
};

export default App;
