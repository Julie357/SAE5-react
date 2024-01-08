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
