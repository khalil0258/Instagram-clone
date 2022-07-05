import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";
import { storage } from "../../Firebase/Firebase";

function ProfilePost({ post }) {
  console.log("props", post);
  const [url, setUrl] = useState("");
  const user = useSelector(userDetail);
  useEffect(() => {
    getDownloadURL(
      ref(storage, `users/${user.id}/posts/${post.imageUrl}`)
    ).then((url) => {
      setUrl(url);
    });
  }, [post]);
  return (
    <div className="w-[293px]  h-[293px] cursor-pointer">
      <img src={url} alt="profile Post" className="h-full w-full object-cover" />
    </div>
  );
}

export default ProfilePost;
