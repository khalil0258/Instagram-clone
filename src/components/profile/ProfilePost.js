import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { storage } from "../../Firebase/Firebase";

function ProfilePost({ post, infos }) {
  console.log("props", infos);
  const [url, setUrl] = useState("");
  const user = useSelector(userDetail);
  useEffect(() => {
    getDownloadURL(
      ref(storage, `users/${infos?.userId}/posts/${post.imageUrl}`)
    ).then((url) => {
      setUrl(url);
    });
  }, []);
  return (
    <div className="w-[293px]  h-[293px] cursor-pointer relative">
      <img
        src={url}
        alt="profile Post"
        className="h-full w-full object-cover"
      />
      {user.id === infos?.userId && (
        <div
          className="w-full h-full hover:bg-slate-600 absolute top-0 right-0 "
          style={{ opacity: "0.3", zIndex: 122 }}
        ></div>
      )}
    </div>
  );
}
// finish addin post 

export default ProfilePost;
