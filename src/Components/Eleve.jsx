import React from 'react';
import { Badge, IconButton, Chip, Typography  } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import '@fontsource/roboto/400.css';

const PageEleve = () => {
  return (
      <Badge badgeContent={+4} color="secondary" sx={{color: 'FFB5A7', width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IconButton color="primary" fontSize="large" sx={{ fontSize: 100, p:0}}>
          <PersonIcon sx={{ fontSize: 120, color: '#3D6787' }}/>
        </IconButton>
        <Typography variant="body1" sx={{ fontFamily: 'Roboto', margin: 0 }}>
          Nom Prenom
        </Typography>
        <Chip sx={{ m: 1, p: 1, fontWeight: '600', fontSize: '1rem', background: '#A1CDF1', color: 'white', borderRadius: '10px'}} label="B2" />
      </Badge>
  );
};

export default PageEleve;