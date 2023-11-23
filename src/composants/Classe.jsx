import React from 'react';
import Box from '@mui/material/Box';
import { ViewList as ViewListIcon, ViewModule as ViewModuleIcon, ViewQuilt as ViewQuiltIcon, ArrowBack as ArrowBackIcon,ArrowForward as ArrowForwardIcon} from '@mui/icons-material';
import {ToggleButton, ToggleButtonGroup, Switch, Pagination, PaginationItem, FormControlLabel} from '@mui/material';
import { BoxProps } from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 3,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        textAlign: 'center',
        boxShadow: 3,
        
        ...sx,
      }}
      {...other}
    />
  );
}

const PageEleve = () => {
  return (
    <Box>
      <Box sx={{p:2, display: 'flex', width: '100%', alignContent: 'center'}}>
        <Box sx={{width: '10%', border: '1px solid red', textAlign: 'center', alignContent: 'center'}}>Logo</Box>

        <Box sx={{width: '15%', mx: '5%'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{width: '20%', border: '1px solid red'}}>Filtre</Box>

        <Box sx={{width: '20%', mx: '5%', display:'flex'}}>
  

         
          <Box sx={{border: '1px solid red'}}>
            <FormControl fullWidth>
              <InputBase
                placeholder="Rechercher..."
                startAdornment={<SearchIcon />}
                sx={{ ml: 1, flex: 1 }}
              />
            </FormControl>
          </Box>
        </Box>



      </Box>


      <Box sx={{ m: 2, p: 2, background: '#D9D9D9'}}>
        <ToggleButtonGroup
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
          </ToggleButtonGroup>
      
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', my: 2 }}>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Box>

        <Box sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
          
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Afficher toutes les classes"
            labelPlacement="start"
          />
        </Box>
        
    </Box>

    <Box>
    
    </Box>
    </Box>
    
  );
};

export default PageEleve;