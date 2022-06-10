import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BackDrop } from "../global/MenuModal";
import postSetings from "../../textAssets/postSetings.json";

const PostSetings = ({ postSetings }) => {
  return (
    <div
      style={{ zIndex: 1200 }}
      className="w-[80%] sm:w-[410px] bg-white rounded-sm border-global border-opacity-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      {/* maping on settings that are in json file  */}
      {postSetings.map((seting, index) => (
        <div
          key={index}
          className="py-4 text-center border-b border-black border-opacity-25 hover:bg-slate-100 cursor-pointer "
        >
          <h3>{seting?.title}</h3>
        </div>
      ))}
    </div>
  );
};

function PostSetingsModal(props) {
  if (!props.open) {
    document.body.style.overflowY = "scroll";
    return null;
  } else {
    document.body.style.overflowY = "hidden";
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} back />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <PostSetings postSetings={postSetings} />,
          document.getElementById("Othermodals")
        )}
      </Fragment>
    );
  }
}

export default PostSetingsModal;
