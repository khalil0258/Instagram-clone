import React from "react";

function Loading() {
  return (
    <div className="bg-white flex items-center justify-center h-screen w-screen">
      <img src={require("../../assets/icons/instagramIcon.png")} />
    </div>
  );
}

export default Loading;
