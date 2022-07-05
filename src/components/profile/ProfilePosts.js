import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { db, storage } from "../../Firebase/Firebase";
import { HeaderContainer } from "../global/ContainerSignup";
import { getDownloadURL, ref } from "firebase/storage";
import ProfilePost from "./ProfilePost";

function ProfilePosts() {
  const [postss, setPostss] = useState([]);

  const [profileStat, setProfileStat] = useState({
    post: "post",
  });
  const user = useSelector(userDetail);
  console.log(profileStat.post || profileStat.tagged || profileStat.saved);
  useEffect(() => {
    const fetchProfileInfos = async () => {
      let postsArray = [];
      const q = query(
        collection(db, "users", user.id, "posts"),
        orderBy("time", "desc")
      );
      let posts = await getDocs(q);
      posts.forEach((element) => {
        postsArray.push(element.data());
      });
      return postsArray;
    };
    fetchProfileInfos().then((res) => {
      setPostss(res);
      console.log(res);
    });
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
        <div className="flex  items-start justify-between gap-y-2 flex-wrap">
          {!!profileStat.post && !postss && <div id="posts">no posts yet</div>}
          {!!profileStat.post &&
            postss?.map((post) => <ProfilePost post={post} />)}
        </div>
      </div>
    </HeaderContainer>
  );
}

export default ProfilePosts;
