import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../features/classes/classSelector";

const FilterForm = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    level: "",
  });

  const classes = useSelector(selectClasses);

  const handleFilterChange = (value) => {
    const level = value.target.value;
    setFilters(level);
    onFilterChange(level);
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
          <MenuItem value={""}>{"Tous les niveaux"}</MenuItem>
          {classes.map((classe, index) => (
            <MenuItem value={classe.classLevel} key={index}>
              {classe.classLevel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default FilterForm;
