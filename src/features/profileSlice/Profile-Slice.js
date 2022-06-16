import { createAsyncThunk, createSlice, extraReducers } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const initialState = {
  userId: "",
  loading: false,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileId: (state, action) => {
      //   console.log(action.payload);
      state.userId = action.payload.id;
      state.loading = true;
    },
    setComponentLoading: (state, action) => {
      state.loading = action.payload;
      
    },
  },
});
// Action creators are generated for each case reducer function
export const { setProfileId, setComponentLoading } = ProfileSlice.actions;
export const userId = (state) => state.profile.userId;
export const loading2 = (state) => state.profile.loading;

export default ProfileSlice.reducer;
