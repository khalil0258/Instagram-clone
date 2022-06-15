import { configureStore } from "@reduxjs/toolkit";
import reducer from "../features/auth-state/auth-slice";
import ProfileSlice from "../features/profileSlice/Profile-Slice";

export const store = configureStore({
  reducer: {
    auth: reducer,
    profile: ProfileSlice,
  },
});
