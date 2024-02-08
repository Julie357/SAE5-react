import "@fontsource/itim";
import {
  CircularProgress,
  Grid,
  Pagination,
  Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectClasses, selectLoadingClasses, selectTotalClasses } from "../features/classes/classSelector";
import ClassCard from "./components/ClassesListComponents/ClassCard";
import ClassesListHeader from "./components/ClassesListComponents/ClassesListHeader";
import {
  ClassesFilterByLevel,
  sortByClasses,
  sortByClassesDescending,
  sortClassesByQuery
} from "./fonctions/sortFunctions";

const ClassesList = () => {
  const ITEMS_PER_PAGE = 15;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("alphabetique");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filters, setFilters] = useState({
    level: ""
  });
  const [currentFilters, setCurrentFilters] = useState([]);
  const loading = useSelector(selectLoadingClasses);
  const classes = useSelector(selectClasses);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  const nbClasses = useSelector(selectTotalClasses);

  const currentClasses = filteredClasses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const handleSortAndFilterChange = async () => {
      setCurrentFilters([]);
      if (classes) {
        let updatedClasses = [...classes];

        
        if (filters.level) {
          updatedClasses = ClassesFilterByLevel(updatedClasses, filters.level);
        }

        
        if (sort === "alphabetique") {
          updatedClasses = sortByClasses(updatedClasses);
        }

        if (sort === "descending_alphabetique") {
          updatedClasses = sortByClassesDescending(updatedClasses);
        }

        if (query) {
          updatedClasses = sortClassesByQuery(updatedClasses, query);
        }

        setFilteredClasses(updatedClasses);
      }
    };

    handleSortAndFilterChange();
  }, [query, sort, filters, classes]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      "level": newFilter,
    }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <>
      {classes && (
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
            <ClassesListHeader
              onQueryChange={handleQueryChange}
              updateSort={handleSortChange}
              updateFilter={handleFilterChange}
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
                  {nbClasses > 0 && (
                    <>
                      <Stack
                        direction="row"
                        gap={2.5}
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{ width: "95%" }}
                      >
                        {currentClasses.map((classe, index) => (
                          <Grid item xs={12} sm={9} md={2} lg={2} key={index}>
                              <ClassCard classe={classe} />
                          </Grid>
                        ))}
                        {errorMessage && (
                          <>
                            <Typography variant="h5">
                              Aucune classe ne correspond au(x) filtre(s) indiqué(s).
                            </Typography>
                          </>
                        )}
                      </Stack>
                      <Pagination
                        count={Math.ceil(
                          filteredClasses.length / ITEMS_PER_PAGE
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
                  {nbClasses < 1 && (
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
                        Aucune classe disponible.
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

export default ClassesList;
