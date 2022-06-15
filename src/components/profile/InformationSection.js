import React, { useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { HeaderContainer } from "../global/ContainerSignup";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function InformationSection({ userState, followed }) {
  return (
    <div>
      <HeaderContainer>
        <div className="flex  max-h-[170px] w-full ">
          {/* the right section of the information section which shows the profile pic */}
          <div className="min-w-[100px] md:w-1/3  flex justify-center items-center">
            <img
              src={require("../../assets/signupAssets/my.jpg")}
              alt="profile image"
              className=" h-3/5  object-cover rounded-full md:h-full"
            />
          </div>
          {/* the left secion of the information section which shows the profile information and some extra features */}
          <div className="text-left pl-4 ">
            {/* the above section that shows the profile name */}
            <div className="flex justify-start items-center mb-6">
              <h2 className="text-lg mr-12 ">khalil_____hjz</h2>
              {userState ? (
                // profile of the user
                <CurrentUser />
              ) : followed ? (
                // profile of followed user
                <Followed />
              ) : (
                // profile of not followed user
                <NotFollowed />
              )}
            </div>
            {/* section that shows the followers and the following and the posts number */}
            <div className="flex items-center">
              {/* posts number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">22</span>
                posts
              </div>
              {/* followers number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">22</span>
                followers
              </div>
              {/* following number  */}
              <div className="font-normal text-md mr-14">
                <span className="font-medium text-[16px] mr-1">22</span>
                following
              </div>
            </div>
            {/* ////////////////////////////////////// */}
            {/* now the description section */}
            <div className="mt-6">
              <p className="text-md ">
                jest-dom adds custom jest matchers for asserting on DOM nodes.
                allows you to do things like:
              </p>
            </div>
          </div>
        </div>
        {/* now saved stories section  */}
        <div>now saved stories section</div>
      </HeaderContainer>
    </div>
  );
}

const Followed = () => {
  return (
    <div className="flex ">
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        Message
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        <FavoriteBorderOutlinedIcon sx={{ height: "23px", width: "27px" }} />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        <MoreHorizIcon />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium    ">
        <MoreHorizIcon />
      </button>
    </div>
  );
};
const CurrentUser = () => {
  return (
    <div>
      <button className="px-1 capitalize  mr-2 text-sm font-medium  border border-black border-opacity-20 rounded-sm ">
        edit Profile
      </button>
      <FavoriteBorderOutlinedIcon />
    </div>
  );
};
const NotFollowed = () => {
  return (
    <div className="flex  ">
      <button className=" capitalize  mr-2 text-xs px-4 font-medium bg-blue-500 text-white  rounded-sm ">
        follow
      </button>

      <button className="px-1 capitalize  mr-2 text-sm font-medium bg-blue-500 text-white  rounded-sm ">
        <MoreHorizIcon />
      </button>
      <button className="px-1 capitalize  mr-2 text-sm font-medium    ">
        <MoreHorizIcon />
      </button>
    </div>
  );
};
export default InformationSection;
