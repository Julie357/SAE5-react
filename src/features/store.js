import { configureStore } from "@reduxjs/toolkit";
import exerciceReducer from "./exercices/exerciceSlice";

const store = configureStore({
  reducer: {
    exercice: exerciceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;