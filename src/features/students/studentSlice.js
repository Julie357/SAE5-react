import { createSlice } from "@reduxjs/toolkit";
import { loadStudents } from "./studentAction";


const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loadingStudents: false,
    errorApi: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStudents.pending, (state) => {
        state.loadingStudents = true;
      })
      .addCase(loadStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loadingStudents = false;
      })
      .addCase(loadStudents.rejected, (state, action) => {
        state.errorApi = action.payload.error.message;
        state.loadingStudents = false;
      })
  },
});

export default studentSlice.reducer;