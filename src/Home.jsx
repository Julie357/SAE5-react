// src/MonComposant.jsx
import React from 'react';
import Eleve from './Compoments/Eleve';
import Classe from './Compoments/Classe';

const Home = () => {
  return (
    <div
      sx={{padding: 20, backgroundColor: '#f0f0f0' }}
    >
      <h1>Bienvenue dans mon projet React</h1>
      <p>Ceci est un composant JSX de base.</p>
      <Eleve />
      <Classe />
    </div>
  );
};

export default Home;
