import React, { useEffect, useState } from "react";
import Post from "./Post";
import Instagram from "../../assets/icons/Instagram-13.svg";
import { list, ref } from "firebase/storage";
import { db, storage } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { getDoc, getDocs } from "firebase/firestore";

function Posts() {
  const user = useSelector(userDetail);
  const [showLoadingIcon, setShowLoadinIcon] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      // await getDocs(db, "users", user.uid, "posts").then((res) => {
      //   // list(ref(storage, `users/${user.uid}/posts/r`));
      //   console.log(res);
      // });
    };
    fetch();
  }, []);
  return (
    <div>
      {/* this icon will be visible when we wait for the data to show up  */}
      {showLoadingIcon && (
        <div className="flex justify-center pb-2">
          <img
            src={Instagram}
            alt=""
            className="relative bottom-4 h-10 w-10 loadingAnimation"
          />
        </div>
      )}
      <div>{/* storys */}</div>
      <div>
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
    </div>
  );
}

export default Posts;
