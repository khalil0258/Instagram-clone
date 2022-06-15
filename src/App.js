import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import SingUp from "./components/signup/SingUp";
import Feed from "./pages/feed/Feed";

import ProtectedRoutes from "./ProtectedRoutes";
import useAuth from "./use-Auth";
import SignUpPage from "./pages/signUp/SignUpPage";
import {
  onAuthStateChanged,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "./Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithEmail,
  logout,
  setLoading,
} from "./features/auth-state/auth-slice";
import Loading from "./components/global/Loading";
import Profile from "./pages/profile/Profile";

function App() {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    const fetchState = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          dispatch(loginWithEmail({ user2: user, authenticated: true }));
          dispatch(setLoading(false));
        } else {
          // User is signed out
          // ...

          dispatch(logout());
          dispatch(setLoading(false));
        }
      });
    };

    fetchState();
  }, []);

  // ndir loading state f redux tkoun true eya w ki yetla3 tweli false
  console.log(isAuth);
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<SignUpPage />} exact />
        <Route
          path="/"
          element={<ProtectedRoutes isAuth={isAuth} loading={loading} />}
        >
          <Route path="feed" element={<Feed />} exact />
          <Route path=":id" element={<Profile />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// the ancien version of protected routes

{
  /* <ProtectedRoutes path="/feed" Component={Feed} isAuth={isAuth} /> */
}
