import { createSelector } from "@reduxjs/toolkit";

export const selectExercices = (state) => state.exercice.exercices;
export const selectTotalExercices = (state) => state.exercice.exercices.length;
export const selectLoadingExercices = (state) =>
  state.exercice.loadingExercices;
export const selectExercicesUncorrected = createSelector(
  [selectExercices],
  (exercices) => exercices.filter((exercice) => exercice.correction === false)
);
export const selectExercicesSortByDate = createSelector(
  [selectExercices],
  (exercice) =>
    [...exercice].sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      const result = date2 - date1;
      return result;
    })
);

export const selectExercicesUncorrectedSortByDate = createSelector(
  [selectExercicesUncorrected],
  (exercice) =>
    [...exercice].sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      const result = date2 - date1;
      return result;
    })
);

export const selectRecurrentErrors = (state) => state.exercice.recurrentErrors;
