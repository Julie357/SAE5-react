import React, { useState } from 'react';
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const Search = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  padding: '4px',
  transition: 'width 0.3s',
  '&:focus-within': {
    width: '100%', // La largeur maximale lorsque la boîte de recherche a le focus
  },
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)({
  flex: 1,
  width: '0',
  overflow: 'hidden',
  transition: 'width 0.3s',
  '&.open': {
    width: '100%',
  },
});

const SearchComponent = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Search>
      <SearchIconWrapper onClick={() => setIsFocused(!isFocused)}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        className={isFocused ? 'open' : ''}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchComponent;
