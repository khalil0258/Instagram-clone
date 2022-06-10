import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function CommentBefore({ name, description, inComment }) {
  return (
    <div
      className={`flex items-center justify-between   ${inComment && "px-4"}`}
    >
      <div className="flex items-center justify-start">
        <h3 className="text-[15px] font-medium cursor-pointer">{name}</h3>
        <p>{description}</p>
      </div>
      {inComment && (
        <div>
          <FavoriteBorderOutlinedIcon
            className=" cursor-pointer"
            sx={{ height: "13px", width: "13px" }}
          />
        </div>
      )}
    </div>
  );
}

export default CommentBefore;
