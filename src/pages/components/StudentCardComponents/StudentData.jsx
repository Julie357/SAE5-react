import React, { useState } from "react";
import { Grid, Link, Pagination, Stack } from "@mui/material";
import Box from "@mui/system/Box";
import { useSelector } from "react-redux";
import {
  selectExercices,
  selectExercicesUncorrectedSortByDate,
  selectLoadingExercices,
  selectTotalExercices,
} from "../../../features/exercices/exerciceSelector";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircularProgress from "@mui/material/CircularProgress";
import ExerciceCard from "../Card";
import Dashboard from "../../../Components/Dashboard";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/system";

const StudentData = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const ITEMS_PER_PAGE = 4;
  const exercicesUncorrected = useSelector(
    selectExercicesUncorrectedSortByDate
  );
  const totalExercices = useSelector(selectTotalExercices);
  const loading = useSelector(selectLoadingExercices);
  const [currentPage, setCurrentPage] = useState(1);
  const exercices = useSelector(selectExercices);
  const isCorrected = exercicesUncorrected.length > 0;
  const isThereExercice = totalExercices > 0;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentExercices = exercicesUncorrected.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const StyledDialog = styled(Dialog)({
    width: "100vw",
    height: "100vh",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiDialog-paper": {
      maxWidth: "none",
    },
  });

  return (
    <Grid container spacing={5} sx={{ height: "100%", width: "60vw" }}>
      <Grid item xs={12} sx={{ height: "60%", width: "100%" }}>
        <Box
          sx={{
            backgroundColor: "#FFF",
            borderRadius: "0.6vw",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <>
              <CircularProgress color="primary" sx={{ marginTop: "12%" }} />
            </>
          ) : (
            <>
              <Dashboard exercices={exercices} />
              <Button
                variant="contained"
                onClick={() => setPopupOpen(true)}
                sx={{ marginTop: 2 }}
              >
                Afficher en grand
              </Button>
            </>
          )}
        </Box>
        <StyledDialog open={isPopupOpen} onClose={() => setPopupOpen(false)}>
  <DialogTitle>Composant Dashboard en grand</DialogTitle>
  <DialogContent sx={{ width: "80vw", height: "80vh" }}>
    <div style={{ width: "100%", height: "100%" }}>
      <Dashboard exercices={exercices} />
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setPopupOpen(false)}>Fermer</Button>
  </DialogActions>
</StyledDialog>

      </Grid>
      <Grid item xs={12} sx={{ height: "43%", width: "100%" }}>
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
          {loading ? (
            <CircularProgress color="primary" sx={{ marginTop: "12%" }} />
          ) : (
            <>
              {isCorrected && (
                <>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontSize: 26,
                      alignSelf: "start",
                      marginLeft: "2.5%",
                      marginTop: "1vh",
                    }}
                  >
                    Exercices non corrigés :
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "95%", margin: "auto" }}
                  >
                    {currentExercices.map((exercice) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={exercice.id}>
                        <ExerciceCard exercice={exercice} />
                      </Grid>
                    ))}
                  </Stack>
                  <Pagination
                    count={Math.ceil(
                      exercicesUncorrected.length / ITEMS_PER_PAGE
                    )}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="success"
                    shape="rounded"
                    size="small"
                  />
                  <Link
                    href="/exercicesList"
                    underline="hover"
                    sx={{
                      alignSelf: "end",
                      marginRight: "2%",
                      fontFamily: "itim",
                      color: "#3D6787",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {"Voir tous les exercices"}
                    <ArrowForwardIcon
                      sx={{ fontSize: "16px", marginLeft: "0.3vw" }}
                    />
                  </Link>
                </>
              )}
              {!isCorrected && (
                <>
                  {!isThereExercice && (
                    <Typography variant="h5">
                      L'élève n'a pas encore réalisé d'exercice.
                    </Typography>
                  )}
                  {isThereExercice && (
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
                        Il n'y a pas d'exercice non corrigé.
                      </Typography>
                      <Button variant="contained">
                        Retrouver tous les exercices
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default StudentData;
