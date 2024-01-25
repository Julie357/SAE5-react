import { createSlice } from "@reduxjs/toolkit";
import { loadClasses } from "./classAction";

const classSlice = createSlice({
  name: "clazz",
  initialState: {
    classes: [],
    loadingClasses: false,
    errorApi: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadClasses.pending, (state) => {
        state.loadingClasses = true;
      })
      .addCase(loadClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.loadingClasses = false;
      })
      .addCase(loadClasses.rejected, (state, action) => {
        state.errorApi = action.payload.error.message;
        state.loadingClasses = false;
      })
  },
});

export default classSlice.reducer;