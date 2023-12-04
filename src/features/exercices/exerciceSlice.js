import { createSlice } from "@reduxjs/toolkit";
import { loadErrorsStats, loadExercices } from "./exerciceAction";

const exerciceSlice = createSlice({
  name: "exercice",
  initialState: {
    exercices: [],
    loading: false,
    errorApi: null,
    recurrentErrors: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadExercices.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadExercices.fulfilled, (state, action) => {
        state.exercices = action.payload;
        state.loading = false;
      })
      .addCase(loadExercices.rejected, (state, action) => {
        state.errorApi = action.payload.error.message;
        state.loading = false;
      })
      .addCase(loadErrorsStats.fulfilled, (state, action) => {
        state.recurrentErrors = action.payload;
      })
      .addCase(loadErrorsStats.rejected, (state, action) => {
        state.errorApi = action.payload.error.message;
      });
  },
});

export default exerciceSlice.reducer;