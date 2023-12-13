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

const StudentCard = () => {
  const { idStudent } = useParams();
  const students = useSelector(selectStudents);
  const loadingStudents = useSelector(selectLoadingStudents);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [studentNotFound, setStudentNotFound] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log('in')
        if (!loadingStudents && !currentStudent && students.length > 0) {
          const foundStudent = students.find(
            (student) => student.idStudent === idStudent
          );

          if (foundStudent) {
            const { idStudent, name, firstName, skillLevel } = foundStudent;
            setCurrentStudent({
              idStudent,
              name,
              firstName,
              skillLevel,
            });
            console.log("found");
            console.log(currentStudent);
          } else {
            console.log("not found");
          }
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [loadingStudents, currentStudent, idStudent, students]);

  if (loadingStudents) {
    return (
      <CircularProgress
        color="primary"
        sx={{ marginTop: "48vh", marginLeft: "48vw" }}
      />
    );
  }

  if (studentNotFound) {
    return <div>Il n'y a pas d'étudiant correspondant</div>;
  }

  return (
    <>
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
          <StudentProfile student={currentStudent} />
        </Grid>
        <Grid item sx={{ height: "95vh", marginRight: "2vw" }}>
          <StudentData />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentCard;
