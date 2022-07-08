import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function IconsHolder(props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="px-3 ">
      <div className="flex  items-center justify-between py-2">
        {/* this is where we can like the image or give it comment or share it   */}
        <div>
          <FavoriteBorderOutlinedIcon
            className={`mr-2 cursor-pointer ${liked && "text-red-500"} `}
            onClick={() => {
              setLiked((prevState) => {
                return !prevState;
              });
            }}
          />
          <ExploreOutlinedIcon className="mr-2 cursor-pointer " />
          <ExploreOutlinedIcon className="mr-2 cursor-pointer " />
        </div>
        <div>
          <MoreVertIcon className="cursor-pointer" />
        </div>
      </div>
      {/* people liked this post  */}
      <div className="text-left pb-1">
        {!!props?.likes?.length && (
          <p>
            Aime par
            <span className="text-[15px] font-medium cursor-pointer mx-1">
              {/* {firstLikes} */}
              {props?.likes?.length ? "component plaaece" : ""}
            </span>
            {props?.likes?.length != 1 && (
              <>
                et
                <span className="text-[15px] font-medium cursor-pointer mx-1">
                  autre personnes
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default IconsHolder;
