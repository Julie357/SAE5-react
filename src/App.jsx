// src/App.js
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <div className="App">
            <Home />
          </div>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
