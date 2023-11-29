import { createSlice } from "@reduxjs/toolkit";
import { loadExercices } from "./exerciceAction";

const exerciceSlice = createSlice({
  name: "exercice",
  initialState: {
    exercices: [],
    loading: false,
    errorApi: null,
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
      });
  },
});

export default exerciceSlice.reducer;