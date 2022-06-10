import React, { useState } from "react";
import Post from "./Post";
import Instagram from "../../assets/icons/Instagram-13.svg";

function Posts() {
  const [showLoadingIcon, setShowLoadinIcon] = useState(false);
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
      <div>
          {/* storys */}
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Posts;
