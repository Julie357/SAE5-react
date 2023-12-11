import React from 'react';
import { Chip, Stack, Box, Autocomplete, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './stylePage.css';

const EnsembleClasse = () => {

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    }]

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: '10%'}}>
        <Stack direction="row" spacing={1}>
            <Chip label="3°6" component="a" href="#basic-chip" clickable sx={{background: "#3D6787", color: "#fff", fontFamily: "Itim", fontSize: '15px', fontWeight: 400}} />
            <Chip
                label="33 élèves"
                component="a"
                variant="outlined"
                sx={{background: "#3D6787", color: "#fff", fontFamily: "Itim", fontSize: '15px', fontWeight: 400}}
            />
        </Stack>
        <Stack direction="row" spacing={1}>
            <Chip label="3°6" component="a" sx={{background: "#3D6787", color: "#fff", fontFamily: "Itim", fontSize: '15px', fontWeight: 400}}
            avatar={<FilterListIcon sx={{ marginRight: 0.5, color: '#fff !important' }}/>}
            />
            <Chip
                label="33 élèves"
                component="a"
                variant="outlined"
                sx={{background: "#3D6787", color: "#fff", fontFamily: "Itim", fontSize: '15px', fontWeight: 400}}
                avatar={<FilterListIcon sx={{ marginRight: 0.5, color: '#fff !important' }}/>}
            />
            <Autocomplete
                multiple
                sx={{width: '250px'}}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                    sx={{fontSize: '14px'}}
                />
                )}
            />
        </Stack>
    </Box>
    
    
    </>
  );
};

export default EnsembleClasse;
