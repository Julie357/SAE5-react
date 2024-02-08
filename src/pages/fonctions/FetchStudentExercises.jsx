import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectExercices,
  selectLoadingExercices,
} from "../../features/exercices/exerciceSelector";
import {
  selectLoadingStudents,
  selectStudents,
} from "../../features/students/studentSelector";

const FetchStudentExercises = (idStudent) => {
  const students = useSelector(selectStudents);
  const loadingStudents = useSelector(selectLoadingStudents);
  const [currentStudent, setCurrentStudent] = useState(null);
  const allExercises = useSelector(selectExercices);
  const loadingExercises = useSelector(selectLoadingExercices);
  const [studentExercises, setStudentExercises] = useState(null);
  const [studentExercisesUncorrected, setStudentExercisesUncorrected] = useState([]);

  useEffect( () => {
    if (!loadingStudents && students.length > 0) {
      const foundStudent = students.find(
        (student) => student.idStudent == idStudent
      );

      if (foundStudent) {
        setCurrentStudent(foundStudent);

        if (!loadingExercises && allExercises.length > 0) {
          const foundedExercises = [];
          const idExercises = foundStudent.idExercises;
          idExercises.map((exercise) => {
            const found = allExercises.find(
              (exerciseImp) => exerciseImp.idExercises == exercise
            );
            foundedExercises.push(found);
          });

          if (foundedExercises) {
            setStudentExercises(foundedExercises);

            const unCorrectedExercises = [];
            foundedExercises.map((exercise) => {
              if (exercise.correction == false) {
                unCorrectedExercises.push(exercise);
              }
            });
            setStudentExercisesUncorrected(unCorrectedExercises);
          }
        }
      }
    }
  }, [loadingStudents, idStudent, students, loadingExercises, allExercises]);

  return {
    loadingStudents,
    currentStudent,
    studentExercises,
    studentExercisesUncorrected,
  };
};

export default FetchStudentExercises;
