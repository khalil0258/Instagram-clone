import React from "react";
import { Link, NavLink } from "react-router-dom";

function Friend(props) {
  return (
    <NavLink to={props.id} className={(isActive) => isActive && " bg-gray-300"}>
      <div className="py-2 cursor-pointer">
        <div className="flex px-3 gap-2  ">
          <img
            src={props.photoUrl || require("../../assets/profile.png")}
            alt="profile img"
            className="h-14 w-14 rounded-full"
          />
          <div className="text-left pt-2">
            <h2 className="text-md">{props.userName}</h2>
            <span> </span>
            <span className="text-gray-400 font-medium text-sm ">
              {props.lastMessage || ""}
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Friend;
