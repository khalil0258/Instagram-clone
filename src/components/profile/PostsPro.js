import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PostComment from "../postsComments/PostComment";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

function PostsPro(props) {
  const [comments, setComments] = useState([]);
  let commentsLength = 0;
  const [opened, setOpened] = useState();
  const clicked = () => {
    setOpened(false);
  };

  const [length, setLength] = useState(0);
  useEffect(() => {
    const fetchComments = async () => {
      await Promise.all(
        onSnapshot(
          query(
            collection(
              db,
              "users",
              props.post?.userId,
              "posts",
              props?.post.id,
              "comments"
            ),
            orderBy("time", "asc")
          ),
          (querySnapshot) => {
            let com = [];
            setLength(0);
            commentsLength = 0;

            // console.log(querySnapshot.docs[0].data());
            querySnapshot.docs.forEach((q) => {
              // com.push({ id: q.id, ...q.data() });
              //   console.log(q.id);

              com.push({
                id: q.id,
                userId: props.post.userId,
                postId: props.id,
                ...q.data(),
              });
            });
            setComments(com);

            // console.log(typeof com);
            Object.values(com).forEach((c) => {
              // console.log(c);

              commentsLength = commentsLength + c.replies;
            });
            // commentsLength += com.length;
            commentsLength = commentsLength + com?.length;
            console.log(commentsLength);
            setLength(commentsLength);
            // console.log(typeof commentsLength);
            console.log("hh");
          }
        )
      );
    };
    fetchComments();
  }, []);

  return (
    <div
      onClick={() => {
        setOpened(true);
      }}
    >
      <div>
        <div className="w-[293px]  h-[293px] cursor-pointer relative">
          <img
            src={props.post.imageUrl}
            alt="profile Post"
            className="h-full w-full object-cover"
          />

          <div
            className="w-full h-full hover:bg-slate-900 hover:text-white text-transparent absolute top-0 right-0 flex justify-center items-center "
            style={{ opacity: "0.4", zIndex: 80 }}
          >
            <div className="flex gap-12 items-center">
              <div className="flex gap-1 ">
                <FavoriteIcon />
                {props.post.likes.length}
              </div>
              <div className="flex gap-1 ">
                <ModeCommentIcon />
                {/* comments length? */}
                {/* {post.likes.length} */}
                {props.post.comments}
              </div>
            </div>
          </div>
        </div>{" "}
        <PostComment
          open={opened}
          clicked={clicked}
          profileURL={props.post?.profileURL}
          location={props.post?.location}
          userName={props.post?.userName}
          description={props.post?.description}
          id={props.post?.userId}
          postId={props?.post.id}
          imageURL={props?.post?.imageUrl}
          time={props.post?.time}
          comments={comments}
          likes={props.post?.likes}
        />
      </div>
    </div>
  );
}

export default PostsPro;
