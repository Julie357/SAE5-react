import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import StudentData from "./components/StudentCardComponents/StudentData";
import StudentProfile from "./components/StudentCardComponents/StudentProfile";
import FetchStudentExercises from "./fonctions/FetchStudentExercises";

const StudentCard = () => {
  const { idStudent } = useParams();
  const {
    loadingStudents,
    currentStudent,
    studentExercises,
    studentExercisesUncorrected,
  } = FetchStudentExercises(idStudent);

  if (loadingStudents) {
    return (
      <CircularProgress
        color="primary"
        sx={{ marginTop: "48vh", marginLeft: "48vw" }}
      />
    );
  }

  return (
    <>
      {currentStudent ? (
        <Grid
          container
          sx={{
            top: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item sx={{ height: "95vh", marginLeft: "2vw" }}>
            <StudentProfile
              currentStudent={currentStudent}
              studentExercises={studentExercises}
            />
          </Grid>
          <Grid item sx={{ height: "95vh", marginRight: "2vw" }}>
            <StudentData
              studentExercises={studentExercises}
              studentExercisesUncorrected={studentExercisesUncorrected}
              student= {currentStudent}
            />
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

export default StudentCard;
