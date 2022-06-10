import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostSetingsModal from "./PostSetingsModal";

function PostName() {
  const [showPostSetingsPortal, setShowPostSetingsPortal] = useState(false);
  const clicked = () => {
    setShowPostSetingsPortal(false);
  };
  return (
    <div className="flex px-3  items-center justify-between py-2">
      {/* this is the profile img and the profile name  */}
      <div className="flex items-center">
        <img
          src={require("../../assets/signupAssets/pic2.png")}
          alt="profileImg"
          className="h-9 w-9 rounded-3xl object-cover mr-3 cursor-pointer "
        />
        <h3 className="text-[15px] font-medium cursor-pointer">
          khalil_____hjz
        </h3>
      </div>
      {/* the card setting */}
      <div>
        <MoreHorizIcon
          className="cursor-pointer"
          onClick={() => {
            console.log("hello");
            setShowPostSetingsPortal((prevState) => {
              return !prevState;
            });
          }}
        />
      </div>
      <PostSetingsModal open={showPostSetingsPortal} clicked={clicked} />
    </div>
  );
}

export default PostName;
