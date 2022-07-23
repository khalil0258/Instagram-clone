import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BackDrop } from "../global/MenuModal";
import Comment from "../Posts/Comment";
import IconsHolder from "../Posts/IconsHolder";
import CommentsReveal from "./CommentsReveal";
import IconsSection from "./IconsSection";
import emogis from "../../textAssets/emogis.json";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../Firebase/Firebase";

function PostComment(props) {
  if (!props.open) {
    document.body.style.overflowY = "scroll";
    return null;
  } else {
    document.body.style.overflowY = "hidden";
    return (
      <>
        {ReactDOM.createPortal(
          <BackDrop clicked={props.clicked} open={props.open} back />,
          document.getElementById("backdrop")
        )}
        {ReactDOM.createPortal(
          <PostSection
            profileURL={props?.profileURL}
            location={props?.location}
            userName={props?.userName}
            description={props?.description}
            id={props.id}
            postId={props.postId}
            imageURL={props.imageURL}
            time={props?.time}
            comments={props?.comments}
            likes={props?.likes}
          />,
          document.getElementById("Othermodals")
        )}
      </>
    );
  }
}

export default PostComment;

// .......................................
const PostSection = (props) => {
  const [text, setText] = useState("");
  console.log(props.comments);
  console.log(props);
  const [showEmogy, setShowEmogy] = useState(false);

  const [index, setIndex] = useState();
  const setInd = (v) => {
    setIndex(v);
  };
  let newA =
    props.description.trim() != ""
      ? [
          {
            text: props.description,
            time: props.time,
            senderId: props.senderId,
            senderName: props.userName,
            senderImg: props.profileURL,
            likes: 0,
          },
          ...props.comments,
        ]
      : [...props.comments];

  let replier;

  // function that push comments to db
  const pushComment = async () => {
    props.comments?.every((comment) => {
      if (text.includes(`@${comment.senderName}`)) {
        replier = {
          parentCommentId: props.comments[index].id,
          receiverId: props.comments[index].senderId,
          receiverName: props.comments[index].senderName,
          receiverImg: props.comments[index].senderimg,
        };
        return false;
      }
    });
    if (!!replier?.receiverId) {
      console.log("replier", replier);
      addDoc(
        collection(
          db,
          "users",
          props.id,
          "posts",
          props.postId,
          "comments",
          replier.parentCommentId,
          "subComments"
        ),
        {
          text: text,
          time: new serverTimestamp(),
          senderId: auth.currentUser.uid,
          senderName: auth.currentUser.displayName,
          senderImg: auth.currentUser.photoURL,
          likes: 0,
          parentCommentId: replier.parentCommentId,
          receiverId: replier.receiverId,
          receiverName: replier.receiverName,
          receiverImg: replier.receiverImg || "",
        }
      )
        .then(() => {
          updateDoc(
            doc(
              db,
              "users",
              props.id,
              "posts",
              props.postId,
              "comments",
              replier.parentCommentId
            ),
            {
              replies: increment(1),
            }
          );
        })
        .then(() => {
          updateDoc(doc(db, "users", props.id, "posts", props.postId), {
            comments: increment(1),
          });
        })
        .then(() => {
          setText("");
        });
    } else {
      if (text.trim() != "")
        addDoc(
          collection(db, "users", props.id, "posts", props.postId, "comments"),
          {
            text: text,
            time: new serverTimestamp(),
            senderId: auth.currentUser.uid,
            senderName: auth.currentUser.displayName,
            senderImg: auth.currentUser.photoURL,
            likes: 0,
            replies: 0,
          }
        )
          .then(() => {
            updateDoc(doc(db, "users", props.id, "posts", props.postId), {
              comments: increment(1),
            });
          })
          .then(() => {
            setText("");
          });
    }
  };
  const tag = (value) => {
    setText(value);
  };

  return (
    <div
      style={{ zIndex: 2000 }}
      className="h-[90vh] w-[80%] bg-white fixed top-[5vh] left-[10%] border shadow-md overflow-hidden rounded-md flex"
    >
      {/* this section represents the right section where the posts img is  */}
      <div className="w-1/2 border-r h-full">
        <img
          src={props.imageURL}
          alt="post image"
          className="object-contain h-full w-full"
        />
      </div>
      {/* this section is the right section  */}
      <div className="w-1/2  h-full relative ">
        {/* profile of the post user  */}
        <div className="flex items-center justify-start h-[10vh] w-full px-4 border-b shadow-md ">
          <div className="flex items-center justify-start  gap-2">
            <img
              src={props?.profileURL || require("../../assets/profile.png")}
              alt="profile img"
              className="rounded-full h-10 w-10"
            />
            <div className=" flex flex-col items-center justify-center ">
              <p className="font-medium text-sm">{props.userName}</p>
              <span>{props.location}</span>
            </div>
            <p className="font-medium font-medium text-sm ">.Abonne(e)</p>
          </div>
        </div>
        {/* description and comments  */}
        <div className="p-2 h-[53vh] overflow-scroll overflow-x-hidden">
          {!!newA.length &&
            newA.map((com, index) => (
              <CommentsReveal
                key={index}
                main={com}
                tag={tag}
                in={index}
                setIndex={setInd}
              />
            ))}
        </div>
        {/* icons and likes section  */}
        <div className="absolute bottom-0  left-0 right-0 h-[27vh] border-t">
          <IconsSection
            likes={props.likes}
            id={props.id}
            time={props.time}
            postId={props.postId}
          />

          <div className=" w-full mx-auto  py-3 px-2    border-t relative top-3 flex items-center justify-start gap-4 ">
            <div className="relative ">
              <SentimentSatisfiedAltIcon
                onClick={() => {
                  setShowEmogy((prev) => {
                    return !prev;
                  });
                }}
              />
              {showEmogy && (
                <div className="flex h-48 absolute bottom-11 -left-4 w-48 bg-white   shadow-sm flex-wrap overflow-scroll overflow-x-hidden cursor-pointer">
                  {emogis.emojis.map((e, index) => (
                    <span
                      key={index}
                      onClick={() => {
                        setText((prev) => {
                          return prev + e.emoji;
                        });
                      }}
                    >
                      {e.emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <input
              value={text}
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="w-[75%] outline-none h-3/5   resize-none text-sm font-normal text-global "
            />
            <div className="flex items-center gap-3 justify-center">
              <p
                className="text-blue-500 font-medium cursor-pointer"
                onClick={pushComment}
              >
                send
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
