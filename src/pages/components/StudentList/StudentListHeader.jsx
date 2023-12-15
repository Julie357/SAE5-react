import React, { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { Chip, Grid, Menu, Stack } from "@mui/material";
import FilterForm from "./FilterForm";
import SearchComponent from "./SearchComponent";
import { useSelector } from "react-redux";
import { selectTotalStudents } from "../../../features/students/studentSelector";

const StudentListHeader = ({ onQueryChange}) => {
  const [anchorFilter, setAnchorFilter] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const totalStudents = useSelector(selectTotalStudents);

  const toggleFilter = (event) => {
    setAnchorFilter(event.currentTarget);
    setOpenFilter((prevOpenSort) => !prevOpenSort);
  };

  return (
    <>
      <Grid item xs={6}>
        <Box
          sx={{
            height: "9vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              label="3°6"
              component="a"
              href="#basic-chip"
              clickable
              sx={{
                background: "#3D6787",
                color: "#fff",
                fontFamily: "Itim",
                fontSize: "15px",
                fontWeight: 400,
              }}
            />
            <Chip
              label={`${totalStudents} élèves`}
              component="a"
              variant="outlined"
              sx={{
                background: "#3D6787",
                color: "#fff",
                fontFamily: "Itim",
                fontSize: "15px",
                fontWeight: 400,
              }}
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={5} container sx={{ marginLeft: "23vw" }}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={toggleFilter}
            startIcon={<TuneIcon />}
          >
            Filtres
          </Button>
          <Menu
            id="filter-menu"
            aria-labelledby="filter-menu-button"
            open={openFilter}
            anchorEl={anchorFilter}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            sx={{ marginTop: "7.5vh" }}
            onClose={() => setOpenFilter(false)}
          >
            <FilterForm onFilterChange={console.log('filter')} />
          </Menu>
        </Grid>
        <Grid item xs={7}>
          <SearchComponent onQueryChange={onQueryChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentListHeader;
