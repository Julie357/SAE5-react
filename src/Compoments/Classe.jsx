import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

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
    // <Box sx={{width: '120px', height: '120px', textAlign: 'center', boxShadow: 4, borderRadius: '29px' }}>
    // <Typography sx={{fontSize: '3rem', fontWeight: '500', p: 1, m:1}}>
    //   6°1
    // </Typography>
    // </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', border: '1px solid red' }}>
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
  );
};

export default PageEleve;