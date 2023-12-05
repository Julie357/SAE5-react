import React, { useEffect, useState } from "react";
import "@fontsource/itim";
import { useSelector } from "react-redux";
import {
  selectExercicesSortByAlphabet,
  selectExercicesSortByDateAscending,
  selectExercicesSortByDateDescending,
  selectLoadingExercices,
  selectTotalExercices,
} from "../features/exercices/exerciceSelector";
import { selectExercices } from "../features/exercices/exerciceSelector";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Grid, Pagination, Stack, CircularProgress, Badge } from "@mui/material";
import ExerciceCard from "./components/Card";
import ExerciceListHeader from "./components/ExercicesListComponents/ExerciceListHeader";

const ExercicesList = () => {
  const ITEMS_PER_PAGE = 15;
  const exercices = useSelector(selectExercices);
  const nbExercices = useSelector(selectTotalExercices);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alphabetique");
  const [filteredExercices, setFilteredExercices] = useState(exercices);
  const sortByAlphabet = useSelector(selectExercicesSortByAlphabet);
  const sortByDateAscending = useSelector(selectExercicesSortByDateAscending);
  const sortByDateDescending = useSelector(selectExercicesSortByDateDescending);
  const loading = useSelector(selectLoadingExercices);
  const [currentPage, setCurrentPage] = useState(1);

  const isThereExercice = () => nbExercices > 0;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentExercices = filteredExercices.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let exercicesSorted;
    if (sort === "alphabetique") {
      exercicesSorted = sortByAlphabet;
    } else if (sort === "recent") {
      exercicesSorted = sortByDateAscending;
    } else {
      exercicesSorted = sortByDateDescending;
    }

    const filteredExercicesQuery = exercicesSorted.filter((exercise) =>
      query === "" || exercise.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredExercices(filteredExercicesQuery);
  }, [query, sort, sortByAlphabet, sortByDateAscending, sortByDateDescending]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <Grid container gap={3} sx={{ height: "100%", width: "100%" }}>
      <Grid item xs={11} sx={{ height: "10vh", margin: "auto", marginTop: "2vh", display: "flex", alignItems: "center" }}>
        <ExerciceListHeader onQueryChange={handleQueryChange} updateSort={handleSortChange} />
      </Grid>
      <Grid item xs={11} sx={{ height: "75vh", margin: "auto" }}>
        <Box
          sx={{
            backgroundColor: "#D8ECFC",
            borderRadius: "0.6vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "5vh",
            paddingBottom: "1vh",
          }}
        >
          {loading ? (
            <CircularProgress color="primary" sx={{ marginTop: "42vh" }} />
          ) : (
            <>
              {isThereExercice() && (
                <>
                  <Stack direction="row" gap={2.5} alignItems="center" justifyContent="center" flexWrap="wrap" sx={{ width: "95%" }}>
                    {currentExercices.map((exercice) => (
                      <Grid item xs={12} sm={9} md={2} lg={2} key={exercice.id}>
                        <Badge color="primary" badgeContent=" " invisible={exercice.correction}>
                          <ExerciceCard exercice={exercice} />
                        </Badge>
                      </Grid>
                    ))}
                  </Stack>
                  <Pagination
                    count={Math.ceil(exercices.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="success"
                    shape="rounded"
                    size="small"
                    sx={{ marginTop: "25vh" }}
                  />
                </>
              )}
              {!isThereExercice() && (
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
                  <Typography variant="h5">L'élève n'a pas encore réalisé d'exercice.</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ExercicesList;
