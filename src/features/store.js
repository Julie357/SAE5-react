import { configureStore } from "@reduxjs/toolkit";
import exerciceReducer from "./exercices/exerciceSlice";
import studentReducer from "./students/studentSlice";

const store = configureStore({
  reducer: {
    exercice: exerciceReducer,
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;