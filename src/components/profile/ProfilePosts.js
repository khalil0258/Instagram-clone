import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db } from "../../Firebase/Firebase";
import { HeaderContainer } from "../global/ContainerSignup";

function ProfilePosts() {
  const [profileStat, setProfileStat] = useState({
    post: "post",
  });
  const user = useSelector(userDetail);
  console.log(profileStat.post || profileStat.tagged || profileStat.saved);
  useEffect(() => {
    const fetchProfileInfos = async () => {
    //   await getDocs(
    //     collection(
    //       db,
    //       "users",
    //       user.uid,
    //       profileStat.post || profileStat.tagged || profileStat.saved
    //     )
    //   );
    };
  }, [profileStat]);

  return (
    <HeaderContainer>
      <div className=" border-t border-t-black border-opacity-10 ">
        <div className="flex items-center justify-center ">
          <div
            id="post"
            className={`text-gray-400 font-medium mr-20 py-4 text-sm  cursor-pointer ${
              !!profileStat.post && "active"
            } }`}
            onClick={() => {
              setProfileStat({
                post: "post",
              });
            }}
          >
            Posts
          </div>
          <div
            id="saved"
            className={`text-gray-400 font-medium mr-20 py-4  text-sm cursor-pointer  ${
              !!profileStat.saved && "active"
            }`}
            onClick={() => {
              setProfileStat({
                saved: "saved",
              });
            }}
          >
            Saved
          </div>
          <div
            id="tagged"
            className={`text-gray-400 font-medium mr-20  py-4  text-sm cursor-pointer  ${
              !!profileStat.tagged && "active"
            }`}
            onClick={() => {
              setProfileStat({
                tagged: "tagged",
              });
            }}
          >
            tagged
          </div>
        </div>
        {/* posts section  */}
        {!!profileStat.post && <div id="posts">no posts yet</div>}
      </div>
    </HeaderContainer>
  );
}

export default ProfilePosts;
