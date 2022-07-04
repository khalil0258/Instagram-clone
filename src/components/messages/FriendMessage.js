import React from "react";

function FriendMessage(props) {
  return (
    <div className="self-start mb-2  ">
      <div className="flex items-center justify-start gap-2">
        <img
          src={require("../../assets/profile.png")}
          alt="orofile img "
          className="h-11 w-11 rounded-full"
        />
        <div className="bg-white text-black p-2 text-sm font-normal rounded-full border">
          {props.message}
        </div>
      </div>

      <span className="text-gray-400 text-xs mt-2 mr-2 flex justify-end">
        {props.time}
      </span>
    </div>
  );
}

export default FriendMessage;
