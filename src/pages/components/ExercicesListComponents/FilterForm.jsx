import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FilterForm = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("alphabetique");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <FormControl>
      <FormLabel
        id="filter-menu-buttons-group-label"
        sx={{ paddingLeft: "0.4vw" }}
      >
        Filter par :
      </FormLabel>
      <RadioGroup
        aria-labelledby="filter-menu-buttons-group-label"
        defaultValue={filterValue}
        name="radio-buttons-group"
        sx={{ paddingLeft: "0.4vw" }}
      >
        {["alphabetique", "ascending", "descending"].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            onChange={handleFilterChange}
            label={
              value === "alphabetique"
                ? "Ordre alphabétique"
                : value === "ascending"
                ? "Le + récent"
                : "Le + ancien"
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterForm;
