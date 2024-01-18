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
    date: "",
    correction: false,
  });

  const classes = useSelector(selectClasses);

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
        >
          {classes.map((classe, index) => (
            <MenuItem value={classe.classSkillLevel.value} key={index}>{classe.classSkillLevel.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default FilterForm;
