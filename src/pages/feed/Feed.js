import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../Firebase/Firebase";
import Header from "../../components/global/Header";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";

function Feed() {
  const name = useSelector(userDetail);
  return (
    <div
    // onClick={() => {
    //   signOut(auth);
    // }}
    >
      <Header />

      <h1>{name.displayName}</h1>
    </div>
  );
}

export default Feed;
