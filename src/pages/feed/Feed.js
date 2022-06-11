import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import Header from "../../components/global/Header";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import Posts from "../../components/Posts/Posts";
import Suggested from "../../components/Suggested";
import { doc, getDoc } from "firebase/firestore";
// import Post from "../../components/Posts/Post";

function Feed() {
  const user = useSelector(userDetail);
  const [userData, setUserData] = useState();
  // console.log("user", user);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getDoc(doc(db, "users", user.uid));
      // console.log("doc", userData);
      return { ...userData.data() };
    };
    fetchData()
      .then((res) => {
        setUserData(res);
      })
      .then(() => {
        // console.log("data", userData);
      });
  }, []);

  return (
    <div
    // onClick={() => {
    //   signOut(auth);
    // }}
    >
      <Header />
      <div
        id="mainContent"
        className="flex justify-start items-start gap-2  w-[90%] mx-auto max-w-[890px] mt-24  "
      >
        <div className=" w-[90%] mx-auto sm:max-w-[400px] md:max-w-[470px]  ">
          <Posts />
        </div>
        {/* ................................................. */}
        {/* suggested section   */}
        <div className=" hidden  md:w-2/5 md:block ">
          <div className="py-2  flex justify-between items-center">
            <div className="flex gap-3 items-center ">
              <img
                src={user.photoURL}
                alt="profile image"
                className="h-[60px] w-[60px] rounded-full cursor-pointer"
              />
              <div className="text-left ">
                <h3 className="font-medium cursor-pointer ">
                  {userData?.userName}
                </h3>
                <p className="text-gray-500 text-sm capitalize">
                  {userData?.name}
                </p>
              </div>
            </div>
            <div className="text-[#53b6f7] font-medium text-xs cursor-pointer">
              Basculer
            </div>
          </div>
          <Suggested />
        </div>
      </div>
    </div>
  );
}

export default Feed;
