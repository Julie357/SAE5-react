import React, { useEffect, useState } from "react";
import "@fontsource/itim";
import { useSelector } from "react-redux";
import { selectLoadingExercices } from "../features/exercices/exerciceSelector";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import {
  Grid,
  Pagination,
  Stack,
  CircularProgress,
  Badge,
  Chip,
} from "@mui/material";
import ExerciceCard from "./components/Card";
import ExerciceListHeader from "./components/ExercicesListComponents/ExerciceListHeader";
import { useParams } from "react-router-dom";
import FetchStudentExercises from "./fonctions/FetchStudentExercises";
import {
  filterByCorrection,
  filterByDate,
  filterByLevel,
  sortByAlphabet,
  sortByDateAscending,
  sortByDateDescending,
  sortByQuery,
} from "./fonctions/sortFunctions";

const ExercicesList = () => {
  const { idStudent } = useParams();
  const {
    loadingStudents,
    currentStudent,
    studentExercises,
    studentExercisesUncorrected,
  } = FetchStudentExercises(idStudent);

  const ITEMS_PER_PAGE = 15;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alphabetique");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    date: "",
    correction: false,
  });
  const [currentFilters, setCurrentFilters] = useState([]);
  const loading = useSelector(selectLoadingExercices);
  const [currentPage, setCurrentPage] = useState(1);
  const [nbExercises, setNbExercises] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  const currentExercises = filteredExercises.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const handleSortAndFilterChange = async () => {
      setCurrentFilters([]);
      if (studentExercises) {
        setNbExercises(studentExercises.length);
        let updatedExercises = [...studentExercises];
        console.log(filters);
        console.log(currentFilters);

        if (filters.level) {
          updatedExercises = filterByLevel(updatedExercises, filters.level);
          setCurrentFilters([...currentFilters, `level: ${filters.level}`]);
        }
        if (filters.date) {
          updatedExercises = filterByDate(updatedExercises, filters.date);
          var date = new Date(filters.date).toLocaleDateString("fr");
          setCurrentFilters([...currentFilters, `date: ${date}`]);
        }
        if (filters.correction) {
          updatedExercises = filterByCorrection(
            updatedExercises,
            filters.correction
          );
          setCurrentFilters([...currentFilters, "corrigé"]);
        }

        if (sort === "alphabetique") {
          updatedExercises = sortByAlphabet(updatedExercises);
        } else if (sort === "ascending") {
          updatedExercises = sortByDateAscending(updatedExercises);
        } else {
          updatedExercises = sortByDateDescending(updatedExercises);
        }

        if (query) {
          updatedExercises = sortByQuery(updatedExercises, query);
        }

        if (updatedExercises.length == 0) {
          setErrorMessage(true);
        }
        setFilteredExercises(updatedExercises);
      }
    };

    handleSortAndFilterChange();
  }, [query, sort, filters, studentExercises]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ["level"]: newFilter.level,
      ["date"]: newFilter.date,
      ["correction"]: newFilter.correction,
    }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <>
      {currentStudent && (
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
              onQueryChange={handleQueryChange}
              updateSort={handleSortChange}
              updateFilter={handleFilterChange}
              student={currentStudent}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              height: "0.5vh",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: "-3vh",
            }}
          >
            {currentFilters.length > 0 && (
              <>
                {currentFilters.map((filter, index) => (
                  <Chip key={index} label={filter} />
                ))}
              </>
            )}
          </Grid>
          <Grid item xs={11} sx={{ height: "82vh", margin: "auto" }}>
            <Box
              sx={{
                backgroundColor: "#D8ECFC",
                borderRadius: "0.6vw",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "3vh",
                paddingBottom: "1vh",
                marginTop: "-2vh",
              }}
            >
              {loading ? (
                <CircularProgress color="primary" sx={{ marginTop: "42vh" }} />
              ) : (
                <>
                  {nbExercises > 0 && (
                    <>
                      <Stack
                        direction="row"
                        gap={2.5}
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{ width: "95%" }}
                      >
                        {currentExercises.map((exercise, index) => (
                          <Grid item xs={12} sm={9} md={2} lg={2} key={index}>
                            <Badge
                              color="primary"
                              badgeContent=" "
                              invisible={exercise.correction}
                            >
                              <ExerciceCard exercice={exercise} />
                            </Badge>
                          </Grid>
                        ))}
                        {errorMessage && (
                          <>
                            <Typography variant="h5">
                              Aucun exercice ne correspond au(x) filtre(s) indiqué(s).
                            </Typography>
                          </>
                        )}
                      </Stack>
                      <Pagination
                        count={Math.ceil(
                          filteredExercises.length / ITEMS_PER_PAGE
                        )}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="success"
                        shape="rounded"
                        size="small"
                        sx={{ position: "fixed", bottom: "5vh" }}
                      />
                    </>
                  )}
                  {nbExercises < 1 && (
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
                      <Typography variant="h5">
                        L'élève n'a pas encore réalisé d'exercice.
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ExercicesList;
