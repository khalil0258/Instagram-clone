import React, { useEffect, useState } from "react";
import Post from "./Post";
import Instagram from "../../assets/icons/Instagram-13.svg";
import { list, ref } from "firebase/storage";
import { auth, db, storage } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

function Posts() {

  const [showLoadingIcon, setShowLoadinIcon] = useState(false);
  const [postss, setPostss] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const userInfos = await getDoc(doc(db, "users", auth.currentUser.uid));
      // console.log(userInfos.data());
      let following = [...userInfos.data().followed];
      following.push(auth.currentUser.uid);
      let AllPosts = [];
      await Promise.all(
        following?.map(async (foll) => {
          let usersPosts = await getDocs(
            collection(db, "users", foll, "posts")
          );
          usersPosts.forEach((userPost) => {
            AllPosts.push({ PostId: userPost.id, ...userPost.data() });
          });
        })
      );
      AllPosts.sort((a, b) => {
        return b.time - a.time;
      });
      // console.log("all posts", AllPosts);
      return AllPosts;
    };
    fetch()
      .then((res) => {
        setPostss(res);
      })
      .then(() => {
        // console.log("postss", postss);
      });
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
        {
          !!postss?.length &&
            Object.values(postss).map((post, index) => (
              <Post key={index} post={post} />
            ))
          // postss?.map((post, index) => <Post key={index} posts={post} />
        }
      </div>
    </div>
  );
}

export default Posts;
