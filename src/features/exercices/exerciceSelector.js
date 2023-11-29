import { createSelector } from "@reduxjs/toolkit";

export const selectExercices = (state) => state.exercice.exercices;
export const selectTotalExercices = (state) => state.exercice.exercices.length;
export const selectLoading = (state) => state.exercice.loading;
export const selectExercicesUncorrected = createSelector(
  [selectExercices],
  (exercices) => exercices.filter((exercice) => exercice.correction === false)
);
