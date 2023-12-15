import React, { useState, useEffect } from 'react';
import { Chip, Stack, Box, Autocomplete, TextField, Drawer, Button, Grid, Link } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Eleve from '../Components/Eleve';
import { styled, useTheme } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DrawerClasse from './DashClasse.jsx'
const EnsembleClasse = () => {
  const [eleves, setEleves] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const nombreEleves = Math.floor(Math.random() * (35 - 25 + 1)) + 25;

    const listeEleves = Array.from({ length: nombreEleves }, (_, index) => ({
      id: index + 1,
      nom: `Nom${index + 1}`,
      prenom: `Prenom${index + 1}`,
      classe: '3°6',
    }));

    setEleves(listeEleves);
  }, []);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const theme = useTheme();

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FCD5CE',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '1.5rem',
    borderRadius: '20px',
    fontFamily: 'Itim, sans-serif',
    fontWeight: 'bold',
    color: 'black',
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'scale(1.1)',
    },
  }));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box sx={{background: '#D9D9D9', boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.25)',  width: '100%', height: '5%'}} onClick={handleDrawerOpen}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button sx={{background: '#D9D9D9',}}>
            <KeyboardArrowDownIcon/>
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '5% 10%' }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="3°6"
            component="a"
            href="#basic-chip"
            clickable
            sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
          />
          <Chip
            label={`${eleves.length} élèves`}
            component="a"
            variant="outlined"
            sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
          />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            label="3°6"
            component="a"
            sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
            avatar={<FilterListIcon sx={{ marginRight: 0.5, color: '#fff !important' }} />}
          />
          <Chip
            label='Tri'
            component="a"
            variant="outlined"
            sx={{ background: '#3D6787', color: '#fff', fontFamily: 'Itim', fontSize: '15px', fontWeight: 400 }}
            avatar={<FilterListIcon sx={{ marginRight: 0.5, color: '#fff !important' }} />}
          />
        </Stack>
        
      </Box>

      <Drawer anchor="top" open={drawerOpen} onClose={handleDrawerClose}>
        <Box>
          <DrawerClasse />
          <Button variant="outlined" onClick={handleDrawerClose}>
            Fermer
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ mx: 2, p: 2, maxWidth: '900px', m: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Stack spacing={{ xs: 2, sm: 3 }} sx={{ my: 2, justifyContent: 'center', maxWidth: '800px' }} direction="row" useFlexGap flexWrap="wrap">
          {eleves.slice(startIndex, endIndex).map((eleve, index) => (
            <StyledLink key={index} to="/studentCard" sx={{ textDecoration: 'none' }}>
              <RouterLink to="/studentCard" style={{ textDecoration: 'none' }}>
                <Eleve nom={eleve.nom} prenom={eleve.prenom} classe={eleve.classe} />
              </RouterLink>
            </StyledLink>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default EnsembleClasse;
 