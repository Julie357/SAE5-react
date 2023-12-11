// FilterClasse.jsx
import React, { useState } from "react";
import { FormControl, FormControlLabel, Checkbox, Box, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";

const FilterClasse = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("toutes");

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
            <MenuItem value="A1">6eme</MenuItem>
            <MenuItem value="A2">5eme</MenuItem>
            <MenuItem value="B1">4eme</MenuItem>
            <MenuItem value="B2">3eme</MenuItem>
          </Select>
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

export default FilterClasse;
