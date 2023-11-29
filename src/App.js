// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentCard from './pages/StudentCard';
import { useDispatch } from 'react-redux';
import { loadExercices } from './features/exercices/exerciceAction';
const App = () => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExercices());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/studentCard" element={<StudentCard/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;