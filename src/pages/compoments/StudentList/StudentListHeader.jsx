import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { Chip, Grid, Menu, Stack } from "@mui/material";
import SearchComponent from "./SearchComponent";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterForm from "./FilterForm";
//import SortForm from "../ClassesListComponents/SortForm";

const StudentListHeader = ({
  onQueryChange,
  updateSort,
  updateFilter,
  classData,
}) => {
  const [openSort, setOpenSort] = useState(false);
  const [anchorSort, setAnchorSort] = useState(null);
  const totalStudents = classData.studentOfClassById.length;

  const toggleSort = (event) => {
    setAnchorSort(event.currentTarget);
    setOpenSort((prevOpenSort) => !prevOpenSort);
  };
  const handleSortChange = (newSort) => {
    updateSort(newSort);
  };

  const handleFilterChange = (newFilter) => {
    updateFilter(newFilter);
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
              label={classData.classLevel + classData.classNumber}
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
              label={`${totalStudents} ${totalStudents > 1 ? 'élèves' : 'élève'}`}
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
            {/* <SortForm onSortChange={handleSortChange} /> */}
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

export default StudentListHeader;
