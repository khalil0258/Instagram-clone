import React, { useState } from "react";
import Comment from "./Comment";
import CommentSection from "./CommentSection";
import IconsHolder from "./IconsHolder";
import ImageHolder from "./ImageHolder";
import PostName from "./PostName";

function Post(props) {
  //   const [liked, setLiked] = useState(false);

  //   const like = () => {
  //     setLiked(true);
  //   };

  // console.log(props);
  return (
    <div className="w-full bg-white mb-5 border border-opacity-30  border-slate-500">
      {/* the first section :the name and profile img  */}
      <PostName
        userName={props?.post?.userName}
        profileURL={props?.post?.profileImg}
        location={props?.post?.location}
      />
      {/* the second section :the post img or video  */}
      <ImageHolder
        imageURL={props.post.imageUrl}
        id={props.post?.userId}
        postId={props.post?.PostId}
      />
      {/* the third section :the post icons where we can share it or like and give it comment  */}
      <IconsHolder
        likes={props?.post?.likes}
        id={props.post?.userId}
        postId={props.post?.PostId}
      />
      {/* the forth section : the comment section*/}
      <CommentSection
        profileURL={props?.post?.profileImg}
        location={props?.post?.location}
        userName={props?.post?.userName}
        description={props?.post?.description}
        id={props.post?.userId}
        postId={props.post?.PostId}
        imageURL={props.post.imageUrl}
        time={props.post.time}
      />
      <Comment id={props.post?.userId} postId={props.post?.PostId} />
    </div>
  );
}

export default Post;
// w-[90%] md:w-[470px] mx-auto md:mx-0 bg-white mb-5
