import React, { useState } from "react";

function CommentsReveal(props) {
  const [showReplies, setShowReplies] = useState(false);
  console.log("zz", props.main.replies);

  return (
    <div className="mb-4">
      <div id="description" className="flex items-center gap-2">
        <img
          src={props?.main.profileURL || require("../../assets/profile.png")}
          alt="profile img"
          className="h-11 w-11 rounded-full"
        />
        <div>
          <div className="flex items-center justify-start gap-1 ">
            <p className="font-medium text-[17px]">{props.main.senderName}</p>
            <p className="text-global text-[16px]  ">{props.main.text}</p>
          </div>
          <div className="flex gap-3 justify-start">
            <span className="text-gray-500 text-sm">
              {!!props.main.time &&
              Math.floor(
                (new Date() - new Date(props.main.time?.toDate())) / 60000
              ) > 60
                ? Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 3600000
                  )
                : Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  ) > 1
                ? Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  )
                : "instant"}
              {Math.floor(
                (new Date() - new Date(props.main.time?.toDate())) / 60000
              ) > 60
                ? "h"
                : Math.floor(
                    (new Date() - new Date(props.main.time?.toDate())) / 60000
                  ) > 1
                ? "m"
                : ""}
            </span>
            <span
              className="text-gray-500 text-sm font-medium cursor-pointer"
              onClick={() => {
                props.tag("@" + props.main.senderName);
              }}
            >
              Repondre
            </span>
          </div>
        </div>
      </div>
      {/* this is the sub comments section  */}
      {/* {showReplies && <div></div>} */}
    </div>
  );
}

export default CommentsReveal;
