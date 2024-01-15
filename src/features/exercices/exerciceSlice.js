import { createSlice } from "@reduxjs/toolkit";
import { loadErrorsStats, loadExercices } from "./exerciceAction";

const exerciceSlice = createSlice({
  name: "exercice",
  initialState: {
    exercices: [],
    loadingExercices: false,
    errorApi: null,
    recurrentErrors: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadExercices.pending, (state) => {
        state.loadingExercices = true;
      })
      .addCase(loadExercices.fulfilled, (state, action) => {
        state.exercices = action.payload;
        state.loadingExercices = false;
      })
      .addCase(loadExercices.rejected, (state, action) => {
        // Utilisez action.error pour accéder à l'erreur
        state.errorApi = action.error.message;
        state.loadingExercices = false;
      })
      .addCase(loadErrorsStats.fulfilled, (state, action) => {
        state.recurrentErrors = action.payload;
      })
      .addCase(loadErrorsStats.rejected, (state, action) => {
        // Utilisez action.error pour accéder à l'erreur
        state.errorApi = action.error.message;
      });
  },
});

export default exerciceSlice.reducer;