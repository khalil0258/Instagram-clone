import { createAsyncThunk, createSlice, extraReducers } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const initialState = {
  user: {},
  authenticated: false,
  loading: true,
};

export const Auth_Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginWithEmail: (state, action) => {
      //   console.log(action.payload);
      state.user = action.payload.user2;
      state.authenticated = action.payload.authenticated;
    },
    logout: (state) => {
      state.authenticated = false;
      state.user = {};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
// export const createUserWithEmailAndPasswordd = createAsyncThunk(
//   "auth/createUserWithEmailAndPassword",
//   async (payload) => {
//     const response = await createUserWithEmailAndPassword(
//       auth,
//       payload.email,
//       payload.password
//     );
//     return response;
//   }
// );

// const initialState = {
//   status: false,
//   user: {},
// };

// export const Auth_Slice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createUserWithEmailAndPasswordd.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createUserWithEmailAndPasswordd.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.user = action.payload?.user;
//       });
//   [createUserWithEmailAndPasswordd.pending]:(state,action) => {
//         state.status =true ;
//       },
//   [createUserWithEmailAndPasswordd.fulfilled]:(state,action) => {
//         state.status = false;
//         state.user = action.payload;
//       }
//   },
// });

// Action creators are generated for each case reducer function
export const { loginWithEmail, logout, setLoading } = Auth_Slice.actions;
export const userDetail = (state) => state.auth.user;
export const authenticated = (state) => state.auth.authenticated;

export default Auth_Slice.reducer;
