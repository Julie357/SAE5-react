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
} from "@mui/material";
import ExerciceCard from "./components/Card";
import ExerciceListHeader from "./components/ExercicesListComponents/ExerciceListHeader";
import { useParams } from "react-router-dom";
import FetchStudentExercises from "./fonctions/FetchStudentExercises";

const ExercicesList = () => {
  const { idStudent } = useParams();
  const {
    loadingStudents,
    currentStudent,
    studentExercises,
    studentExercisesUncorrected,
  } = FetchStudentExercises(idStudent);
  console.log(studentExercises);

  const ITEMS_PER_PAGE = 15;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alphabetique");
  const [filteredExercises, setFilteredexercises] = useState(studentExercises);
  const loading = useSelector(selectLoadingExercices);
  const [currentPage, setCurrentPage] = useState(1);

  const isThereExercise = () => studentExercises.length > 0;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentexercises = filteredExercises?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const sortByDateAscending = () => {
    [...studentExercises].sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1 - date2;
    });
  };

  const sortByDateDescending = () => {
    [...studentExercises].sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date2 - date1;
    });
  };

  const sortByAlphabet = () => {
    [...studentExercises].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // useEffect(() => {
  //   let exercisesSorted;
  //   if (sort === "alphabetique") {
  //     exercisesSorted = sortByAlphabet;
  //   } else if (sort === "ascending") {
  //     exercisesSorted = sortByDateAscending;
  //   } else {
  //     exercisesSorted = sortByDateDescending;
  //   }

  //   const filteredExercisesQuery = exercisesSorted.filter(
  //     (exercise) =>
  //       query === "" ||
  //       exercise.title.toLowerCase().includes(query.toLowerCase())
  //   );

  //   setFilteredexercises(filteredExercisesQuery);
  // }, [query, sort, sortByAlphabet, sortByDateAscending, sortByDateDescending]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <>
      {studentExercises ? (
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
              student={currentStudent}
            />
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
              }}
            >
              {loading ? (
                <CircularProgress color="primary" sx={{ marginTop: "42vh" }} />
              ) : (
                <>
                  {isThereExercise() && (
                    <>
                      <Stack
                        direction="row"
                        gap={2.5}
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{ width: "95%" }}
                      >
                        {studentExercises.map((exercise, index) => (
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
                      </Stack>
                      <Pagination
                        count={Math.ceil(
                          studentExercises.length / ITEMS_PER_PAGE
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
                  {!isThereExercise() && (
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
      ) : (
        <CircularProgress
          color="primary"
          sx={{ marginTop: "48vh", marginLeft: "48vw" }}
        />
      )}
    </>
  );
};

export default ExercicesList;
