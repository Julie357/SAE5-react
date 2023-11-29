// src/App.js
import React from 'react';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <Routes>
        <Route>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="*" element={<Page404/>} />
        
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
