import React from 'react';
import { Badge, IconButton, Chip, Typography  } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const PageEleve = () => {
  return (
    <Badge badgeContent={+4} color="primary" sx={{width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <IconButton color="primary" fontSize="large" sx={{ fontSize: 100, p:0}}>
        <PersonIcon sx={{ fontSize: 100, color: '#56606a' }}/>
      </IconButton>
      <Typography variant="body1" sx={{ fontFamily: 'Roboto', margin: 0 }}>
        Nom Prenom
      </Typography>
      <Chip sx={{ m: 1, p: 1, fontWeight: '600', fontSize: '1rem'}} label="B2" />
    </Badge>
  );
};

export default PageEleve;