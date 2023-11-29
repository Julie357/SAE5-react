import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { URL_API_EXERCICES } from "../../utils/config";
import exercicesData from "./exercices.json";

export const loadExercices = createAsyncThunk(
  "exercice/loadExercices",
  async () => {
    try {
      return exercicesData;
    } catch (error) {
      throw new Error(error);
    }
  }
);
