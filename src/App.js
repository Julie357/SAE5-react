// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import StudentCard from './pages/StudentCard';
const App = () => {
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