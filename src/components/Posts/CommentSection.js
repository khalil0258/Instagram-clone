import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/Firebase";
import PostComment from "../postsComments/PostComment";
import CommentBefore from "./CommentBefore";

function CommentSection(props) {
  const [comments, setComments] = useState([]);
  let commentsLength = 0;

  const [length, setLength] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      await Promise.all(
        onSnapshot(
          query(
            collection(
              db,
              "users",
              props.id,
              "posts",
              props.postId,
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
              console.log(q.id);

              com.push({
                id: q.id,
                userId: props.id,
                postId: props.postId,
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
          }
        )
      );
    };
    fetchComments();
  }, []);

  return (
    <div className="px-3 pb-4">
      <CommentBefore name={props.userName} description={props.description} />

      <div
        className="text-left color-global text-sm pb-1 cursor-pointer"
        onClick={() => {
          props.clicked(true);
        }}
      >
        {/* in process */}
        {!!length && `voir les ${length} commentaires`}
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
        open={props.open}
        clicked={props.clicked}
        profileURL={props?.profileURL}
        location={props?.location}
        userName={props?.userName}
        description={props?.description}
        id={props.id}
        postId={props.postId}
        imageURL={props.imageURL}
        time={props?.time}
        comments={comments}
        likes={props?.likes}
      />
    </div>
  );
}

export default CommentSection;
