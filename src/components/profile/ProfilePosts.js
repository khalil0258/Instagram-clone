import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db, storage } from "../../Firebase/Firebase";
import { HeaderContainer } from "../global/ContainerSignup";
// import { getDownloadURL, ref } from "firebase/storage";

import PostComment from "../postsComments/PostComment";
import PostsPro from "./PostsPro";
function ProfilePosts({ infos, userState }) {
  const [postss, setPostss] = useState([]);
  console.log("infos", infos);

  const [profileStat, setProfileStat] = useState({
    post: "post",
  });

  console.log(profileStat.post || profileStat.tagged || profileStat.saved);
  useEffect(() => {
    const fetchProfileInfos = async () => {
      let postsArray = [];
      const q = query(
        collection(db, "users", infos?.userId, "posts"),
        orderBy("time", "desc")
      );
      let posts = await getDocs(q);

      posts.forEach((element) => {
        postsArray.push({ id: element.id, ...element.data() });
      });
      return postsArray;
    };
    fetchProfileInfos().then((res) => {
      setPostss(res);
      console.log("res", res);
    });
  }, [profileStat, infos]);

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
        {!!profileStat.post && postss.length === 0 && (
          <div
            id="posts"
            className="text-center capitalize font-sans font-medium text-xl relative top-12"
          >
            No posts
          </div>
        )}
        <div className="flex  items-start justify-start gap-8 flex-wrap pb-24 ">
          {!!profileStat.post &&
            postss.length != 0 &&
            postss?.map((post) => <PostsPro id={infos?.userId} post={post} />)}
        </div>
      </div>
    </HeaderContainer>
  );
}

export default ProfilePosts;
