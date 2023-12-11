import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import SortClasse from './components/SortClasse';
import SearchComponent from '../Components/SearchComponent';
import svg2 from "../assets/logo-A4ll.svg";
import { styled } from '@mui/system';
import { FormControlLabel } from '@mui/material';
import Stack from '@mui/system/Stack';
import FilterClasse from './components/FilterClasse';
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";


const PageClasses = () => {
  const [selectedSort, setSelectedSort] = useState("alphabetique"); // Assurez-vous d'initialiser avec la valeur par défaut
  const [sortedClasses, setSortedClasses] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectKey, setSelectKey] = useState(0);
  const [displayedClasses, setDisplayedClasses] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState(['6eme', '5eme', '4eme', '3eme']);
  const [showAllClasses, setShowAllClasses] = useState(true);
  const [formControlKey, setFormControlKey] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorSort, setAnchorSort] = useState(null);
  const [anchorFilter, setAnchorFilter] = useState(null);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;   // Calcul des indices de début et de fin pour les éléments affichés
  const endIndex = startIndex + itemsPerPage;
  // Liste des classes
  const classes = [
    '6°1', '6°2', '6°3', '6°4', '5°1', '5°2', '5°3', '5°4', '4°1', '4°2', '4°3', '4°', '5°7', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '5°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '6°1', '6°2', '6°3', '4°2', '4°3', '4°', '5°5', '6°5', '6°6', '5°6', '4°5', '4°6', '4°7', '5°8', '6°7', '6°8', '5°9', '4°8', '4°9', '4°10', '5°10', '6°9', '6°10', '5°11', '4°11', '4°12', '4°13', '5°12', '6°11', '6°12', '5°13', '4°14', '4°15', '4°16', '5°14', '6°13', '6°14', '5°15', '4°17', '4°18', '4°19', '5°16', '6°15', '6°16', '5°17', '4°20', '4°21', '4°22',
  ];

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  useEffect(() => {
    const filteredClasses = showAllClasses ? classes : classes.filter(classe => selectedLevels.includes(classe.substring(0, 4)));
    setDisplayedClasses(filteredClasses);

  }, [selectedLevels, selectedSort, showAllClasses, filterValue]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSort = (event) => {
    setAnchorSort(event.currentTarget);
    setOpenSort((prevOpenSort) => !prevOpenSort);
  };

  const toggleFilter = (event) => {
    setAnchorFilter(event.currentTarget);
    setOpenFilter((prevOpenSort) => !prevOpenSort);
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
      transform: 'scale(1.1)',
    },
  }));

  const ItemMenu = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  const sortClasses = (value) => {
    setSelectedSort(value);
    const sortedClasses = [...classes];

    if (value === 'decroissant') {
      sortedClasses.sort((a, b) => {
        const numA = parseInt(a.split('°')[1]);
        const numB = parseInt(b.split('°')[1]);
        return numB - numA;
      });
    } else if (value === 'croissant') {
      sortedClasses.sort((a, b) => {
        const numA = parseInt(a.split('°')[1]);
        const numB = parseInt(b.split('°')[1]);
        return numA - numB;
      });
    } else if (value === 'classeAvecExercice') {
      // Filtrez les classes avec exercice
    } else if (value === 'classeSansExercice') {
      // Filtrez les classes sans exercice
    }

    setDisplayedClasses(sortedClasses);
  };

  return (
    <Box>
      {/* Menu */}
      <Grid container spacing={4} sx={{ mb: 3, mt: 1, mx: 'auto', maxWidth: '1500px' }}>
        <Grid item xs={1}>
          <ItemMenu sx={{ boxShadow: 'none' }}>
            <div className="logodelapage">
              <img className="logo" src={svg2} alt="logo A4ll" />
            </div>
          </ItemMenu>
        </Grid>

        <Grid item xs={4}>
          <ItemMenu sx={{ color: 'white', boxShadow: 'none' }}></ItemMenu>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={toggleSort}
          >
            Tri
          </Button>
          <Menu
            id="sort-menu"
            aria-labelledby="sort-menu-button"
            open={openSort}
            anchorEl={anchorSort}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            sx={{ marginTop: "7vh" }}
            onClose={() => setOpenSort(false)}
          >
            <SortClasse onSortChange={sortClasses} />
          </Menu>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" onClick={toggleFilter} startIcon={<TuneIcon />}>
            Filtre
          </Button>
          <Menu
            id="filter-menu"
            aria-labelledby="filter-menu-button"
            open={openFilter}
            anchorEl={anchorFilter}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            sx={{ marginTop: '7vh' }}
            onClose={() => setOpenFilter(false)}
          >
            <FilterClasse onFilterChange={(newFilter) => setFilterValue(newFilter)} />
          </Menu>

        </Grid>

        <Grid item xs={3}>
          <ItemMenu sx={{ boxShadow: 'none' }}>
            <SearchComponent />
          </ItemMenu>
        </Grid>
      </Grid>

      {/* Classe */}
      <Box sx={{ mx: 2, p: 2, maxWidth: '800px', m: 'auto',textDecoration: 'none', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Stack spacing={{ xs: 1, sm: 2 }} sx={{ my: 2, justifyContent: 'center', maxWidth: '679px', textDecoration: 'none' }} direction="row" useFlexGap flexWrap="wrap">
          {displayedClasses.slice(startIndex, endIndex).map((classe, index) => (
            <Link key={index} to="/classe" sx={{ textDecoration: 'none' }}>
              <Item sx={{textDecoration: 'none'}}>{classe}</Item>
            </Link>
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
  );
};

export default PageClasses;