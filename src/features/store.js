import { configureStore } from "@reduxjs/toolkit";
import exerciceReducer from "./exercices/exerciceSlice";
import studentReducer from "./students/studentSlice";
import classReducer from "./classes/classSlice";
import lexicalReducer from "./lexical/lexicalSlice";

const store = configureStore({
  reducer: {
    exercice: exerciceReducer,
    student: studentReducer,
    clazz: classReducer,
    lexical: lexicalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;