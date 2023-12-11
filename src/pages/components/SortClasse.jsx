import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const SortClasse = ({ onSortChange }) => {
  const [sortValue, setSortValue] = useState("alphabetique");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortValue(value);
    onSortChange(value);
  };

  return (
    <FormControl>
      <FormLabel
        id="sort-menu-buttons-group-label"
        sx={{ paddingLeft: "0.4vw" }}
      >
        Trier par :
      </FormLabel>
      <RadioGroup
        aria-labelledby="sort-menu-buttons-group-label"
        defaultValue={sortValue}
        value={sortValue}
        name="radio-buttons-group"
        sx={{ paddingLeft: "0.4vw" }}
      >
        {["alphabetique", "croissant", "decroissant"].map((value) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            onChange={handleSortChange}
            label={
              value === "alphabetique"
                ? "Ordre alphabétique"
                : value === "croissant"
                ? "Ordre croissant"
                : "Ordre décroissant"
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SortClasse;
