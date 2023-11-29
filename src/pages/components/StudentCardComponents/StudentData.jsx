import React, { useState } from "react";
import { Grid, Link, Pagination, Stack } from "@mui/material";
import Box from "@mui/system/Box";
import { useSelector } from "react-redux";
import { selectExercicesFiltredByCorrected } from "../../../features/exercices/exerciceSelector";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StudentData = () => {
  const ITEMS_PER_PAGE = 4;
  const exercicesCorrected = useSelector(selectExercicesFiltredByCorrected);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentExercices = exercicesCorrected.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Grid container spacing={5} sx={{ height: "100%", width: "60vw" }}>
        <Grid item xs={12} sx={{ height: "60%", width: "100%" }}>
          <Box
            sx={{
              backgroundColor: "#D8ECFC",
              borderRadius: "0.6vw",
              height: "100%",
              width: "100%",
            }}
          />
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
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontSize: 28,
                alignSelf: "start",
                marginLeft: "2.5%",
                marginTop: "1vh",
              }}
            >
              Exercices non corrigés
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
                      <Button size="small">Voir l'exercice</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Stack>
            <Pagination
              count={Math.ceil(exercicesCorrected.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
            <Link href="#" underline="hover" sx={{alignSelf:"end", marginRight:'2%'}}>
              {"Voir tous les exercices"}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentData;
