import React from 'react';
import { Badge, IconButton, Chip, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import person from "../assets/person.svg";

const PageEleve = () => {
  // Liste de noms et prénoms
  const names = ['John', 'Jane', 'Alex', 'Emily', 'Chris'];
  const surnames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

  // Générer un index aléatoire
  const randomIndex = Math.floor(Math.random() * names.length);

  // Extraire un nom et un prénom de la liste
  const randomName = names[randomIndex];
  const randomSurname = surnames[randomIndex];


  const niveaux = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const randomNiveau = niveaux[Math.floor(Math.random() * niveaux.length)];

  return (
    <Badge
      badgeContent={Math.round(Math.random() * 5)} // Générer un nombre aléatoire entre 0 et 10
      color="primary"
      sx={{ color: 'FFB5A7', width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <IconButton color="primary" fontSize="large" sx={{ fontSize: 100, p: 0 }}>
      <PersonIcon
        sx={{
          fontSize: 120,
          color: '#3D6787',
          opacity: '0.7',
          transition: 'transform 0.3s, box-shadow 0.3s', // Ajouter une transition pour une animation fluide
          '&:hover': {
            transform: 'scale(1.05)', // Zoom de 20% au survol
          },
        }}
      />
       {/* <Box className="logodelapage" >
          <img className="logo" src={person} alt="logo A4ll" />
      </Box> */}

      </IconButton>
      <Typography variant="body1" sx={{color: "#000"}}>
        {`${randomName} ${randomSurname}`}
      </Typography>
      <Chip
        sx={{ m: 0.5, px: 0.5, fontWeight: '600', fontSize: '1rem', background: '#71aedf', color: 'white', borderRadius: '10px', height: '24px'}}
        label={randomNiveau}
      />
    </Badge>
  );
};

export default PageEleve;
