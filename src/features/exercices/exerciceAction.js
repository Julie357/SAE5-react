import { createAsyncThunk } from "@reduxjs/toolkit";
import errorsData from "./data/recurrentErrors.json";
import axios from "axios";
import { URL_API_EXERCICES } from "../utils/config"

export const loadExercices = createAsyncThunk(
  "exercice/loadExercices",
  async () => {
    try {
      const response = await axios.get(URL_API_EXERCICES);
      const exercicesArray = response.data;
      return exercicesArray;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loadErrorsStats = createAsyncThunk(
  "exercice/loadErrorStats",
  async () => {
    try {
      return errorsData;
    } catch (error) {
      throw new Error(error);
    }
  }
)
