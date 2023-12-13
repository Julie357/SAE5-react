import React, { useState } from "react";
import {
  Chip,
  Stack,
  Box,
  Autocomplete,
  TextField,
  Drawer,
  Button,
  Grid,
  Link,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Eleve from "../Components/Eleve";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
import {
  selectLoadingStudents,
  selectStudents,
  selectTotalStudents,
} from "../features/students/studentSelector";
import ExerciceListHeader from "./components/ExercicesListComponents/ExerciceListHeader";
// import DrawerClasse from './DashClasse.jsx'

const EnsembleClasse = () => {
  const students = useSelector(selectStudents);
  const totalStudents = useSelector(selectTotalStudents);
  const isThereStudent = () => totalStudents > 0;

  const loading = useSelector(selectLoadingStudents);
  const [drawerOpen, setDrawerOpen] = useState(false);

  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Grid container gap={3} sx={{ height: "100%", width: "100%" }}>
      <Grid
        item
        xs={11}
        sx={{
          height: "10vh",
          margin: "auto",
          marginTop: "2vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ExerciceListHeader
        />
      </Grid>
      <Grid item xs={11} sx={{ height: "82vh", margin: "auto" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "3vh",
            paddingBottom: "1vh",
          }}
        >
          {loading ? (
            <CircularProgress color="primary" sx={{ marginTop: "42vh" }} />
          ) : (
            <>
              {isThereStudent() && (
                <>
                  <Stack
                    direction="row"
                    gap={2.5}
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ width: "95%" }}
                  >
                    {currentStudents.map((student, index) => (
                      <Grid item xs={12} sm={9} md={2} lg={2} key={index}>
                          <RouterLink
                            to={`/studentCard/${student.idStudent}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Eleve
                              nom={student.name}
                              prenom={student.firstName}
                              level={student.skillLevel}
                            />
                          </RouterLink>
                      </Grid>
                    ))}
                  </Stack>
                  <Pagination
                    count={Math.ceil(totalStudents / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="success"
                    shape="rounded"
                    size="small"
                    sx={{ position: "fixed", bottom: "5vh" }}
                  />
                </>
              )}
              {!isThereStudent() && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    height: "50%",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="h5">Aucun élève enregistré.</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EnsembleClasse;
