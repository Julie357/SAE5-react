import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Grid,
  CircularProgress,
  Pagination,
  Typography,
  ListItem,
  List,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import Eleve from "../Components/Eleve";
import { useSelector } from "react-redux";
import {
  selectLoadingStudents,
  selectStudents,
  selectTotalStudents,
} from "../features/students/studentSelector";

import { Link as RouterLink, useParams } from "react-router-dom";
import StudentListHeader from "./components/StudentList/StudentListHeader";
import FetchClassesData from "./fonctions/FetchClassesData";
import {
  filterStudentsByLevel,
  sortByStudents,
  sortByStudentsByQuery,
  sortByStudentsDescending,
} from "./fonctions/sortFunctions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardClass from "./components/StudentList/DashboardClass";

const StudentsList = () => {
  const { idClass } = useParams();
  const { loadingStudents, studentsOfTheClass, classData } =
    FetchClassesData(idClass);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alphabetique");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
  });
  const totalStudents = studentsOfTheClass.length;
  const isThereStudent = () => totalStudents > 0;
  const [state, setState] = useState({ top: false });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const handleSortAndFilterChange = async () => {
      if (studentsOfTheClass) {
        let updatedStudents = [...studentsOfTheClass];

        if (filters.level) {
          updatedStudents = filterStudentsByLevel(
            updatedStudents,
            filters.level
          );
        }

        if (sort === "alphabetique") {
          updatedStudents = sortByStudents(updatedStudents);
        }

        if (sort === "descending_alphabetique") {
          updatedStudents = sortByStudentsDescending(updatedStudents);
        }

        if (query) {
          updatedStudents = sortByStudentsByQuery(updatedStudents, query);
        }

        setFilteredStudents(updatedStudents);
      }
    };
    handleSortAndFilterChange();
  }, [query, sort, filters, studentsOfTheClass]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter) => {
    setFilters(() => ({
      "level": newFilter,
    }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  return (
    <Grid container gap={3} sx={{ height: "100%", width: "100%" }}>
      <Grid
        item
        xs={12}
        sx={{ height: "2vh", margin: "auto", backgroundColor: "#D8ECFC", display: "flex", justifyContent: "center", alignItems: "flex-start" }}
      >
        <Button onClick={toggleDrawer("top", true)} style={{backgroundColor: "#D8ECFC", color: "#3D6787", display: "flex", alignItems: "flex-start"}}>
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer("top", false)}
      >
        <DashboardClass classData={classData} />
      </Drawer>
      <Grid
        item
        xs={11}
        sx={{
          height: "10vh",
          margin: "auto",
          marginTop: "-2vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <StudentListHeader
          onQueryChange={handleQueryChange}
          updateSort={handleSortChange}
          updateFilter={handleFilterChange}
          classData={classData}
        />
      </Grid>
      <Grid item xs={11} sx={{ height: "82vh", margin: "auto" }}>
        <Box
          sx={{
            backgroundColor: "#EDF6F9",
            borderRadius: "0.6vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "3vh",
            paddingBottom: "1vh",
          }}
        >
          {loadingStudents ? (
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
                          style={{ textDecoration: "none", color:"#2B3643" }}
                        >
                          <Eleve
                            nom={student.name}
                            prenom={student.firstName}
                            level={student.skillLevel}
                            id={student.idStudent}
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

export default StudentsList;
