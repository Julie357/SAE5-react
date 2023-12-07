import React from "react";
import Box from "@mui/system/Box";
import RecurrentErrors from "./RecurrentErrors";
import { Typography } from "@mui/material";
import "@fontsource/itim";
import { useSelector } from "react-redux";
import { selectTotalExercices } from "../../../features/exercices/exerciceSelector";

const StudentProfile = () => {
  const nbExercices = useSelector(selectTotalExercices);
  const isThereExercice = nbExercices > 0;

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#D8ECFC",
        borderRadius: "0.6vw",
        height: "100%",
        width: "36vw",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "90%",
          height: "22%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "2vh",
        }}
      >
        <Box component="img" sx={{ width: "35%", height: "100%" }}></Box>
        <Box
          sx={{
            width: "60%",
            textAlign: "start",
            fontSize: "4.5vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
            Buisson
          </Typography>
          <Typography variant="h3">Claire</Typography>
          <Typography variant="h4">3°6</Typography>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          fontSize: "3vh",
          width: "90%",
          margin: "auto",
          marginTop: "1vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Niveau: B2</Typography>
        {!isThereExercice && (
          <Typography variant="h5">L'étudiant n'a pas réalisé d'exercice.</Typography>
        )}
        {isThereExercice && (
          <Typography variant="h5">Exercices effectués: {nbExercices}</Typography>
        )}
      </Box>
      <RecurrentErrors />
    </Box>
  );
};

export default StudentProfile;