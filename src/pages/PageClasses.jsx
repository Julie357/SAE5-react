import React, {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewQuilt as ViewQuiltIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import {
  Switch,
  Pagination,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SearchComponent from '../Components/SearchComponent';
import { ThemeProvider } from '@mui/system';
import { Link } from 'react-router-dom';
import svg2 from "../assets/logo-A4ll.svg";

const PageClasses = () => {

  const theme = useTheme();
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectKey, setSelectKey] = useState(0);
  const [displayedClasses, setDisplayedClasses] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState(['6eme', '5eme', '4eme', '3eme']);
  const [selectedSort, setSelectedSort] = useState();
  const [showAllClasses, setShowAllClasses] = useState(true);
  const [formControlKey, setFormControlKey] = useState(0);   // Récupération des classes à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;   // Calcul des indices de début et de fin pour les éléments affichés
  const endIndex = startIndex + itemsPerPage;
 

  // Liste des classes
  const classes = [
    '6°1', '6°2', '6°3', '6°4', '5°1', '5°2', '5°3', '5°4', '4°1', '4°2', '4°3', '4°', '5°7', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '5°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '5°5', '6°5', '6°6', '5°6', '4°5', '4°6', '4°7', '5°8', '6°7', '6°8', '5°9', '4°8', '4°9', '4°10', '5°10', '6°9', '6°10', '5°11', '4°11', '4°12', '4°13', '5°12', '6°11', '6°12', '5°13', '4°14', '4°15', '4°16', '5°14', '6°13', '6°14', '5°15', '4°17', '4°18', '4°19', '5°16', '6°15', '6°16', '5°17', '4°20', '4°21', '4°22',
  ];

  useEffect(() => {
    const filteredClasses = showAllClasses ? classes : classes.filter(classe => selectedLevels.includes(classe.substring(0, 4)));
    setDisplayedClasses(filteredClasses);
  }, [selectedLevels, selectedSort, showAllClasses]);

  
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


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
      transform: 'scale(1.1)',  // Zoom de 10%
    },
  }));

  // const ItemMenu = styled(Paper)(({ theme }) => ({
  const ItemMenu = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
  }));
  // const Search = styled('div')(({ theme }) => ({
  //   position: 'relative',
  //   border: '1px solid black',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: '#6f69693d',
  //   '&:hover': {
  //     backgroundColor: '#ffffff40',
  //   },
  //   mx: 2,
  //   marginLeft: 0,
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  //   display: 'flex',
  //   alignItems: 'center',
  // }));

  // const SearchIconWrapper = styled('div')(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: 'inherit',
  //   '& .MuiInputBase-input': {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('md')]: {
  //       width: '20ch',
  //     },
  //   },
  //   boxShadow: 'none !important',
  // }));

  // Fonction pour trier les classes en fonction de la valeur sélectionnée dans le menu de tri
  const sortClasses = (value) => {
    setSelectedSort(value);
    const sortedClasses = [...classes];
  
    // Logique de tri en fonction de la valeur sélectionnée
    if (value === 'decroissant') {
      sortedClasses.sort((a, b) => {
        // Extraire le numéro de classe
        const numA = parseInt(a.split('°')[1]);
        const numB = parseInt(b.split('°')[1]);
    
        // Trier par numéro de classe de manière décroissante
        return numB - numA;
      });
    } else if (value === 'croissant') {
      sortedClasses.sort((a, b) => {
        // Extraire le numéro de classe
        const numA = parseInt(a.split('°')[1]);
        const numB = parseInt(b.split('°')[1]);
    
        // Trier par numéro de classe de manière croissante
        return numA - numB;
      });
    } else if (value === 'classeAvecExercice') {
      // Filtrez les classes avec exercice
      //sortedClasses = sortedClasses.filter(classe => /* condition pour les classes avec exercice */);
    } else if (value === 'classeSansExercice') {
      // Filtrez les classes sans exercice
     // sortedClasses = sortedClasses.filter(classe => /* condition pour les classes sans exercice */);
    }
  
    // Mettez à jour les classes affichées avec les classes triées
    setDisplayedClasses(sortedClasses);
  };

  const StyledLink = styled(Link)({
    textDecoration: 'none', // Désactiver le soulignement du lien
  });
 

  return (
    // <ThemeProvider theme={theme}>
      <Box>
        {/* Menu */}
        <Grid container spacing={4} sx={{ mb: 3, mt: 1, mx: 'auto', maxWidth: '1500px' }}>
          <Grid item xs={1}>
            <ItemMenu sx={{ boxShadow: 'none' }}>
              <img src="../assets/logo-A4ll.svg" alt="" />
              <div className="logodelapage">
                <img className="logo" src={svg2} alt="logo A4ll" />
            </div>
            </ItemMenu>
          </Grid>

          <Grid item xs={4}>
            <ItemMenu sx={{ color: 'white', boxShadow: 'none' }}></ItemMenu>
          </Grid>

          <Grid item xs={2}>
            <ItemMenu sx={{ boxShadow: 'none' }}>
              <FormControl fullWidth sx={{ background: '#3D6787', borderRadius: '4px' }}>
                <InputLabel sx={{ color: 'white', fontWeight: '500', border: 'none' }}>Trier</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={selectedSort}
                  onChange={(event) => sortClasses(event.target.value)}
                >
                  <MenuItem value={'croissant'}>Croissant</MenuItem>
                  <MenuItem value={'decroissant'}>Decroissant</MenuItem>
                  <MenuItem value={'classeAvecExercice'}>Classe avec exercice</MenuItem>
                  <MenuItem value={'classeSansExercice'}>Classe sans exercice</MenuItem>
                </Select>
              </FormControl>
            </ItemMenu>
          </Grid>

          <Grid item xs={2}>
            <ItemMenu sx={{ boxShadow: 'none' }}>
              <FormControl
                key={formControlKey}
                fullWidth
                sx={{ background: '#3D6787', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: 'white', fontWeight: '500' }} id="demo-simple-select-label">
                  Filtre
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  multiple
                  value={selectedLevels}
                  onChange={(event) => {
                    setSelectedLevels(event.target.value);
                    setFormControlKey(prevKey => prevKey + 1);
                  }}
                >
                  <FormControlLabel value="6eme" control={<Checkbox />} label="6eme" />
                  <FormControlLabel value="5eme" control={<Checkbox />} label="5eme" />
                  <FormControlLabel value="4eme" control={<Checkbox />} label="4eme" />
                  <FormControlLabel value="3eme" control={<Checkbox />} label="3eme" />
                </Select>
              </FormControl>
            </ItemMenu>
          </Grid>

          <Grid item xs={3}>
            <ItemMenu sx={{ boxShadow: 'none' }}>
              <SearchComponent />
            </ItemMenu>
          </Grid>
        </Grid>

        {/* Classe */}
        <Box sx={{ mx: 2, p: 2, maxWidth: '800px', m: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Stack spacing={{ xs: 1, sm: 2 }} sx={{ my: 2, justifyContent: 'center', maxWidth: '679px', }} direction="row" useFlexGap flexWrap="wrap">
            {displayedClasses.slice(startIndex, endIndex).map((classe, index) => (
              // <Link key={index} to={`/classe/${classe}`} sx={{textDecoration: 'none'}}>
              <StyledLink  key={index} to="/ensemble-classe" sx={{textDecoration: 'none'}}>
                <Item>{classe}</Item>
              </StyledLink > //fleDirection: 'column',  alignItems: 'center'
            ))}
          </Stack>

          <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Pagination count={Math.ceil(displayedClasses.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>


        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Afficher toutes les classes"
            labelPlacement="start"
            checked={showAllClasses}
            onChange={() => setShowAllClasses(!showAllClasses)}
            disabled={false}
          />
        </Box>
      </Box>
    // </ThemeProvider>
  );
};

export default PageClasses;
