import { createSlice } from "@reduxjs/toolkit";
import { loadLexical } from "./lexicalAction";

const lexicalSlice = createSlice({
  name: "lexical",
  initialState: {
    lexical: [],
    loadingLexical: false,
    errorApi: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLexical.pending, (state) => {
        state.loadingLexical = true;
      })
      .addCase(loadLexical.fulfilled, (state, action) => {
        state.lexical = action.payload;
        state.loadingLexical = false;
      })
      .addCase(loadLexical.rejected, (state, action) => {
        state.errorApi = action.payload.error.message;
        state.loadingLexical = false;
      })
  },
});

export default lexicalSlice.reducer;