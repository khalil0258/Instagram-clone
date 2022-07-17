import React from "react";
import ReactDOM from "react-dom";
import { BackDrop } from "../global/MenuModal";

function PostComment(props) {
  if (!props.open) {
    document.body.style.overflowY = "scroll";
    return null;
  } else {
    document.body.style.overflowY = "hidden";
    return (
      <>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} back />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <PostSection
            profileURL={props?.profileURL}
            location={props?.location}
            userName={props?.userName}
            description={props?.description}
            id={props.id}
            postId={props.postId}
            imageURL={props.imageURL}
            time={props.time}
          />,
          document.getElementById("Othermodals")
        )}
      </>
    );
  }
}

export default PostComment;
const PostSection = (props) => {
  console.log(props.profileURL);
  return (
    <div
      style={{ zIndex: 2000 }}
      className="h-[90vh] w-[80%] bg-white fixed top-[5vh] left-[10%] border shadow-md overflow-hidden rounded-md flex"
    >
      {/* this section represents the right section where the posts img is  */}
      <div className="w-1/2 border-r h-full">
        <img
          src={props.imageURL}
          alt="post image"
          className="object-contain h-full w-full"
        />
      </div>
      {/* this section is the right section  */}
      <div className="w-1/2  h-full">
        {/* profile of the post user  */}
        <div className="flex items-center justify-start h-[65px] w-full px-4 border-b ">
          <div className="flex items-start justify-start  gap-2">
            <img
              src={props?.profileURL || require("../../assets/profile.png")}
              alt="profile img"
              className="rounded-full h-10 w-10"
            />
            <div className=" flex flex-col items-center justify-start ">
              <p className="font-medium">{props.userName}</p>
              <span>{props.location}</span>
            </div>
            <p className="font-medium">abonne</p>
          </div>
        </div>
        {/* description and comments  */}
        <div className="p-2">
          <div id="description" className="flex items-center gap-2">
            <img
              src={props?.profileURL || require("../../assets/profile.png")}
              alt="profile img"
              className="h-11 w-11 rounded-full"
            />
            <div>
              <div className="flex items-center justify-start gap-1">
                <p className="font-medium text-[17px]">{props.userName}</p>
                <p className="text-global text-[16px]">{props.description}</p>
              </div>
              <span className="text-gray-500 text-sm">
                {Math.floor(
                  (new Date() - new Date(props.time.toDate())) / 60000
                ) > 60
                  ? Math.floor(
                      (new Date() - new Date(props.time.toDate())) / 3600000
                    )
                  : Math.floor(
                      (new Date() - new Date(props.time.toDate())) / 60000
                    )}
                {Math.floor(
                  (new Date() - new Date(props.time.toDate())) / 60000
                ) > 60
                  ? "hours"
                  : "min"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
