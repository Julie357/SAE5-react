import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectExercices,
  selectLoadingExercices,
} from "../../features/exercices/exerciceSelector";
import {
  selectLoadingStudents,
  selectStudents,
} from "../../features/students/studentSelector";

const FetchClasseExercises = (classData) => {
  const allStudents = useSelector(selectStudents);
  const loadingStudents = useSelector(selectLoadingStudents);
  const students = classData.studentOfClassById;
  const allExercises = useSelector(selectExercices);
  const loadingExercises = useSelector(selectLoadingExercices);
  const [classeExercises, setClasseExercises] = useState(null);

  useEffect(() => {
    const dataStudents = [];
    if (!loadingStudents && allStudents.length > 0) {
      students.map((studentImp) => {
        const foundStudent = allStudents.find(
          (student) => student.idStudent == studentImp
        );
        dataStudents.push(foundStudent);
        console.log(dataStudents);
      });
    }
    console.log('dataStu' + dataStudents)
    if (dataStudents) {
      if (!loadingExercises && allExercises.length > 0) {
        
        const foundedExercises = [];
        dataStudents.map((student) => {
          const idExercises = student.idExercises;
          idExercises.map((exercise) => {
            const found = allExercises.find(
              (exerciseImp) => exerciseImp.idExercises == exercise
            );
            foundedExercises.push(found);
          });
        });

        if (foundedExercises) {
          setClasseExercises(foundedExercises);
        }
      }
    }
  }, [students, loadingExercises, allExercises]);

  return {
    loadingExercises,
    classeExercises,
  };
};

export default FetchClasseExercises;
