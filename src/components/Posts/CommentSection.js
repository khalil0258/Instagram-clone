import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import PostComment from "../postsComments/PostComment";
import CommentBefore from "./CommentBefore";

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const clicked = () => {
    setOpen(false);
  };
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", props.id, "posts", props.postId, "comments"),
        orderBy("time", "asc")
      ),
      (querySnapshot) => {
        let com = [];
        // console.log(querySnapshot.docs[0].data());
        querySnapshot.docs.forEach((q) => {
          com.push({ id: q.id, ...q.data() });
        });
        setComments(com);
      }
    );
  }, []);
  // console.log(props);
  return (
    <div className="px-3 pb-4">
      <CommentBefore name={props.userName} description={props.description} />

      <div
        className="text-left color-global text-sm pb-1 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        {/* in process */}
        voir les 33 commentaires
      </div>
      <div>
        {!!comments.length && (
          <>
            <CommentBefore
              name={comments[0].senderName}
              description={comments[0].text}
              inComment={true}
            />
            {comments.length > 2 && (
              <CommentBefore
                name={comments[1].senderName}
                description={comments[1].text}
                inComment={true}
              />
            )}
          </>
        )}
      </div>
      <PostComment
        open={open}
        clicked={clicked}
        profileURL={props?.profileURL}
        location={props?.location}
        userName={props?.userName}
        description={props?.description}
        id={props.id}
        postId={props.postId}
        imageURL={props.imageURL}
        time={props.time}
      />
    </div>
  );
}

export default CommentSection;
