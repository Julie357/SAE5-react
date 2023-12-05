import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel } from "@mui/material";

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    level: "",
    date: "",
    correction: false,
  });

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;

    const filterValue = type === "checkbox" ? checked : value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: filterValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="level-label">Niveau</InputLabel>
          <Select
            labelId="level-label"
            id="level"
            name="level"
            value={filters.level}
            label="Niveau"
            onChange={handleFilterChange}
          >
            <MenuItem value="">Sélectionnez un niveau</MenuItem>
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="C1">C1</MenuItem>
            <MenuItem value="C2">C2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="date"
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={handleFilterChange}
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox checked={filters.correction} onChange={handleFilterChange} name="correction" />}
          label="Corrigé"
        />

        <Button type="submit" variant="contained" color="primary">
          Filtrer
        </Button>
      </form>
    </Box>
  );
};

export default FilterForm;
