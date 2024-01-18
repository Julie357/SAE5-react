export const sortByDateAscending = (exercises) => {
  return [...exercises].sort((a, b) => {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);
    return date1 - date2;
  });
};

export const sortByDateDescending = (exercises) => {
  return [...exercises].sort((a, b) => {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);
    return date2 - date1;
  });
};

export const sortByAlphabet = (exercises) => {
  return [...exercises].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByClasses = (classes) => {
  return [...classes].sort((a, b) => a.classname.localeCompare(b.classname));
};

export const sortByStudents = (students) => {
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortByClassesDescending = (classes) => {
  return [...classes].sort((a, b) => b.classname.localeCompare(a.classname));
};

export const sortByStudentsDescending = (students) => {
  return [...students].sort((a, b) => b.name.localeCompare(a.name));
};

export const sortByQuery = (exercises, query) => {
  return exercises.filter(
    (exercise) =>
      query === "" || exercise.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const sortClassesByQuery = (classes, query) => {
  return classes.filter(
    (clazz) =>
      query === "" || clazz.classname.toLowerCase().includes(query.toLowerCase())
  );
};

export const sortByStudentsByQuery = (students, query) => {
  return students.filter(
    (student) =>
      query === "" || student.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterByLevel = (exercises, level) => {
  if (!level) {
    return exercises;
  }
  return exercises.filter((exercise) => exercise.exercisesSkillLevel === level);
};

export const filterStudentsByLevel = (students, level) => {
  if (!level) {
    return students;
  }
  return students.filter((student) => student.skillLevel[0].value === level);
};

export const filterByDate = (exercises, date) => {
  return exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.date);
    return exerciseDate.toDateString() === new Date(date).toDateString();
  });
};

export const filterByCorrection = (exercises, correction) => {
  if (correction) {
    return exercises.filter((exercise) => exercise.correction === true);
  } else {
    return exercises;
  }
};