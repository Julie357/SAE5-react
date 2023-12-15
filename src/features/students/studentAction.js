import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API_STUDENTS } from "../utils/config"

export const loadStudents = createAsyncThunk(
  "student/loadStudents",
  async () => {
    try {
      const response = await axios.get(URL_API_STUDENTS);
      const studentsArray = response.data;
      return studentsArray;
    } catch (error) {
      throw new Error(error);
    }
  }
);
