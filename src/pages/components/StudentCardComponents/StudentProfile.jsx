import React from "react";
import Box from "@mui/system/Box";
import RecurrentErrors from "./RecurrentErrors";
import { CircularProgress, Typography } from "@mui/material";
import "@fontsource/itim";

const StudentProfile = ({ currentStudent, studentExercises }) => {
  const nbExercices = studentExercises.length;
  const isThereExercice = nbExercices > 0;
  const levelAverrage = currentStudent.skillLevel[0].value;

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
            {currentStudent.avatar ? (
              <Box
                component="img"
                src={currentStudent.avatar}
                alt="Avatar"
                sx={{ width: "23%", height: "100%" }}
              />
            ) : (
              <Box
                component="img"
                src="../assets/studentPicture.png"
                alt="Avatar"
                sx={{
                  width: "23%",
                  padding: "10px",
                  backgroundColor: "#FFFFFF50",
                }}
              />
            )}
            {currentStudent && (
              <Box
                sx={{
                  width: "70%",
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
            <Typography variant="h5">Niveau : {levelAverrage}</Typography>
            {!isThereExercice && (
              <Typography variant="h5">
                L'étudiant n'a pas réalisé d'exercice.
              </Typography>
            )}
            {isThereExercice && (
              <Typography variant="h5">
                {`${
                  studentExercises.length > 1
                    ? "Exercices effectués :"
                    : "Exercice effectué :"
                }`}{" "}
                {studentExercises.length}
              </Typography>
            )}
          </Box>
          <RecurrentErrors currentStudent={currentStudent} />
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
