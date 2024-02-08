import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import React, { useState } from "react";

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    level: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(() => ({
      [name]: value,
    }));
    onFilterChange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth size="small">
        <InputLabel id="level-label" size="small">
          Niveau
        </InputLabel>
        <Select
          labelId="level-label"
          id="level"
          name="level"
          value={filters.level}
          label="Niveau"
          onChange={handleFilterChange}
          renderValue={(selectedValue) =>
            selectedValue === "" ? "Tous les niveaux" : selectedValue
          }
        >
          <MenuItem value="">Tous les niveaux</MenuItem>
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="C1">C1</MenuItem>
            <MenuItem value="C2">C2</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default FilterForm;
