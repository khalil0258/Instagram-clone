import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import Loading from "./components/global/Loading";

import useAuth from "./use-Auth";

function ProtectedRoutes({ isAuth: isAuth, loading: loading }) {
  // const Auth = useAuth();
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  // console.log("hhhh", isAuth);
  // else {
  //   if (loading) {
  //     return <Loading />;
  //   }
  //   return <Outlet />;
  // }
  return <Outlet />;
}

export default ProtectedRoutes;

// <Route
//   {...rest}
//   render={(props) => {
//     if (isAuth) {
//       return <Component />;
//     } else {
//       return (
//         <Navigate to={{ pathname: "/", state: { from: props.location } }} />
//       );
//     }
//   }}
// />
