import React, { useState } from "react";
import CommentSection from "./CommentSection";
import IconsHolder from "./IconsHolder";
import ImageHolder from "./ImageHolder";
import PostName from "./PostName";

function Post(props) {
  //   const [liked, setLiked] = useState(false);

  //   const like = () => {
  //     setLiked(true);
  //   };

  console.log(props);
  return (
    <div className="w-full bg-white mb-5 border border-opacity-30  border-slate-500">
      {/* the first section :the name and profile img  */}
      <PostName
        userName={props?.post?.userName}
        profileURL={props?.post?.profileImg}
        location={props?.post?.location}
      />
      {/* the second section :the post img or video  */}
      <ImageHolder imageURL={props.post.imageUrl} />
      {/* the third section :the post icons where we can share it or like and give it comment  */}
      <IconsHolder likes={props?.post?.likes} />
      {/* the forth section : the comment section*/}
      <CommentSection
        userName={props?.post?.userName}
        description={props?.post?.description}
      />
    </div>
  );
}

export default Post;
// w-[90%] md:w-[470px] mx-auto md:mx-0 bg-white mb-5
