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

export const sortByQuery = (exercises, query) => {
  return exercises.filter(
    (exercise) =>
      query === "" || exercise.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterByLevel = (exercises, level) => {
  if (!level) {
    return exercises;
  }
  return exercises.filter((exercise) => exercise.exercisesSkillLevel === level);
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