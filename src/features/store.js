import { configureStore } from "@reduxjs/toolkit";
import exerciceReducer from "./exercices/exerciceSlice";
import studentReducer from "./students/studentSlice";
import classReducer from "./classes/classSlice";

const store = configureStore({
  reducer: {
    exercice: exerciceReducer,
    student: studentReducer,
    clazz: classReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;