import React from "react";

function UserMessages(props) {
  return (
    <div className="self-end mb-2  ">
      <div className="bg-gray-300 text-black p-2 text-sm font-normal rounded-full">
        {props.message}ggggggggggggggggggggggggggggfff
      </div>
      <span className="text-gray-400 text-xs mt-2 mr-2 flex justify-end">
        {props.time}123ddd
      </span>
    </div>
  );
}

export default UserMessages;
