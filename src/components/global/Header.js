import React, { useState } from "react";
import { HeaderContainer } from "./ContainerSignup";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProfileIcon from "./ProfileIcon";

function Header() {
  const [img, setImg] = useState(true);
  return (
    <nav className="bg-white py-3 px-[20px] border border-b-[2px] border-slate-200">
      {/* header container that making him in the middle */}
      <HeaderContainer>
        <div className="flex items-center justify-between ">
          {/* logo section  */}
          <div className="flex-grow">
            <img
              className="h-8"
              src={require("../../assets/logo.png")}
              alt=""
            />
          </div>
          {/* input section  */}
          <div className="hidden md:flex bg-[#efefef] py-2 px-3 w-64 rounded-md items-center flex-shrink">
            {img && (
              <img
                src={require("../../assets/icons/searchIcon.png")}
                alt=""
                className="h-5 mr-2"
              />
            )}
            <input
              type="text"
              className="bg-transparent placeholder:font-light outline-none text-sm font-light "
              onFocus={() => {
                setImg(false);
              }}
              onBlur={() => {
                setImg(true);
              }}
              placeholder="Rechercher"
            />
          </div>
          {/* navigation icons section  */}
          <div id="navIcons" className="flex items-center ml-20">
            <div className="mr-6 cursor-pointer">
              <HomeIcon sx={{ height: "33px", width: "33px" }} />
            </div>
            <div className="mr-6 cursor-pointer relative ">
              <img
                src={require("../../assets/icons/messengerIcon.png")}
                alt="messenger"
                className="transform scale-50"
              />
              <span className="spanIcon">1</span>
            </div>
            <div className="mr-6 cursor-pointer">
              <AddBoxOutlinedIcon sx={{ height: "33px", width: "33px" }} />
            </div>
            <div className="mr-6 cursor-pointer">
              <ExploreOutlinedIcon sx={{ height: "33px", width: "33px" }} />
            </div>
            <div className="mr-6 cursor-pointer">
              <FavoriteBorderOutlinedIcon
                sx={{ height: "33px", width: "33px" }}
              />
            </div>
            <div>
              <ProfileIcon />
            </div>
          </div>
        </div>
      </HeaderContainer>
    </nav>
  );
}

export default Header;
