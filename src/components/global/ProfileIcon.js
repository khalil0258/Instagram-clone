import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDetail } from "../../features/auth-state/auth-slice";

import MenuModal from "./MenuModal";
function ProfileIcon() {
  const [showMenu, setShowMenu] = useState(false);
  const clicked = () => {
    setShowMenu(false);
  };
  const imgUrl = useSelector(userDetail);
  // console.log(imgUrl);
  return (
    <div className="">
      {/* Khassni ndir hadak menu b portal bach ki nekliki f screen temchi */}
      {/* checked */}

      <div
        className="h-7 w-7 "
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {imgUrl?.photoURL ? (
          <img src={imgUrl.photoURL} alt="" className="h-7 w-7 rounded-3xl" />
        ) : (
          <div className="h-7 w-7 rounded-3xl bg-gray-100"></div>
        )}
      </div>

      <MenuModal open={showMenu} clicked={clicked} />
    </div>
  );
}

export default ProfileIcon;
