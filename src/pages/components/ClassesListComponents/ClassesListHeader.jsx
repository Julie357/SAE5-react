import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Grid, Link, Menu } from "@mui/material";
import SortForm from "./SortForm";
import FilterForm from "./FilterForm";
import SearchComponent from "./SearchComponent";

const ClassesListHeader = ({ onQueryChange, updateSort, updateFilter }) => {
  const [openSort, setOpenSort] = useState(false);
  const [anchorSort, setAnchorSort] = useState(null);
  const [anchorFilter, setAnchorFilter] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const toggleSort = (event) => {
    setAnchorSort(event.currentTarget);
    setOpenSort((prevOpenSort) => !prevOpenSort);
  };

  const toggleFilter = (event) => {
    setAnchorFilter(event.currentTarget);
    setOpenFilter((prevOpenSort) => !prevOpenSort);
  };

  const handleSortChange = (newSort) => {
    updateSort(newSort);
  };

  const handleFilterChange = (newFilter) => {
    updateFilter(newFilter);
  };

  return (
    <>
      <Grid item xs={1}>
        <Box
          component="img"
          src="./assets/logo-A4ll.svg"
          alt="Description de l'image"
          sx={{ width: "70%", height: "100%", margin: "0 0.7vw" }}
        />
      </Grid>
      <Grid item xs={5} />
      <Grid item xs={5} container sx={{ marginLeft: "23vw", display: "flex", alignItems: "center" }}>
        <Grid item xs={2}>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={toggleSort}
          >
            Tri
          </Button>
          <Menu
            id="sort-menu"
            aria-labelledby="sort-menu-button"
            open={openSort}
            anchorEl={anchorSort}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            sx={{ marginTop: "7vh" }}
            onClose={() => setOpenSort(false)}
          >
            <SortForm onSortChange={handleSortChange} />
          </Menu>
        </Grid>
        <Grid item xs={3}>
          <FilterForm onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={7}>
          <SearchComponent onQueryChange={onQueryChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default ClassesListHeader;
