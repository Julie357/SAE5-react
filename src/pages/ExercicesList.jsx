import React, { useState } from "react";
import "@fontsource/itim";
import { useSelector } from "react-redux";
import { selectTotalExercices } from "../features/exercices/exerciceSelector";
import {
  selectExercices,
  selectExercicesUncorrected,
} from "../features/exercices/exerciceSelector";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { Grid, Pagination, Stack } from "@mui/material";

const ExercicesList = () => {
  const ITEMS_PER_PAGE = 15;
  const exercices = useSelector(selectExercices);
  const nbExercices = useSelector(selectTotalExercices);
  const uncorrectExercices = useSelector(selectExercicesUncorrected);
  const isThereExercice = () => {
    if (nbExercices === 0) {
      return false;
    } else {
      return true;
    }
  };
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentExercices = exercices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Grid container spacing={5} sx={{ height: "100%", width: "95vw", margin: "auto" }}>
        <Grid item xs={12} sx={{ height: "90%", width: "100%" }}>
          <Box
            sx={{
              backgroundColor: "#D8ECFC",
              borderRadius: "0.6vw",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "1vh",
              paddingBottom: "1vh",
            }}
          >
            {isThereExercice() && (
              <>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ width: "95%", margin: "auto" }}
                >
                  {currentExercices.map((exercice) => (
                    <Grid item xs={12} sm={6} md={2} lg={2} key={exercice.id}>
                      <Card>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {exercice.date}
                          </Typography>
                          <Typography variant="h5" component="div">
                            {exercice.title}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>Niveau :</b> {exercice.niveau}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              fontFamily: "itim",
                              mb: "1vh",
                            }}
                          >
                            Voir l'exercice
                          </Button>
                        </CardActions>
                      </Card>
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
                />
              </>
            )}
            {!isThereExercice() && (
              <>
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
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ExercicesList;
