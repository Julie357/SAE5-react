import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API_LEXICAL } from "../utils/config"

export const loadLexical = createAsyncThunk(
  "lexical/loadLexical",
  async () => {
    try {
      const response = await axios.get(URL_API_LEXICAL);
      const lexicalArray = response.data;
      return lexicalArray;
    } catch (error) {
      throw new Error(error);
    }
  }
);