import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/auth-state/auth-slice";

export const store = configureStore({
  reducer: {
    auth: reducer,
  },
});
