import React from "react";
import useAuth from "../../use-Auth";
import SingUp from "../../components/signup/SingUp";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../components/global/Loading";

function SignUpPage() {
  const isAuth = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  return (
    <>
      {loading ? <Loading /> : !isAuth ? <SingUp /> : <Navigate to="/feed" />}
    </>
  );
}

export default SignUpPage;
