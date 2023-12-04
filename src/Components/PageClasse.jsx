import React from 'react';
import Box from '@mui/material/Box';
import { ViewList as ViewListIcon, ViewModule as ViewModuleIcon, ViewQuilt as ViewQuiltIcon, ArrowBack as ArrowBackIcon,ArrowForward as ArrowForwardIcon} from '@mui/icons-material';
import {ToggleButton, ToggleButtonGroup, Switch, Pagination, PaginationItem, FormControlLabel, Checkbox, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles'; 
import SearchComponent from './SearchComponent';
import { ThemeProvider } from '@mui/system';
const PageClasse = () => {

  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;

  // const Item = styled(Paper)(({ theme }) => ({
    const Item = styled(Paper)(({ theme }) => ({
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
    color: 'black'
  
  }));
  
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '1px solid black',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#6f69693d',
    '&:hover': {
      backgroundColor: '#ffffff40',
    },
    mx: 2,
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    boxShadow: 'none !important',
  }));
  
  
  const ItemMenu = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  return (
  //  <ThemeProvider>
      <Box>

        {/* Menu */}
        <Grid container spacing={4} sx={{mb: 3, mt: 1, mx: 'auto', maxWidth: '1500px'}}>

          <Grid item xs={1}>
            <ItemMenu sx={{boxShadow: 'none'}}>
              Logo
            </ItemMenu>
          </Grid>

          <Grid item xs={4} >
            <ItemMenu sx={{color: 'white', boxShadow: 'none'}}></ItemMenu>
          </Grid>

          <Grid item xs={2} >
            <ItemMenu sx={{boxShadow: 'none'}}>
              {/* <FormControl fullWidth sx={{background: '#3D6787', borderRadius: '4px'}}> */}
              <FormControl fullWidth sx={{background: '#3D6787', borderRadius: '4px'}}>
                <InputLabel sx={{color: 'white', fontWeight: '500', border: 'none'}} id="">Trier</InputLabel>
                <Select labelId="demo-simple-select-label" id="" label="Age">
                  <MenuItem value={6}>Croissant</MenuItem>
                  <MenuItem value={5}>Decroissant</MenuItem>
                  <MenuItem value={4}>Classe avec exercice</MenuItem>
                  <MenuItem value={3}>Classe sans exercice</MenuItem>
                </Select>
              </FormControl>
            </ItemMenu>
          </Grid>

          <Grid item xs={2}>
            <ItemMenu sx={{boxShadow: 'none'}}>
              <FormControl fullWidth sx={{background: '#3D6787', borderRadius: '4px'}}>
                <InputLabel sx={{color: 'white', fontWeight: '500'}}  id="demo-simple-select-label">Filtre</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <FormControlLabel control={<Checkbox defaultChecked />} label="6eme" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="5eme" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="4eme" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="3eme" />
                </Select>
              </FormControl>
            </ItemMenu>
          </Grid>

          <Grid item xs={3}>
            <ItemMenu sx={{boxShadow: 'none'}}>
              <SearchComponent/>
            </ItemMenu>
          </Grid>
        </Grid>

        {/* Classe */}
        <Box sx={{ mx: 2, p: 2,  maxWidth: '800px', m: 'auto'}}>
          {/* background: '#D9D9D9', */}
          {/* <ToggleButtonGroup
              exclusive
            >
              <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="module" aria-label="module">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="quilt" aria-label="quilt">
                <ViewQuiltIcon />
              </ToggleButton>
            </ToggleButtonGroup> */}
            
            <Stack spacing={{ xs: 1, sm: 2}} sx={{my: 2, justifyContent: 'center'}} direction="row" useFlexGap flexWrap="wrap">  
              <Item>6°1</Item> <Item>6°2</Item> <Item>6°3</Item> <Item>6°4</Item> <Item>5°1</Item> <Item>5°2</Item> <Item>5°3</Item><Item>5°4</Item> <Item>4°1</Item><Item>4°2</Item> <Item>4°3</Item> <Item>4°</Item>
              <Item>6°1</Item> <Item>6°2</Item> <Item>6°3</Item> <Item>4°2</Item> <Item>4°3</Item> <Item>4°</Item>
            </Stack>


          <Box sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
            <Pagination
              count={10}
              // renderItem={(item) => (
                // <PaginationItem
                //   slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                //   {...item}
                // />
              // )}
            />
          </Box>
          
          
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Afficher toutes les classes"
          labelPlacement="start"
        />
      </Box>
    </Box>
  //  </ThemeProvider>
  );
};

export default PageClasse;