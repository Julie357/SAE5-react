import React, { useState, useEffect } from "react";
import StudentProfile from "./components/StudentCardComponents/StudentProfile";
import StudentData from "./components/StudentCardComponents/StudentData";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectLoadingStudents,
  selectStudents,
} from "../features/students/studentSelector";
import { useParams } from "react-router-dom";
import { selectExercices, selectLoadingExercices } from "../features/exercices/exerciceSelector";

const StudentCard = () => {
  const { idStudent } = useParams();
  const students = useSelector(selectStudents);
  const loadingStudents = useSelector(selectLoadingStudents);
  const [currentStudent, setCurrentStudent] = useState(null);
  
  const allExercises = useSelector(selectExercices);
  const loadingExercises = useSelector(selectLoadingExercices);
  const [studentExercises, setStudentExercises] = useState(null);


  useEffect(() => {
    if (!loadingStudents && students.length > 0) {
      const foundStudent = students.find((student) => student.idStudent == idStudent);

      if (foundStudent) {
        setCurrentStudent(foundStudent);

        if (!loadingExercises && allExercises.length > 0) {
          const foundedExercises = [];
          const idExercises = foundStudent.idExercises;
          idExercises.map((exercise) => {
            foundedExercises.push(
              allExercises.find(
                (exerciseImp) => exerciseImp.idExercises == exercise.idExercises
              )
            );
          });
    
          if (foundedExercises) {
            setStudentExercises(foundedExercises);
          }
        }
      }
    }
  }, [loadingStudents, idStudent, students, loadingExercises, allExercises]);

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
            <StudentProfile currentStudent={currentStudent} studentExercises={studentExercises} />
          </Grid>
          <Grid item sx={{ height: "95vh", marginRight: "2vw" }}>
            <StudentData studentExercises={studentExercises} />
          </Grid>
        </Grid>
      ) : (
        <CircularProgress color="primary" sx={{ marginTop: "48vh", marginLeft: "48vw" }} />
      )}
    </>
  );
};

export default StudentCard;

