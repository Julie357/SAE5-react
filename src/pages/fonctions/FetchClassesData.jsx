import { useSelector } from "react-redux";
import {
  selectLoadingStudents,
  selectStudents,
} from "../../features/students/studentSelector";
import { selectClasses } from "../../features/classes/classSelector";
import { useEffect, useState } from "react";

const FetchClassesData = (idClass) => {
  const allClasses = useSelector(selectClasses);
  const allStudents = useSelector(selectStudents);
  const classData = allClasses.find((cls) => cls.idClass == idClass);
  const idStudentsOfTheClass = classData.studentOfClassById;
  const [studentsOfTheClass, setStudents] = useState([]);

  const loadingStudents = useSelector(selectLoadingStudents);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = idStudentsOfTheClass.map((idStudent) =>
        allStudents.find((student) => student.idStudent === idStudent)
      );
      setStudents(students);
    };

    fetchStudents();
  }, [idStudentsOfTheClass, allStudents]);

  return {
    loadingStudents,
    studentsOfTheClass,
    classData,
  };
};

export default FetchClassesData;
