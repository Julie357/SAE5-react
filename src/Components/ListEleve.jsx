import React from 'react';
import Box from '@mui/material/Box';
import { ViewList as ViewListIcon, ViewModule as ViewModuleIcon, ViewQuilt as ViewQuiltIcon, ArrowBack as ArrowBackIcon,ArrowForward as ArrowForwardIcon} from '@mui/icons-material';
import {ToggleButton, ToggleButtonGroup, Switch, Pagination, FormControlLabel, Checkbox, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Eleve from './Eleve'
import SearchComponent from './SearchComponent';
import Paper from '@mui/material/Paper';
// import { ThemeProvider } from '@mui/system';
// import theme from '../theme';

const ListEleve = () => {
  // const ItemMenu = styled(Paper)(({ theme }) => ({
  const ItemMenu = styled()(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme) => theme.secondary.main,
  }));



  return (
    <Box>
      <Grid container spacing={4} sx={{mb: 3, mt: 1, mx: 'auto', maxWidth: '1500px'}}>
        <Grid item xs={2} >
          <ItemMenu sx={{boxShadow: 'none'}}>
            <FormControl fullWidth sx={{background: '#3D6787', borderRadius: '40px'}}>
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
            <FormControl fullWidth sx={{background: '#3D6787', borderRadius: '40px'}}>
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

      <Eleve/>

    </Box>
  );
};

export default ListEleve;
