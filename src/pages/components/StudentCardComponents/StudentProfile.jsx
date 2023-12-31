import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import RecurrentErrors from "./RecurrentErrors";
import { CircularProgress, Typography } from "@mui/material";
import "@fontsource/itim";
import { useSelector } from "react-redux";
import {
  selectExercices,
  selectLoadingExercices,
  selectTotalExercices,
} from "../../../features/exercices/exerciceSelector";

const StudentProfile = ({ currentStudent, studentExercises }) => {
  const nbExercices = studentExercises.length;
  const isThereExercice = nbExercices > 0;

  // useEffect(() => {
  //   if (!loadingExercises && allExercises.length > 0) {
  //     const foundedExercises = [];
  //     idExercises.map((exercise) => {
  //       foundedExercises.push(
  //         allExercises.find(
  //           (exerciseImp) => exerciseImp.idExercises == exercise.idExercises
  //         )
  //       );
  //     });

  //     if (foundedExercises) {
  //       setStudentExercises(foundedExercises);
  //     }
  //   }
  // }, [loadingExercises, idExercises, allExercises]);

  return (
    <>
      {studentExercises ? (
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
            {currentStudent && (
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
                  {currentStudent.name}
                </Typography>
                <Typography variant="h3">{currentStudent.firstName}</Typography>
                <Typography variant="h4">
                  {currentStudent.studentClassName}
                </Typography>
              </Box>
            )}
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
              <Typography variant="h5">
                L'étudiant n'a pas réalisé d'exercice.
              </Typography>
            )}
            {isThereExercice && (
              <Typography variant="h5">
                Exercices effectués: {studentExercises.length}
              </Typography>
            )}
          </Box>
          <RecurrentErrors />
        </Box>
      ) : (
        <CircularProgress
          color="primary"
          sx={{ marginTop: "48vh", marginLeft: "48vw" }}
        />
      )}
    </>
  );
};

export default StudentProfile;
