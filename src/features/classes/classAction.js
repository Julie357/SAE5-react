import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API_CLASS } from "../utils/config"

export const loadClasses = createAsyncThunk(
  "clazz/loadClasses",
  async () => {
    try {
      const response = await axios.get(URL_API_CLASS);
      const classesArray = response.data;
      return classesArray;
    } catch (error) {
      throw new Error(error);
    }
  }
);