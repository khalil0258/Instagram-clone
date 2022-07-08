import React from "react";

function ImageHolder(props) {
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <div
        className="h-full cursor-pointer "
        onDoubleClick={() => {
          console.log("here we go again");
        }}
      >
        <img
          src={props.imageURL}
          alt="postImage"
          className="w-full h-full object-cover"
        />
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default ImageHolder;
