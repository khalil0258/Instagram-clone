import React, { useState } from "react";
import CommentSection from "./CommentSection";
import IconsHolder from "./IconsHolder";
import ImageHolder from "./ImageHolder";
import PostName from "./PostName";

function Post() {
//   const [liked, setLiked] = useState(false);

//   const like = () => {
//     setLiked(true);
//   };
 
  return (
    <div className="w-full bg-white mb-5 border border-opacity-30  border-slate-500">
      {/* the first section :the name and profile img  */}
      <PostName  />
      {/* the second section :the post img or video  */}
      <ImageHolder   />
      {/* the third section :the post icons where we can share it or like and give it comment  */}
      <IconsHolder  />
      {/* the forth section : the comment section*/}
      <CommentSection />
    </div>
  );
}

export default Post;
// w-[90%] md:w-[470px] mx-auto md:mx-0 bg-white mb-5
