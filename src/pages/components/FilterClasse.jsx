// FilterClasse.jsx
import React, { useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const FilterClasse = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("toutes");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <FormControl>
      <FormLabel id="filter-menu-buttons-group-label" sx={{ paddingLeft: "0.4vw" }}>
        Filtrer par :
      </FormLabel>
      <RadioGroup
        aria-labelledby="filter-menu-buttons-group-label"
        value={filterValue} // Assurez-vous de spécifier la valeur sélectionnée
        onChange={handleFilterChange} // Gérez le changement de valeur
        name="radio-buttons-group"
        sx={{ paddingLeft: "0.4vw" }}
      >
        {["toutes", "avecExercice", "sansExercice"].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={
              value === "toutes"
                ? "Toutes les classes"
                : value === "avecExercice"
                ? "Avec exercice"
                : "Sans exercice"
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FilterClasse;
