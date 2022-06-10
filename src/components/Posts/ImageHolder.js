import React from "react";

function ImageHolder() {
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <div
        className="h-full cursor-pointer "
        onDoubleClick={() => {
          console.log("here we go again");
        }}
      >
        <img
          src={require("../../assets/signupAssets/pic.png")}
          alt="postImage"
          className="w-full h-full object-cover"
        />
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default ImageHolder;
